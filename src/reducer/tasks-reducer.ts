import {AddTodolistAT, GetTodosAT, RemoveTodolistAT} from "./todolists-reducer";
import {TaskPriorities, TaskType, TaskStatuses, TodoApi, UpdateTaskModelType} from "../api/TodolistApi";
import {Dispatch} from "redux";
import {AppRootStateType} from "../store";
import {AppActionsType, setErrorAC, setStatusAC} from "./app-reducer";

export const initialState: TasksType = {}
export const tasksReducer = (state = initialState, action: ActionType): TasksType => {
	switch (action.type) {
		case "SET-TASKS": {
			const stateCopy = {...state}
			stateCopy[action.todoId] = action.tasks
			return stateCopy
		}
		case "GET-TODOS": {
			const copyState = {...state}
			action.todos.forEach((t) => {
				copyState[t.id] = []
			})
			return copyState
		}
		case "REMOVE-TASK":
			return {...state, [action.todolistID]: state[action.todolistID].filter(el => el.id !== action.id)}
		case "ADD-TASK":
			return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
		case "UPDATE-TASK":
			return {
				...state,
				[action.todolistID]: state[action.todolistID].map(t => t.id === action.id ? {
					...t,
					...action.model
				} : t)
			}
		case"ADD-TODOLIST":
			return {...state, [action.todolist.id]: []}
		case "REMOVE-TODOLIST":
			const newState = {...state}
			delete newState[action.id]
			return newState
		default:
			return state
	}
}

//actions
export const removeTaskAC = (id: string, todolistID: string) => ({type: "REMOVE-TASK", id, todolistID} as const)
export const addTaskAC = (task: TaskType) => ({type: "ADD-TASK", task} as const)
export const updateTaskAC = (id: string, model: UpdateDomainTaskModelType, todolistID: string) => ({
	type: "UPDATE-TASK",
	id,
	model,
	todolistID
} as const)
export const setTaskAC = (todoId: string, tasks: TaskType[]) => ({type: 'SET-TASKS', todoId, tasks} as const)

//thunks
export const getTaskTC = (todoId: string) => (dispatch: Dispatch<ActionType | AppActionsType>) => {
	dispatch(setStatusAC('loading'))
	TodoApi.getTaskResponse(todoId)
		.then((resp) => {
			dispatch(setTaskAC(todoId, resp.data.items))
			dispatch(setStatusAC('succeeded'))
		})

}
export const removeTaskTC = (todoId: string, taskId: string) => (dispatch: Dispatch<ActionType | AppActionsType>) => {
	dispatch(setStatusAC('loading'))
	TodoApi.deleteTaskResponse(todoId, taskId)
		.then((res) => {
			dispatch(removeTaskAC(taskId, todoId))
			dispatch(setStatusAC('succeeded'))
		})
}
export const addTaskTC = (title: string, todoId: string) => (dispatch: Dispatch<ActionType | AppActionsType>) => {
	dispatch(setStatusAC('loading'))
	TodoApi.createTaskResponse(todoId, title)
		.then((res) => {
			if(res.data.resultCode===0){
				dispatch(addTaskAC(res.data.data.item))
				dispatch(setStatusAC('succeeded'))
			}else{
				dispatch(setErrorAC(res.data.messages[0]))
				dispatch(setStatusAC('failed'))
			}

		})
}
export const updateTaskTC = (id: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
	(dispatch: Dispatch<ActionType | AppActionsType>, getState: () => AppRootStateType) => {
		const allTasksFromState = getState()
		const allTasks = allTasksFromState.task
		const taskForCurrentTodo = allTasks[todolistId]
		const currenTask = taskForCurrentTodo.find(t => t.id === id)

		if (currenTask) {
			const apiModel: UpdateTaskModelType = {
				title: currenTask.title,
				startDate: currenTask.startDate,
				priority: currenTask.priority,
				description: currenTask.description,
				deadline: currenTask.deadline,
				status: currenTask.status,
				...domainModel
			}
			dispatch(setStatusAC('loading'))
			TodoApi.updateTask(todolistId, id, apiModel).then((res) => {
				const action = updateTaskAC(id, domainModel, todolistId)
				dispatch(action)
				dispatch(setStatusAC('succeeded'))
			})
		}
	}

//types
export type TasksType = { [key: string]: Array<TaskType> }
export type UpdateDomainTaskModelType = {
	title?: string
	description?: string
	status?: TaskStatuses
	priority?: TaskPriorities
	startDate?: string
	deadline?: string
}
export type SetTaskAT = ReturnType<typeof setTaskAC>
export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type UpdateTasksAT = ReturnType<typeof updateTaskAC>
export type ActionType =
	| RemoveTaskAT
	| AddTaskAT
	| UpdateTasksAT
	| AddTodolistAT
	| RemoveTodolistAT
	| GetTodosAT
	| SetTaskAT

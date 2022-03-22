import {AddTodolistAT, GetTodosAT, RemoveTodolistAT} from "./todolists-reducer";
import {TaskPriorities, TaskType, TaskStatuses, TodoApi, UpdateTaskModelType} from "../api/TodolistApi";
import {Dispatch} from "redux";
import {AppRootStateType} from "../store";

export type ActionType =
	| RemoveTaskAT
	| AddTaskAT
	| UpdateTasksAT
	// | ChangeTaskTitleAT
	| AddTodolistAT
	| RemoveTodolistAT
	| GetTodosAT
	| SetTaskAT

export type TasksType = { [key: string]: Array<TaskType> }
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
		case "ADD-TASK": {
			const stateCopy = {...state}
			const tasks = stateCopy[action.task.todoListId];
			const newTasks = [action.task, ...tasks];
			stateCopy[action.task.todoListId] = newTasks;
			return stateCopy;

		}
		// let task = {
		// 	id: v1(), title: action.title, status: TaskStatuses.New, todoListId: 'tododlist_2',
		// 	startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
		// }


		case "UPDATE-TASK":

			return {
				...state,
				[action.todolistID]: state[action.todolistID].map(t => t.id === action.id ? {
					...t,
					...action.model
				} : t)
			}
		// case "CHANGE-TASK-TITLE":
		// 	return {
		// 		...state,
		// 		[action.todolistID]: state[action.todolistID].map(t => t.id === action.id ? {
		// 			...t,
		// 			title: action.title
		// 		} : t)
		// 	}
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

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string, todolistID: string) => ({type: "REMOVE-TASK", id, todolistID} as const)

export type AddTaskAT = ReturnType<typeof addTaskAC>
export const addTaskAC = (task: TaskType) => ({type: "ADD-TASK", task} as const)

export type UpdateTasksAT = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (id: string, model: UpdateDomainTaskModelType, todolistID: string) => ({
	type: "UPDATE-TASK",
	id,
	model,
	todolistID
} as const)

/*
export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (id: string, title: string, todolistID: string) => ({
	type: "CHANGE-TASK-TITLE",
	id,
	title,
	todolistID
} as const)
*/

export type SetTaskAT = ReturnType<typeof setTaskAC>
export const setTaskAC = (todoId: string, tasks: TaskType[]) => ({type: 'SET-TASKS', todoId, tasks} as const)

export const getTaskTC = (todoId: string) => {
	return (dispatch: Dispatch) => {
		TodoApi.getTaskResponse(todoId).then((resp) => {
			dispatch(setTaskAC(todoId, resp.data.items))
		})
	}
}
export const removeTaskTC = (todoId: string, taskId: string) => {
	return (dispatch: Dispatch) => {
		TodoApi.deleteTaskResponse(todoId, taskId)
			.then((res) => {
				dispatch(removeTaskAC(taskId, todoId))
			})
	}
}
export const addTaskTC = (title: string, todoId: string) => {
	return (dispatch: Dispatch) => {
		TodoApi.createTaskResponse(todoId, title)
			.then((res) => {
				dispatch(addTaskAC(res.data.data.item))
			})
	}
}
export type UpdateDomainTaskModelType = {
	title?: string
	description?: string
	status?: TaskStatuses
	priority?: TaskPriorities
	startDate?: string
	deadline?: string
}
export const updateTaskTC = (id: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
	(dispatch: Dispatch, getState: () => AppRootStateType) => {

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
			TodoApi.updateTask(todolistId, id, apiModel).then((res) => {
				const action = updateTaskAC(id, domainModel, todolistId)
				dispatch(action)
			})
		}
	}



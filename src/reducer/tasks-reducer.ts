import {v1} from "uuid";
import {AddTodolistAC, AddTodolistAT, GetTodosAT, RemoveTodolistAT} from "./todolists-reducer";
import {TaskPriorities, TaskType, TaskStatuses, TodoApi, UpdateTaskModelType} from "../api/TodolistApi";

import {Dispatch} from "redux";
import {AppRootStateType} from "../store";


export type RemoveTaskAT = {
	type: "REMOVE-TASK"
	id: string
	todolistID: string

}
export type AddTaskAT = {
	type: "ADD-TASK"
	task: TaskType
}
export type ChangeTaskStatusAT = {
	type: "CHANGE-TASK-STATUS"
	id: string
	todolistID: string
	status: TaskStatuses
}
export type ChangeTaskTitleAT = {
	type: "CHANGE-TASK-TITLE"
	id: string
	todolistID: string
	title: string
}
export type ActionType = RemoveTaskAT
	| AddTaskAT
	| ChangeTaskStatusAT
	| ChangeTaskTitleAT
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


		case "CHANGE-TASK-STATUS":

			return {
				...state,
				[action.todolistID]: state[action.todolistID].map(t => t.id === action.id ? {
					...t,
					status: action.status
				} : t)
			}
		case "CHANGE-TASK-TITLE":
			return {
				...state,
				[action.todolistID]: state[action.todolistID].map(t => t.id === action.id ? {
					...t,
					title: action.title
				} : t)
			}
		case"ADD-TODOLIST":
			return {...state, [action.todolistId]: []}
		case "REMOVE-TODOLIST":
			const newState = {...state}
			delete newState[action.id]
			return newState
		default:
			return state
	}
}
export const removeTaskAC = (id: string, todolistID: string): RemoveTaskAT => {
	return {type: "REMOVE-TASK", id, todolistID}
}
export const addTaskAC = (task: TaskType): AddTaskAT => {
	return {type: "ADD-TASK", task}
}
export const changeTaskStatusAC = (id: string, status: TaskStatuses, todolistID: string): ChangeTaskStatusAT => {

	return {type: "CHANGE-TASK-STATUS", id, status, todolistID}
}
export const changeTaskTitleAC = (id: string, title: string, todolistID: string): ChangeTaskTitleAT => {
	return {type: "CHANGE-TASK-TITLE", id, title, todolistID}
}

export type SetTaskAT = ReturnType<typeof setTaskAC>
export const setTaskAC = (todoId: string, tasks: TaskType[]) => {
	return {
		type: 'SET-TASKS',
		todoId,
		tasks
	} as const
}
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
export const updateTaskStatusTC = (id: string, status: TaskStatuses, todolistId: string) =>
	(dispatch: Dispatch, getState: () => AppRootStateType) => {

		const allTasksFromState = getState()
		const allTasks = allTasksFromState.task
		const taskForCurrentTodo = allTasks[todolistId]
		const currenTask = taskForCurrentTodo.find(t => t.id === id)


		if (currenTask) {
			const model: UpdateTaskModelType = {
				title: currenTask.title,
				startDate: currenTask.startDate,
				priority: currenTask.priority,
				description: currenTask.description,
				deadline: currenTask.deadline,
				status: status
			}
			TodoApi.updateTask(todolistId, id, model).then((res) => {
				const action = changeTaskStatusAC(id, status, todolistId)
				dispatch(action)
			})
		}
	}



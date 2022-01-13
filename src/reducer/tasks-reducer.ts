import {TasksType} from "../App";
import {v1} from "uuid";
import {AddTodolistAC, AddTodolistAT, RemoveTodolistAT} from "./todolists-reducer";

//todo
export type RemoveTaskAT = {
	type: "REMOVE-TASK"
	id: string
	todolistID: string

}
export type AddTaskAT = {
	type: "ADD-TASK"
	title: string
	todolistID: string
}
export type ChangeTaskStatusAT = {
	type: "CHANGE-TASK-STATUS"
	id: string
	todolistID: string
	isDone: boolean
}
export type ChangeTaskTitleAT = {
	type: "CHANGE-TASK-TITLE"
	id: string
	todolistID: string
	title: string
}


export type ActionType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT
	| ChangeTaskTitleAT | AddTodolistAT | RemoveTodolistAT
export const initialState: TasksType ={}

export const tasksReducer = (state = initialState, action: ActionType): TasksType => {
	switch (action.type) {
		case "REMOVE-TASK":
			return {...state, [action.todolistID]: state[action.todolistID].filter(el => el.id !== action.id)}
		case "ADD-TASK":
			let task = {id: v1(), title: action.title, isDone: false}
			return {...state, [action.todolistID]: [task, ...state[action.todolistID]]}
		case "CHANGE-TASK-STATUS":
			return {
				...state,
				[action.todolistID]: state[action.todolistID].map(t => t.id === action.id ? {
					...t,
					isDone: action.isDone
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
export const addTaskAC = (title: string, todolistID: string,): AddTaskAT => {
	return {type: "ADD-TASK", title, todolistID}
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistID: string): ChangeTaskStatusAT => {
	return {type: "CHANGE-TASK-STATUS", id, isDone, todolistID}
}
export const changeTaskTitleAC = (id: string, title: string, todolistID: string): ChangeTaskTitleAT => {
	return {type: "CHANGE-TASK-TITLE", id, title, todolistID}
}


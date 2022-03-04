import {v1} from "uuid";
import {AddTodolistAC, AddTodolistAT, RemoveTodolistAT} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/TodolistApi";
import {TasksType} from "../AppWithRedux";


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
	status:TaskStatuses
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
			let task = {id: v1(), title: action.title, status:TaskStatuses.New,todoListId:'tododlist_2',
				startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''}
			return {...state, [action.todolistID]: [task, ...state[action.todolistID]]}
		case "CHANGE-TASK-STATUS":
			debugger
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
export const addTaskAC = (title: string, todolistID: string,): AddTaskAT => {
	return {type: "ADD-TASK", title, todolistID}
}
export const changeTaskStatusAC = (id: string, status:TaskStatuses, todolistID: string): ChangeTaskStatusAT => {

	return {type: "CHANGE-TASK-STATUS", id, status, todolistID}
}
export const changeTaskTitleAC = (id: string, title: string, todolistID: string): ChangeTaskTitleAT => {
	return {type: "CHANGE-TASK-TITLE", id, title, todolistID}
}


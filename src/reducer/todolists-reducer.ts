import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistAT = {
	type: "REMOVE-TODOLIST"
	id: string
}
export type AddTodolistAT = {
	type: "ADD-TODOLIST"
	title: string
	// filter:FilterValuesType
}
export type ChangeTodolistFilterAT = {
	type: "CHANGE-TODOLIST-FILTER"
	filter: FilterValuesType
	id: string

}
export type ChangeTodolistTitleAT = {
	type: "CHANGE-TODOLIST-TITLE"
	id: string
	title: string
}
export type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistFilterAT | ChangeTodolistTitleAT

export const todolistsReducer = (todolists: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
	switch (action.type) {
		case "REMOVE-TODOLIST":
			return todolists.filter(fl => fl.id !== action.id)
		case "ADD-TODOLIST":
			const newTodolistID = v1()
			const todolist: TodolistType = {
				id: newTodolistID,
				title: action.title,
				filter: 'all'
			}
			return [...todolists, todolist]
		case"CHANGE-TODOLIST-FILTER":
			return todolists.map(m => m.id === action.id ? {...m, filter: action.filter} : m)
		case "CHANGE-TODOLIST-TITLE":
			return todolists.map(m => m.id === action.id ? {...m, title: action.title} : m)
		default:
			return todolists
	}

}
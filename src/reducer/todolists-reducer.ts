
import {v1} from "uuid";
import {TodoApi, TodolistType} from "../api/TodolistApi";
import {Dispatch} from "redux";

export type RemoveTodolistAT = {
	type: "REMOVE-TODOLIST"
	id: string
}
export type AddTodolistAT = {
	type: "ADD-TODOLIST"
	title: string
	todolistId:string

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

export type ActionType = RemoveTodolistAT
	| AddTodolistAT
	| ChangeTodolistFilterAT
	| ChangeTodolistTitleAT
	| GetTodosAT

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
	filter: FilterValuesType
}
export const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (todolists=initialState, action: ActionType): Array<TodolistDomainType> => {
	switch (action.type) {
		case "GET-TODOS":
		let a:Array<TodolistDomainType> = action.todos.map((t)=>{
			return {...t,filter:'all'}
		})
			return a

		case "REMOVE-TODOLIST":
			return todolists.filter(fl => fl.id !== action.id)
		case "ADD-TODOLIST":
			const newTodolistID = action.todolistId
			const todolist: TodolistDomainType = {
				id: newTodolistID,
				title: action.title,
				filter: 'all',
				addedDate:'',
				order: 0
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
export const RemoveTodolistAC = (id: string): RemoveTodolistAT => {
	return {
		type: "REMOVE-TODOLIST",
		id: id
	}
}
export const AddTodolistAC = (title: string):AddTodolistAT => {
	return {
		type: "ADD-TODOLIST",
		title: title,
		todolistId:v1()

	}
}
export const ChangeTodolistFilterAC=(filter:FilterValuesType,id:string):ChangeTodolistFilterAT=>{
	return {
		type: "CHANGE-TODOLIST-FILTER",
		filter: filter,
		id:id
	}
}
export const ChangeTodolistTitleAC=(title:string,id:string):ChangeTodolistTitleAT=>{
	return {
		type: "CHANGE-TODOLIST-TITLE",
		id,
		title
	}
}
export type GetTodosAT = ReturnType<typeof getTodosAC>
export const getTodosAC = (todos:Array<TodolistType>)=>{
	return {
		type:'GET-TODOS',
		todos
	} as const
}
export const getTodosTC=()=>(dispatch:Dispatch)=>{
	TodoApi.getTodo()
		.then((res)=>{
			const todos = res.data
			dispatch(getTodosAC(todos) )
		})
}
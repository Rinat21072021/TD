
import {v1} from "uuid";
import {TodoApi, TodolistType} from "../api/TodolistApi";
import {Dispatch} from "redux";

export type RemoveTodolistAT = {
	type: "REMOVE-TODOLIST"
	id: string
}
export type AddTodolistAT = {
	type: "ADD-TODOLIST"
	todolist:TodolistType

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
			const newTodolist:TodolistDomainType= {...action.todolist, filter:'all'}

			return [newTodolist, ...todolists]
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
export const AddTodolistAC = (todolist:TodolistType):AddTodolistAT => {
	return {
		type: "ADD-TODOLIST",
		todolist

	}
}
export const ChangeTodolistFilterAC=(filter:FilterValuesType,id:string):ChangeTodolistFilterAT=>{
	return {
		type: "CHANGE-TODOLIST-FILTER",
		filter: filter,
		id:id
	}
}
export const ChangeTodolistTitleAC=(id:string,title:string):ChangeTodolistTitleAT=>{
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
export const removeTodosTC=(todolistId:string)=>(dispatch:Dispatch)=>{
	TodoApi.deleteTodo(todolistId)
		.then((res)=>{
			dispatch(RemoveTodolistAC(todolistId) )
		})
}
export const addTodolistTC=(title:string)=>(dispatch:Dispatch)=>{
	TodoApi.createTodo(title)
		.then((res)=>{
			dispatch(AddTodolistAC(res.data.data.item))
		})
}
export const changeTodolistTitleTC = (todolistId:string,title:string)=>(dispatch:Dispatch)=>{
TodoApi.updateTitleTodo(todolistId,title)
	.then((res)=>{
		dispatch(ChangeTodolistTitleAC(todolistId,title))
	})
}

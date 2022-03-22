import {TodoApi, TodolistType} from "../api/TodolistApi";
import {Dispatch} from "redux";

export type ActionType = RemoveTodolistAT
	| AddTodolistAT
	| ChangeTodolistFilterAT
	| ChangeTodolistTitleAT
	| GetTodosAT

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & { filter: FilterValuesType }
export const initialState: Array<TodolistDomainType> = []
export const todolistsReducer = (todolists = initialState, action: ActionType): Array<TodolistDomainType> => {
	switch (action.type) {
		case "GET-TODOS":
			let a: Array<TodolistDomainType> = action.todos.map((t) => {
				return {...t, filter: 'all'}
			})
			return a
		case "REMOVE-TODOLIST":
			return todolists.filter(fl => fl.id !== action.id)
		case "ADD-TODOLIST":
			const newTodolist: TodolistDomainType = {...action.todolist, filter: 'all'}
			return [newTodolist, ...todolists]
		case"CHANGE-TODOLIST-FILTER":
			return todolists.map(m => m.id === action.id ? {...m, filter: action.filter} : m)
		case "CHANGE-TODOLIST-TITLE":
			return todolists.map(m => m.id === action.id ? {...m, title: action.title} : m)
		default:
			return todolists
	}
}
export type RemoveTodolistAT = ReturnType<typeof RemoveTodolistAC>
export const RemoveTodolistAC = (id: string) => ({type: "REMOVE-TODOLIST", id} as const)
export type AddTodolistAT = ReturnType<typeof AddTodolistAC>
export const AddTodolistAC = (todolist: TodolistType) => ({type: "ADD-TODOLIST", todolist} as const)
export type ChangeTodolistFilterAT = ReturnType<typeof ChangeTodolistFilterAC>
export const ChangeTodolistFilterAC = (filter: FilterValuesType, id: string) => ({
	type: "CHANGE-TODOLIST-FILTER",
	filter,
	id
} as const)
export type ChangeTodolistTitleAT = ReturnType<typeof ChangeTodolistTitleAC>
export const ChangeTodolistTitleAC = (id: string, title: string) => ({
	type: "CHANGE-TODOLIST-TITLE",
	id,
	title
} as const)
export type GetTodosAT = ReturnType<typeof getTodosAC>
export const getTodosAC = (todos: Array<TodolistType>) => ({type: 'GET-TODOS', todos} as const)
export const getTodosTC = () => (dispatch: Dispatch) => {
	TodoApi.getTodo()
		.then((res) => {
			const todos = res.data
			dispatch(getTodosAC(todos))
		})
}
export const removeTodosTC = (todolistId: string) => (dispatch: Dispatch) => {
	TodoApi.deleteTodo(todolistId)
		.then((res) => {
			dispatch(RemoveTodolistAC(todolistId))
		})
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
	TodoApi.createTodo(title)
		.then((res) => {
			dispatch(AddTodolistAC(res.data.data.item))
		})
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
	TodoApi.updateTitleTodo(todolistId, title)
		.then((res) => {
			dispatch(ChangeTodolistTitleAC(todolistId, title))
		})
}

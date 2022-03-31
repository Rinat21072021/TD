import {TodoApi, TodolistType} from "../api/TodolistApi";
import {Dispatch} from "redux";
import {AppActionsType, RequestStatusType, setErrorAC, setStatusAC} from "./app-reducer";

export const initialState: Array<TodolistDomainType> = []
export const todolistsReducer = (state = initialState, action: ActionType): Array<TodolistDomainType> => {
	switch (action.type) {
		case "GET-TODOS":
			return action.todos.map(t => ({...t, filter: 'all', entityStatus:'idle'}))
		case "REMOVE-TODOLIST":
			return state.filter(fl => fl.id !== action.id)
		case "ADD-TODOLIST":
			return [{...action.todolist, filter: 'all', entityStatus:'idle'}, ...state]
		case"CHANGE-TODOLIST-FILTER":
			return state.map(m => m.id === action.id ? {...m, filter: action.filter} : m)
		case "CHANGE-TODOLIST-TITLE":
			return state.map(m => m.id === action.id ? {...m, title: action.title} : m)
		default:
			return state
	}
}

//action
export const RemoveTodolistAC = (id: string) => ({type: "REMOVE-TODOLIST", id} as const)
export const AddTodolistAC = (todolist: TodolistType) => ({type: "ADD-TODOLIST", todolist} as const)
export const ChangeTodolistFilterAC = (filter: FilterValuesType, id: string) => ({
	type: "CHANGE-TODOLIST-FILTER",
	filter,
	id
} as const)
export const ChangeTodolistTitleAC = (id: string, title: string) => ({
	type: "CHANGE-TODOLIST-TITLE",
	id,
	title
} as const)
export const getTodosAC = (todos: Array<TodolistType>) => ({type: 'GET-TODOS', todos} as const)

//thunk
export const getTodosTC = () => (dispatch: Dispatch<ActionType | AppActionsType>) => {
	dispatch(setStatusAC('loading'))
	TodoApi.getTodo()
		.then((res) => {
			const todos = res.data
			dispatch(getTodosAC(todos))
			dispatch(setStatusAC('succeeded'))
		})
}
export const removeTodosTC = (todolistId: string) => (dispatch: Dispatch<ActionType | AppActionsType>) => {
	dispatch(setStatusAC('loading'))
	TodoApi.deleteTodo(todolistId)
		.then((res) => {
			dispatch(RemoveTodolistAC(todolistId))
			dispatch(setStatusAC('succeeded'))
		})
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionType | AppActionsType>) => {
	dispatch(setStatusAC('loading'))
	TodoApi.createTodo(title)
		.then((res) => {
			if (res.data.resultCode === 0) {
				dispatch(AddTodolistAC(res.data.data.item))
				dispatch(setStatusAC('succeeded'))
			}else{
				dispatch(setErrorAC(res.data.messages[0]))
				dispatch(setStatusAC('failed'))
			}

		})
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionType | AppActionsType>) => {
	TodoApi.updateTitleTodo(todolistId, title)
		.then((res) => {
			dispatch(ChangeTodolistTitleAC(todolistId, title))
			dispatch(setStatusAC('succeeded'))
		})
}

//types
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & { filter: FilterValuesType, entityStatus: RequestStatusType }
export type RemoveTodolistAT = ReturnType<typeof RemoveTodolistAC>
export type AddTodolistAT = ReturnType<typeof AddTodolistAC>
export type ChangeTodolistFilterAT = ReturnType<typeof ChangeTodolistFilterAC>
export type ChangeTodolistTitleAT = ReturnType<typeof ChangeTodolistTitleAC>
export type GetTodosAT = ReturnType<typeof getTodosAC>
export type ActionType =
	| RemoveTodolistAT
	| AddTodolistAT
	| ChangeTodolistFilterAT
	| ChangeTodolistTitleAT
	| GetTodosAT



import axios from "axios";

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	headers: {'API-KEY': 'ff93b3ea-e4dd-4fd8-99af-ef77ec15da18'},
	withCredentials: true,
});

export const TodoApi = {
	getTodo() {
		return instance.get<Array<TodolistType>>(`todo-lists`)
	},
	createTodo(title: string) {
		return instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, {title})
	},
	deleteTodo(todolistId: string) {
		return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
	},
	updateTitleTodo(todolistId: string, title: string) {
		return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
	},
	getTaskResponse(todolistId:string){
		return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
	},
	deleteTaskResponse(todolistId:string, taskId:string){
		return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
	},
	createTaskResponse(todolistId:string,title:string){
		return instance.post(`todo-lists/${todolistId}/tasks/${title}`)

	}
}

export type TodolistType = {
	id: string,
	title: string,
	addedDate: string,
	order: number
}
type ResponseType<T = {}> = {
	resultCode: number
	messages: Array<string>,
	data: T,
	fieldsErrors: Array<string>
}
export enum TaskStatuses{
	New = 0,
	InProgress = 1,
	Completed,
	Draft = 3
}
export enum TaskPriorities{
	Low =0,
	Middle = 1,
	Hi = 2,
	Urgently = 3,
	Later = 4
}
export type TaskType={
	description: string
	title: string
	status:TaskStatuses
	priority:TaskPriorities
	startDate:string
	deadline:string
	id: string
	todoListId: string
	order:number
	addedDate: string
}
type UpdateTaskType={
	title: string
	description:string
	status: number
	priority: number
	startDate: string
	deadline:string
}
type GetTasksResponse={
	totalCount:number
	error:string|null
	items:TaskType[ ]
}
import {TasksType} from "../App";


export type RemoveTaskAT = {
	type: "REMOVE-TASK"
	id: string
	todolistID: string

}
export type AddTaskAT = {
	type: "ADD-TASK"


}

export type ActionType = RemoveTaskAT | AddTaskAT

export const tasksReducer = (state: TasksType, action: ActionType): TasksType => {
	switch (action.type) {
		case "REMOVE-TASK":
			return {...state,[action.todolistID]: state[action.todolistID].filter(el=>el.id!==action.id) }
		case "ADD-TASK":

			return state

		default:
			return state
	}
}
export const removeTaskAC = (id: string, todolistID: string): RemoveTaskAT => {
	return {type: "REMOVE-TASK",id, todolistID}
}
export const addTaskAC = (): AddTaskAT => {
	return {
		type: "ADD-TASK",
	}
}

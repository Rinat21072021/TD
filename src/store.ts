import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./reducer/tasks-reducer";
import {todolistsReducer} from "./reducer/todolists-reducer";


const rootReducer = combineReducers({
	task:tasksReducer,
	todolist:todolistsReducer,
})
export const store = createStore(rootReducer)
export type AppRootStateType = ReturnType<typeof rootReducer>
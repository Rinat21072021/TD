import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {tasksReducer} from "./reducer/tasks-reducer";
import {todolistsReducer} from "./reducer/todolists-reducer";
import {appReducer} from "./reducer/app-reducer";



const rootReducer = combineReducers({
	task:tasksReducer,
	todolist:todolistsReducer,
	app:appReducer,
})
export const store = createStore(rootReducer,applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>
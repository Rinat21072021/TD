import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {tasksReducer} from "./reducer/tasks-reducer";
import {todolistsReducer} from "./reducer/todolists-reducer";



const rootReducer = combineReducers({
	task:tasksReducer,
	todolist:todolistsReducer,
})
export const store = createStore(rootReducer,applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>
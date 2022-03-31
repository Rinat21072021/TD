export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
	status: 'loading' as RequestStatusType,
	error: null as NullableType<string>
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
	switch (action.type) {
		case 'APP/SET-STATUS':
			return {...state, status: action.status}
		case 'APP/SET-ERROR':
			return {...state, error: action.error}
		default:
			return state
	}
}
export const setErrorAC = (error:NullableType<string>)=>({type:'APP/SET-ERROR', error}as const)
export const setStatusAC = (status:RequestStatusType)=>({type:'APP/SET-STATUS', status}as const)

export type SetErrorAT = ReturnType<typeof setErrorAC>
export type SetStatusAT = ReturnType<typeof setStatusAC>


export type AppActionsType = SetErrorAT | SetStatusAT
export type NullableType<T> = null | T
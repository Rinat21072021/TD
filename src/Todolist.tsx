import React, {useCallback, useEffect} from 'react';
import {FilterValuesType} from './trash/App';
import {ButtonComponents} from "./components/ButtonComponents";
import {InputWithButton} from "./components/InputWhithButton";
import {EditSpan} from "./components/EditSpan";
import {ButtonGroup, List, Typography} from "@material-ui/core";
import {Task} from "./components/Task";
import {TaskStatuses, TaskType} from "./api/TodolistApi";
import {useDispatch} from "react-redux";
import {getTaskTC} from "./reducer/tasks-reducer";
import {TodolistDomainType} from "./reducer/todolists-reducer";


// export type TaskType = {
// 	id: string
// 	title: string
// 	status:TaskStatuses
// }

type PropsType = {
	todolist:TodolistDomainType
	// title: string
	tasks: Array<TaskType>
	removeTask: (taskId: string, todolistID: string) => void
	onChangeTitleTodolist: (newTitle: string, todolistID: string) => void
	changeFilter: (value: FilterValuesType, todolistID: string) => void
	addTask: (title: string, todolistID: string) => void
	changeTaskStatus: (taskId: string, status:TaskStatuses, todolistID: string) => void
	onChangeTitle: (taskId: string, title: string, todolistID: string) => void
	// filter: FilterValuesType
	// todolistID: string
	removeTodolist: (todolistID: string) => void

}
export type ButtonIconType = 'removeTodo' | 'removeTask' | 'all' | 'active' | 'completed'

export const Todolist = React.memo((props: PropsType) => {
	console.log("Todolist called")
	const dispatch = useDispatch()
	useEffect(()=>{
		dispatch(getTaskTC(props.todolist.id))
	},[])

	const removeTodolistHandler = useCallback(() => {
		props.removeTodolist(props.todolist.id)
	}, [props.removeTodolist, props.todolist.id])

	const changeFilter = useCallback((value: FilterValuesType) => {
		props.changeFilter(value, props.todolist.id)
	}, [props.changeFilter, props.todolist.id])

	const onClickHandlerRemove = useCallback((Tid: string) => {
		props.removeTask(Tid, props.todolist.id)
	}, [props.removeTask, props.todolist.id])

	const onChangeTitleTodolistHandler = useCallback((newTitle: string) => {
		console.log(newTitle, props.todolist.id)
		props.onChangeTitleTodolist(newTitle, props.todolist.id)
	}, [props.onChangeTitleTodolist, props.todolist.id])

	const addTaskWrapper = useCallback((title: string) => {
		props.addTask(title, props.todolist.id)
	}, [props.addTask, props.todolist.id])


	let tasksForTodolist = props.tasks;

	if (props.todolist.filter === "active") {
		tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed);
	}
	if (props.todolist.filter === "completed") {
		tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New);
	}

	return <div>

		<Typography
			variant={'h5'}
			style={{fontWeight: 'bold'}}
			align={"center"}
		>
			<EditSpan title={props.todolist.title} onChangeTitle={onChangeTitleTodolistHandler}/>
			<ButtonComponents icon={'removeTodo'} callback={() => removeTodolistHandler()}/>
		</Typography>

		<InputWithButton isLabel={false} callback={addTaskWrapper}/>

		<List>
			{
				tasksForTodolist?.map(t => <Task key={t.id}
												task={t}
												changeTaskStatus={props.changeTaskStatus}
												todolistID={props.todolist.id}
												onChangeTitle={props.onChangeTitle}
												onClickHandlerRemove={onClickHandlerRemove}

					/>
				)
			}
		</List>
		<div>
			<ButtonGroup variant={'contained'} size={'small'} disableElevation>
				<ButtonComponents callback={() => changeFilter('all')} icon='all' filter={props.todolist.filter}/>
				<ButtonComponents callback={() => changeFilter('active')} icon='active' filter={props.todolist.filter}/>
				<ButtonComponents callback={() => changeFilter('completed')} icon='completed' filter={props.todolist.filter}/>
			</ButtonGroup>
		</div>
	</div>
})

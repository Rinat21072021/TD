import React, {useCallback, useEffect} from 'react';
import {FilterValuesType} from './App';
import {ButtonComponents} from "./components/ButtonComponents";
import {InputWithButton} from "./components/InputWhithButton";
import {EditSpan} from "./components/EditSpan";
import {ButtonGroup, List, Typography} from "@material-ui/core";
import {Task} from "./components/Task";
import {TaskStatuses, TaskType} from "./api/TodolistApi";
import {useDispatch} from "react-redux";
import {getTaskTC} from "./reducer/tasks-reducer";


// export type TaskType = {
// 	id: string
// 	title: string
// 	status:TaskStatuses
// }

type PropsType = {
	title: string
	tasks: Array<TaskType>
	removeTask: (taskId: string, todolistID: string) => void
	onChangeTitleTodolist: (newTitle: string, todolistID: string) => void
	changeFilter: (value: FilterValuesType, todolistID: string) => void
	addTask: (title: string, todolistID: string) => void
	changeTaskStatus: (taskId: string, status:TaskStatuses, todolistID: string) => void
	onChangeTitle: (taskId: string, title: string, todolistID: string) => void
	filter: FilterValuesType
	todolistID: string
	removeTodolist: (todolistID: string) => void

}
export type ButtonIconType = 'removeTodo' | 'removeTask' | 'all' | 'active' | 'completed'

export const Todolist = React.memo((props: PropsType) => {
	console.log("Todolist called")
	const dispatch = useDispatch()
	useEffect(()=>{
		dispatch(getTaskTC(props.todolistID))
	},[])

	const removeTodolistHandler = useCallback(() => {
		props.removeTodolist(props.todolistID)
	}, [props.removeTodolist, props.todolistID])

	const changeFilter = useCallback((value: FilterValuesType) => {
		props.changeFilter(value, props.todolistID)
	}, [props.changeFilter, props.todolistID])

	const onClickHandlerRemove = useCallback((Tid: string) => {
		props.removeTask(Tid, props.todolistID)
	}, [props.removeTask, props.todolistID])

	const onChangeTitleTodolistHandler = useCallback((newTitle: string) => {
		console.log(newTitle, props.todolistID)
		props.onChangeTitleTodolist(newTitle, props.todolistID)
	}, [props.onChangeTitleTodolist, props.todolistID])

	const addTaskWrapper = useCallback((title: string) => {
		props.addTask(title, props.todolistID)
	}, [props.addTask, props.todolistID])


	let tasksForTodolist = props.tasks;

	if (props.filter === "active") {
		tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed);
	}
	if (props.filter === "completed") {
		tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New);
	}

	return <div>

		<Typography
			variant={'h5'}
			style={{fontWeight: 'bold'}}
			align={"center"}
		>
			<EditSpan title={props.title} onChangeTitle={onChangeTitleTodolistHandler}/>
			<ButtonComponents icon={'removeTodo'} callback={() => removeTodolistHandler()}/>
		</Typography>

		<InputWithButton isLabel={false} callback={addTaskWrapper}/>

		<List>
			{
				tasksForTodolist?.map(t => <Task key={t.id}
												task={t}
												changeTaskStatus={props.changeTaskStatus}
												todolistID={props.todolistID}
												onChangeTitle={props.onChangeTitle}
												onClickHandlerRemove={onClickHandlerRemove}

					/>
				)
			}
		</List>
		<div>
			<ButtonGroup variant={'contained'} size={'small'} disableElevation>
				<ButtonComponents callback={() => changeFilter('all')} icon='all' filter={props.filter}/>
				<ButtonComponents callback={() => changeFilter('active')} icon='active' filter={props.filter}/>
				<ButtonComponents callback={() => changeFilter('completed')} icon='completed' filter={props.filter}/>
			</ButtonGroup>
		</div>
	</div>
})

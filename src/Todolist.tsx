import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {ButtonComponents} from "./components/ButtonComponents";
import {InputWithButton} from "./components/InputWhithButton";
import {EditSpan} from "./components/EditSpan";
import {ButtonGroup, IconButton, List, ListItem, Typography} from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';





export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type PropsType = {
	title: string
	tasks: Array<TaskType>
	removeTask: (taskId: string, todolistID: string) => void
	onChangeTitleTodolist: (newTitle: string, todolistID: string) => void
	changeFilter: (value: FilterValuesType, todolistID: string) => void
	addTask: (title: string, todolistID: string) => void
	changeTaskStatus: (taskId: string, isDone: boolean, todolistID: string) => void
	onChangeTitle: (taskId: string, title: string, todolistID: string) => void
	filter: FilterValuesType
	todolistID: string
	removeTodolist: (todolistID: string) => void

}
export type ButtonIconType = 'removeTodo' | 'removeTask' | 'all' | 'active' | 'completed'

export function Todolist(props: PropsType) {

	const removeTodolistHandler = () => {
		props.removeTodolist(props.todolistID)
	}
	const tsarFoo = (value: FilterValuesType) => {
		props.changeFilter(value, props.todolistID)
	}
	const onClickHandlerRemove = (Tid: string) => props.removeTask(Tid, props.todolistID)
	const onChangeTitleTodolistHandler = (newTitle: string) => {
		props.onChangeTitleTodolist(newTitle, props.todolistID)
	}
	const addTaskWrapper = (title: string) => {
		props.addTask(title, props.todolistID)
	}

	return <div>

		<Typography variant={'h5'} style={{fontWeight: 'bold'}}>
			<EditSpan title={props.title} onChangeTitle={onChangeTitleTodolistHandler}/>
			<ButtonComponents icon={'removeTodo'} callback={() => removeTodolistHandler()}/>
		</Typography>

		<InputWithButton callback={addTaskWrapper}/>

		<List>
			{
				props.tasks.map(t => {
					// const onClickHandlerRemove = () => props.removeTask(t.id, props.todolistID)
					const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
						props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistID);
					}
					const onChangeTitleHandler = (title: string) => {
						props.onChangeTitle(t.id, title, props.todolistID);
					}
					return <ListItem divider
									 disableGutters
									 style={{padding: '0px', justifyContent:'space-between', display:'flex'}}
									 key={t.id}
									 className={t.isDone ? "is-done" : ""}>
						<Checkbox onChange={onChangeHandler}
								  checked={t.isDone}
								  size={'small'}
								  color={'primary'}
						/>

						<EditSpan title={t.title} onChangeTitle={onChangeTitleHandler}/>
						<ButtonComponents icon={'removeTask'} callback={() => onClickHandlerRemove(t.id)}/>
					</ListItem>
				})
			}
		</List>
		<div>
			<ButtonGroup variant={'contained'} size={'small'} disableElevation>
				<ButtonComponents callback={() => tsarFoo('all')} icon='all' filter={props.filter}/>
				<ButtonComponents callback={() => tsarFoo('active')} icon='active' filter={props.filter}/>
				<ButtonComponents callback={() => tsarFoo('completed')} icon='completed' filter={props.filter}/>
			</ButtonGroup>
		</div>
	</div>
}

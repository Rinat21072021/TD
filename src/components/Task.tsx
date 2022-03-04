import React, {ChangeEvent} from "react";
import {ListItem} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import {EditSpan} from "./EditSpan";
import {ButtonComponents} from "./ButtonComponents";
import {TaskType} from "../Todolist";
import {TaskStatuses} from "../api/TodolistApi";

type TaskPropsType = {
	changeTaskStatus: (taskId: string, status: TaskStatuses, todolistID: string) => void
	onChangeTitle: (taskId: string, title: string, todolistID: string) => void
	onClickHandlerRemove: (taskId: string) => void
	task: TaskType
	todolistID: string


}
export const Task = React.memo((props: TaskPropsType) => {
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const taskStatus = e.currentTarget.checked ? TaskStatuses.New : TaskStatuses.Completed
		props.changeTaskStatus(props.task.id, taskStatus, props.todolistID);
	}
	const onChangeTitleHandler = (title: string) => {
		props.onChangeTitle(props.task.id, title, props.todolistID);
	}
	return <ListItem divider
					 disableGutters
					 style={{padding: '0px', justifyContent: 'space-between', display: 'flex'}}
					 key={props.task.id}
					 className={props.task.status ? "is-done" : ""}>
		<Checkbox
			onChange={onChangeHandler}
			checked={props.task.status === TaskStatuses.Completed}
			size={'small'}
			color={'primary'}
		/>

		<EditSpan title={props.task.title}
				  onChangeTitle={onChangeTitleHandler}
		/>
		<ButtonComponents icon={'removeTask'} callback={() => props.onClickHandlerRemove(props.task.id)}/>
	</ListItem>
})
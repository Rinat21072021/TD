import React, {ChangeEvent} from "react";
import {ListItem} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import {EditSpan} from "./EditSpan";
import {ButtonComponents} from "./ButtonComponents";
import {TaskType} from "../Todolist";
type TaskPropsType={
	changeTaskStatus: (taskId: string, isDone: boolean, todolistID: string) => void
	onChangeTitle: (taskId: string, title: string, todolistID: string) => void
	onClickHandlerRemove:(taskId: string)=>void
	task:TaskType
	todolistID:string


}
export const Task = React.memo((props:TaskPropsType)=>{
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistID);
	}
	const onChangeTitleHandler = (title: string) => {
		props.onChangeTitle(props.task.id, title, props.todolistID);
	}
	return <ListItem divider
					 disableGutters
					 style={{padding: '0px', justifyContent: 'space-between', display: 'flex'}}
					 key={props.task.id}
					 className={props.task.isDone ? "is-done" : ""}>
		<Checkbox
			onChange={onChangeHandler}
			checked={props.task.isDone}
			size={'small'}
			color={'primary'}
		/>

		<EditSpan title={props.task.title}
				  onChangeTitle={onChangeTitleHandler}
		/>
		<ButtonComponents icon={'removeTask'} callback={() => props.onClickHandlerRemove(props.task.id)}/>
	</ListItem>
})
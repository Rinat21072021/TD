import React, {useCallback} from "react";
import './../App.css';
import {Button, IconButton} from "@material-ui/core";
import {DeleteOutline, HighlightOff} from "@material-ui/icons";
import {ButtonIconType} from "../Todolist";

type propsType = {
	callback: () => void
	filter?: string
	icon: ButtonIconType
}

export const ButtonComponents =React.memo( (props: propsType) => {
	const onClickHandler = useCallback(() => {
		props.callback()
	},[props.callback])

	switch (props.icon) {
		case 'removeTodo':
			return (
				<IconButton onClick={onClickHandler}>
					<HighlightOff fontSize={'small'} color={'primary'}/>
				</IconButton>
			)
		case 'removeTask':
			return (
				<IconButton onClick={onClickHandler}>
					<DeleteOutline fontSize={'small'}/>
				</IconButton>
			)
		case 'all' :
			return (
				<Button
					onClick={onClickHandler}
					color={props.filter === props.icon ? "secondary" : "primary"}
				>{props.icon}
				</Button>
			)
		case 'active':
			return (
				<Button
					onClick={onClickHandler}
					color={props.filter === props.icon ? "secondary" : "primary"}
				>{props.icon}
				</Button>
			)
		case 'completed':
			return (
				<Button
					onClick={onClickHandler}
					color={props.filter === props.icon ? "secondary" : "primary"}
				>{props.icon}
				</Button>
			)
		default:
			return <Button/>
	}


})
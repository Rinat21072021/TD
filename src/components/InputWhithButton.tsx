import React, {ChangeEvent, KeyboardEvent, useState} from "react"
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type typeProps = {
	callback: (title: string) => void
	isLabel: boolean

}
export const InputWithButton = (props: typeProps) => {
	let [title, setTitle] = useState("")
	let [error, setError] = useState<string | null>(null)

	const addTask = () => {
		if (title.trim() !== "") {
			props.callback(title.trim());
			setTitle("");
		} else {
			setError("Title is required");
		}
	}
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}
	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		setError(null);
		if (e.charCode === 13) {
			addTask();
		}
	}

	if (props.isLabel) {
		return (
			<div>
				<TextField
					label="Add Todo"
					value={title}
					onChange={onChangeHandler}
					onKeyPress={onKeyPressHandler}
					className={error ? "error" : ""}
					variant="standard"
					color="secondary"
				/>
				<IconButton onClick={addTask}>
					<AddBox/>
				</IconButton>

				{error && <div className="error-message">{error}</div>}
			</div>
		)
	} else {
		return (
			<div>
				<TextField
					label="Add Task"
					value={title}
					onChange={onChangeHandler}
					onKeyPress={onKeyPressHandler}
					className={error ? "error" : ""}
					variant="standard"
					color="secondary"
				/>

				<IconButton onClick={addTask}>
					<AddBox/>
				</IconButton>

				{error && <div className="error-message">{error}</div>}
			</div>)
	}

}
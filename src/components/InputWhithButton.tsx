import React, {ChangeEvent, KeyboardEvent, useState} from "react"
import {Icon, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
type typeProps={
    callback: (title:string)=>void

}
export const InputWithButton=(props:typeProps)=>{
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
    return(
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />

            {/*<Icon onClick={addTask} className="fa fa-plus-circle" color="secondary" />*/}
            <button onClick={addTask}>+</button>

            {error && <div className="error-message">{error}</div>}
        </div>
    )
}
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";
import {InputWithButton} from "./components/InputWhithButton";
import {Input} from "./components/Input";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistID: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistID: string) => void
    filter: FilterValuesType
    todolistID: string
    removeTodolist: (todolistID: string) => void
}

export function Todolist(props: PropsType) {

    // let [title, setTitle] = useState("")
    // let [error, setError] = useState<string | null>(null)
    //
    // const errorChecked = () => {
    //     if (title.trim() !== "") {
    //         props.addTask(title.trim(), props.todolistID);
    //         setTitle("");
    //     } else {
    //         setError("Title is required");
    //     }
    // }
    // // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    // }
    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null);
    //     if (e.charCode === 13) {
    //         addTask();
    //     }
    // }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }
    const tsarFoo = (value: FilterValuesType) => {
        props.changeFilter(value, props.todolistID)
    }
    const onClickHandlerRemove = (Tid: string) => props.removeTask(Tid, props.todolistID)


    return <div>

        <h3>{props.title} <Button callback={() => removeTodolistHandler()} name='X'/></h3>
        <InputWithButton callback={props.addTask} todolistID={props.todolistID}/>
        {/*<Button callback={()=>errorChecked()} name={'x'}/>*/}

        <ul>
            {
                props.tasks.map(t => {
                    // const onClickHandlerRemove = () => props.removeTask(t.id, props.todolistID)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistID);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        {/*<button onClick={onClickHandler}>x</button>*/}
                        <Button callback={() => onClickHandlerRemove(t.id)} name={'x'}/>
                    </li>
                })
            }
        </ul>
        <div>

            <Button callback={() => tsarFoo('all')} name='all' filter={props.filter}/>
            <Button callback={() => tsarFoo('active')} name='active' filter={props.filter}/>
            <Button callback={() => tsarFoo('completed')} name='completed' filter={props.filter}/>
        </div>
    </div>
}

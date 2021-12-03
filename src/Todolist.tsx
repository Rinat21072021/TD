import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";
import {InputWithButton} from "./components/InputWhithButton";
import {EditSpan} from "./components/EditSpan";

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


    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }
    const tsarFoo = (value: FilterValuesType) => {
        props.changeFilter(value, props.todolistID)
    }
    const onClickHandlerRemove = (Tid: string) => props.removeTask(Tid, props.todolistID)

    const addTaskWrapper = (title: string) => {
        props.addTask(title, props.todolistID)
    }

    return <div>

        <h3>{props.title} <Button callback={() => removeTodolistHandler()} name='X'/></h3>
        <InputWithButton callback={addTaskWrapper} />
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
                        {/*<span>{t.title}</span>*/}
                        <EditSpan title={t.title} modeSpan={true} />
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

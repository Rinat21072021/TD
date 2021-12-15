import React, {ChangeEvent, useState} from "react";

export type EditSpanPropsType = {
    title: string
    onChangeTitle:(title:string)=>void

}
export const EditSpan = (props: EditSpanPropsType) => {
    const [modeSpan, setModeSpan] = useState(true)
    const [title, setTitle] = useState('')

    const activeEditMod = () => {
        setModeSpan(true)
        props.onChangeTitle(title)
    }
    const editInputHandler = () => {
        setModeSpan(false)
        setTitle(props.title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return modeSpan
        ? <span onDoubleClick={editInputHandler}>{props.title}</span>
        : <input autoFocus
                 onBlur={activeEditMod}
                 value={title}
                 onChange={onChangeTitleHandler}

        />
}
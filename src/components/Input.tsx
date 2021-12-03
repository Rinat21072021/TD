import React, {ChangeEvent, KeyboardEvent, useState} from "react";
type propsType={
title:string
    setTitle:(title:string)=>void
    callback:()=>void
    setError:(error:string)=>void
    error:string | null


}
export const Input=(props:propsType)=> {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        props.setError('');
        if (e.charCode === 13) {
            props.callback();
        }
    }
    return(
    <div>
        <input value={props.title}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
               className={props.error ? "error" : ""}
        />

        {props.error && <div className="error-message">{props.error}</div>}
    </div>
    )

}
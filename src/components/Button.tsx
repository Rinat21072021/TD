import React from "react";
import './../App.css'
type propsType = {
    callback: () => void
    name: string
    filter?:string
}
export const Button = (props:propsType) => {
    const onClickHandler = () => {
        props.callback()
    }


    return (
        <button onClick={onClickHandler} className={props.filter === props.name ? "activeFilter" : ""} >{props.name} </button>
    )
}
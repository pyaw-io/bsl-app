import React from 'react'
import classes from './Button.module.css'


function Button(props) {
  return (
    <button value = {props.value} onClick={props.onClick}  className={`${classes.button} ${props.className}`}  type={props.type || 'button'} >{props.children}</button>
  )
}

export default Button
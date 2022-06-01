import React from 'react'

import classes from './Button.module.css'

const Button = (props) => {
    return (
        <button  className={classes.button} value={props.value} onClick={props.onClick}>{props.children}</button>


    )
}

export default Button
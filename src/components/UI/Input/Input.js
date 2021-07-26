import React, { useImperativeHandle, useRef } from 'react';
import classes from './Input.module.css'

const Input = React.forwardRef((props,ref) => {
    const inputRef = useRef();

    const activate = () =>{
      inputRef.current.focus()
    }

    useImperativeHandle(ref,()=>{
      return {
        //activate refers to the activate in this file
        //this is a translation object
        focus: activate
      }
    })

    return (
        <div
          className={`${classes.control} ${
            props.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor={props.id}>{props.label}</label>
          <input
            type={props.type}
            id={props.id}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
          />
        </div>
    )
});

export default Input 
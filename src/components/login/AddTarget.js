import React, { useState,useRef } from 'react'


import {addTarget} from '../../features/readingSlice'
import {useDispatch} from 'react-redux'

import classes from './AddTarget.module.css'
import Button from '../ui/Button'
import Card from '../ui/Card'

function AddTarget(props) {
  const dispatch = useDispatch()
  const targetInputRef = useRef();
  const periodInputRef = useRef();

  
  const [invalidInput, setInputIsValid] = useState(false);



  


  const formSubmitHandler = (event) =>{
    event.preventDefault();
    const targetInput = targetInputRef.current.value.trim();
    const periodInput = periodInputRef.current.value;
    

    if (isNaN(targetInput) || targetInput === "") {
      setInputIsValid(`Enter a valid number`);

      return;
    }

    setInputIsValid(false);

    const newTarget = {
      period: periodInput.replace(" ", "_"),
      target: targetInput,
    };


    dispatch(addTarget(newTarget));


  }

 



  return (
    
   
      <form  className={classes.form} onSubmit={formSubmitHandler}>
      <Card className={classes.form_input}>
      
    
      <label>Period</label>
    
      <input ref={periodInputRef} placeholder='Before Breakfast' type='text'></input>
      
      <label>Target</label>
      <input  ref={targetInputRef} type='number' placeholder='5.7'></input>
      

      <Button className={classes.button} type='submit'>Add</Button>

     
      {invalidInput?invalidInput: ''}
       </Card>

       
      </form>
    
  )
}

export default AddTarget
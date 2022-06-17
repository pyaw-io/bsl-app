import {React,Fragment} from "react";
import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { target } from "../../features/readingSlice";
import { addTarget } from "../../features/readingSlice";
import AddTarget from "../login/AddTarget";
import Button from "../ui/Button";
import classes from "./InputTargets.module.css";

export default function InputTargets() {
  const targetInputRef = useRef();
  const periodInputRef = useRef();
  const [invalidInput, setInputIsValid] = useState(false);
  const [clickedSave, setClickedSave] = useState(false);
  const dispatch = useDispatch();
  const initialtarget = useSelector(target);
  const targetArray = Object.keys(initialtarget);
  const [addTargetToggle,setAddTargetToggle] = useState(false)

  const targetEditHandler = (event) => {
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
    setClickedSave(!clickedSave);
  };

  const addTargetHandler =() =>{
    setAddTargetToggle(true)
  
  
  }

  return (
    <Fragment>
    {addTargetToggle? <AddTarget/> : <form onSubmit={targetEditHandler} className={classes.input_form}>
    
      <label>Select Period</label>
      <select name="period" id="period" ref={periodInputRef}>
        {targetArray.map((period, index) => (
          <option key={index}>{period.replace("_", " ")}</option>
        ))}
      </select>

      <label>Target</label>
      <input ref={targetInputRef}></input>
      {clickedSave ? "New Target Added" : <button className={classes.input_button} >Save Change</button>}
      
      <Button className={classes.t_button} onClick={addTargetHandler}>Add New</Button>

      {invalidInput ? invalidInput : ""}
    </form>}
    </Fragment>
  );
}

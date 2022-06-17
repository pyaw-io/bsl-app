import {  Fragment, useEffect, useState } from "react";
import Button from "../ui/Button";


import InputTargets from "./InputTargets";
import { target } from "../../features/readingSlice";
import { useSelector } from "react-redux";
import classes from "./Target.module.css";
import AddTarget from "../login/AddTarget";

const Target = () => {
  const [newTarget,setNewTarget] = useState(false)
  const initialtarget = useSelector(target);
  const targetArray = Object.entries(initialtarget);
  const [emptyTarget,setEmptyTarget] = useState(false)



  useEffect(() => {
    if(targetArray.length > 0){
      setEmptyTarget(false)
    }else{

      setEmptyTarget(true)
    }

  },[initialtarget])


  const editTargetHandler =() =>{
    setNewTarget(!newTarget)
  
  
  }
 




  return (
    <Fragment>

     {!emptyTarget? 
     <div className={classes.target_card}>
      {newTarget? <InputTargets/> :  <table className={classes.target}>
      <tbody className={classes.rows}>
        <tr>
          <th className={classes.target_heading}>Period</th>
          <th className={classes.target_heading}>Target</th>
        </tr>
        {targetArray.map((target,index) => {
          return (
            <tr key={index}>
              <td>{target[0].replace('_',' ')}</td>
              <td>{target[1]}</td> 
            </tr>
          );
        })}
      </tbody>
    </table>}
   <Button className={classes.button} onClick={editTargetHandler}>{newTarget? 'Close' :'Edit'}</Button>
  
     
    
    </div> : <div className={classes.add_target}><AddTarget/></div>
     }


    </Fragment>

    

    
  
    


   
    
  );
};

export default Target;

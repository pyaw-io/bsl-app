import {  useState } from "react";


import InputTargets from "./InputTargets";
import { target } from "../../features/readingSlice";
import { useSelector } from "react-redux";
import classes from "./Target.module.css";

const Target = () => {
  const [newTarget,setNewTarget] = useState(false)
  const initialtarget = useSelector(target);
  const targetArray = Object.entries(initialtarget);

  const editTargetHandler =() =>{
    setNewTarget(!newTarget)
  
  
  }




  return (

    <div>
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
     
      <button  onClick={editTargetHandler}>{newTarget? 'Close' :'Edit'}</button>
    
    </div>
  
    


   
    
  );
};

export default Target;

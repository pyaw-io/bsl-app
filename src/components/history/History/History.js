import { useState} from "react";
import DateSelector from "../Date/DateSelector";

import classes from "./History.module.css";
import DisplayRecords from "../Table/DisplayRecords";
import RecordHeader from "../Table/RecordHeader";

const History = () => {


  const [selectedDate,setSelectedDate]= useState()
  const [registerClick,setRegisterClick] = useState(true)
  const [buttonClicked,setButtonClicked] = useState()
  

  const navigateHandler =(event) => {
    setButtonClicked(event)
    setRegisterClick(!registerClick)
  }



  const chosenDateHandler = (event) => {
    setSelectedDate(event)
  }
  

  

  return (
    <div className={classes.history}>
      <table>
        <tbody>
          <RecordHeader></RecordHeader>
          <DisplayRecords SelectedDate = {selectedDate} OnNavigate ={registerClick} NavButtonClicked={buttonClicked}></DisplayRecords>
        </tbody>
      </table>
      <DateSelector  ChosenDate={chosenDateHandler} Navigate={navigateHandler}></DateSelector>
    </div>
  );
};

export default History;

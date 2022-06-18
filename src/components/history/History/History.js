import { useState,useEffect,Fragment} from "react";
import DateSelector from "../Date/DateSelector";
import DisplayRecords from "../Table/DisplayRecords";
import { useSelector } from "react-redux";
import { allReadings } from "../../../features/readingSlice";
import classes from "./History.module.css";


const History = () => {


  const [selectedDate,setSelectedDate]= useState()
  const [registerClick,setRegisterClick] = useState(true)
  const [buttonClicked,setButtonClicked] = useState()
  const readings = useSelector(allReadings)
  const [emptyData,setEmptyData] = useState(false);

  useEffect(() => {
    if(readings.length > 0){
      setEmptyData(true)
    }else{
      setEmptyData(false)
    }

  },[readings])
  

  const navigateHandler =(event) => {
    setButtonClicked(event)
    setRegisterClick(!registerClick)
  }



  const chosenDateHandler = (event) => {
    setSelectedDate(event)
  }
  

  

  return (

    <Fragment>
      {emptyData? <div className={classes.history}>
      <table>
        <tbody className={classes.tbody}>
          <DisplayRecords SelectedDate = {selectedDate} OnNavigate ={registerClick} NavButtonClicked={buttonClicked}></DisplayRecords>
        </tbody>
      </table>
      <DateSelector  ChosenDate={chosenDateHandler} Navigate={navigateHandler}></DateSelector>
    </div>:  <p className={classes.message}>No record found</p>}


    </Fragment>
   
  );
};

export default History;

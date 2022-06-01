import { useEffect, useRef, useState } from "react";
import { allReadings } from "../../../features/readingSlice";
import Button from "../../UI/Button";
import { useSelector } from "react-redux";

import classes from "./DateSelector.module.css";
import { recordsPerPage } from "../../../utils";

const DateSelector = (props) => {
  const dateInput = useRef();
  const readings = useSelector(allReadings);
  const [pageNumber, setPageNumber] = useState();
  
  const totalPages = Math.ceil(readings.length / recordsPerPage);
    const [currentPage, setcurrentPage] = useState();


  useEffect(() => {
      setcurrentPage(totalPages)
    
    setPageNumber(`${totalPages}/${totalPages}`);

  }, [totalPages,readings]);

  const selectDateHandler = (event) => {
    event.preventDefault();
    const selectedDate = dateInput.current.value;
    const recordIndex = readings.findIndex(
        (record) => record.date === selectedDate
      );

      props.ChosenDate(selectedDate);

      if(recordIndex === -1){
          return
      }

      setcurrentPage(Math.ceil(recordIndex/recordsPerPage))



    


  };

  useEffect(() => {
    setPageNumber(`${currentPage}/${totalPages}`);  
  }, [currentPage])
  

  const navigationButtonHandler = (event) => {
    event.preventDefault();

    const clickedButton = event.target.value;
    props.Navigate(clickedButton);

    if (clickedButton === "next" && currentPage < totalPages) {
        setcurrentPage(currentPage + 1)


        setPageNumber(`${currentPage}/${totalPages}`);
    } else if (clickedButton === "previous"  && currentPage > 1) {
      setcurrentPage(currentPage-1)    
      setPageNumber(`${currentPage}/${totalPages}`);
    }
  };

  return (
    <div className={classes.selector}>
      <form className={classes.form} onSubmit={selectDateHandler}>
        <div>
          <label>Date</label>
          <input type="date" ref={dateInput} name="date" />
        </div>
        <Button>Search</Button>
      </form>

      <div className={classes.navigation}>
        <Button onClick={navigationButtonHandler} value="previous">
          Prev
        </Button>
        <Button onClick={navigationButtonHandler} value="next">
          Next
        </Button>
      </div>
      <div className={classes.pageNumber}>{pageNumber}</div>
    </div>
  );
};

export default DateSelector;

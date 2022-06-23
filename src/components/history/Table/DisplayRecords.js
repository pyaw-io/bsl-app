import { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { recordsPerPage } from "../../../utils";
import {

  dataset,
  readingDates,
} from "../../../features/readingSlice";
import classes from "./DisplayRecords.module.css";

const DisplayRecords = (props) => {
  const dataSet = useSelector(dataset);
  const allDates = useSelector(readingDates);

  const [recordDisplayed, setrecordDisplayed] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState([]);
  const selectedDate = props.SelectedDate
  const registerClick = props.OnNavigate;
  const clickedButton = props.NavButtonClicked;
  const userRecord = dataSet.filter(
    (element) => Object.keys(element) != "date"
  );

 
  //display last page
  useEffect(() => {
    if (!dataSet) {
      return;
    }
    const startIndex = allDates.length - recordsPerPage;
    const endIndex = allDates.length;
    let allRecordArr = [];
    setCurrentPageIndex([startIndex, endIndex]);

    userRecord.map((element) => {
      allRecordArr.push(Object.entries(element));
    });



    setrecordDisplayed(allRecordArr);
  }, [dataSet,selectedDate]);

  // function for navigating through records
  useEffect(() => {
    if (clickedButton === "next") {
      const startIndex = currentPageIndex[1];
      const endIndex = currentPageIndex[1] + recordsPerPage;

      //last page stop clause
      if (currentPageIndex[1] >= allDates.length) {

        return;
      }

      setCurrentPageIndex([startIndex, endIndex]);
    } else if (clickedButton === "previous") {
      const startIndex = currentPageIndex[0] - recordsPerPage;
      const endIndex = currentPageIndex[0];


      //first page stop clause
      if (currentPageIndex[0] === 0) {
        return;
      }

      setCurrentPageIndex([startIndex, endIndex]);

      //display first page if slice is not up to a page
      if (currentPageIndex[0] < recordsPerPage) {
        setCurrentPageIndex([0, recordsPerPage]);
      }
    }
  }, [registerClick, clickedButton, currentPageIndex]);


  //function for searching from a selected date records
  useEffect(() => {
    
    const recordIndex = allDates.findIndex(
      (record) => record === selectedDate
    );



    
    const lastPageIndex = allDates.length - recordsPerPage;

    if (recordIndex === -1 ) {
      return;
    } else {
      const startIndex = recordIndex;
      const endIndex = recordIndex + recordsPerPage;
      setCurrentPageIndex([startIndex, endIndex]);
    }
  }, [selectedDate]);


  return (
    <Fragment>
      <tr className={classes.header} >
        <th >Date</th>
        {allDates.slice(currentPageIndex[0], currentPageIndex[1]).map((date, index) => {
          return <td  key={index}>{date.slice(-5).replace('-','/')}</td>;
          
        })}
      </tr>

      {recordDisplayed.flat().map((record, index) => {
        return (
          <tr className={classes.data} key={index}>
            <th  key={index}>{ recordsPerPage < 8? (record[0].split('_'))[0].charAt(0) + (record[0].split('_'))[1].charAt(0): record[0].replace("_", " ")}</th>
            {record[1]
              .flat()
              .slice(currentPageIndex[0], currentPageIndex[1])
              .map((data,index) => {
                return <td key={index}>{data}</td>;
              })}
          </tr>
        );
      })}
    </Fragment>
  );
};

export default DisplayRecords;

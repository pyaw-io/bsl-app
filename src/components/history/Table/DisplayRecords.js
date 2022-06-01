import { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { recordsPerPage } from "../../../utils";
import { allReadings } from '../../../features/readingSlice';
import classes from "./DisplayRecords.module.css";


const DisplayRecords = (props) => {
  const readings = useSelector(allReadings)
  const [userRecord,setUserRecord] = useState(readings);
  const [recordDisplayed, setrecordDisplayed] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState();
  const selectedDate = props.SelectedDate;
  const registerClick = props.OnNavigate
  const clickedButton = props.NavButtonClicked

  useEffect(() => {
    setUserRecord(readings)
  },[readings])

  


  //function to slice portion of  record to display
  const slicedRecords = (startIndex, endIndex) => {
    const slicedrecord = userRecord.slice(startIndex, endIndex);

    setCurrentPageIndex([+startIndex,+endIndex])
    return  slicedrecord
  };


  //display last page
  useEffect(() => {
    const startIndex = userRecord.length - recordsPerPage
    const endIndex = userRecord.length
   
    setrecordDisplayed(slicedRecords(startIndex,endIndex))
  },[userRecord])


  //function for navigating through records
  useEffect( () => {


    if (clickedButton === "next" ) {

  
      const startIndex = currentPageIndex[1];
      const endIndex = (currentPageIndex[1]) + recordsPerPage

      
      //last page stop clause
      if(currentPageIndex[1] >= userRecord.length){
        return
      }

      setrecordDisplayed(slicedRecords(startIndex, endIndex))
   

      
    } else if (clickedButton === "previous") {

      const startIndex = currentPageIndex[0] - recordsPerPage
      const endIndex = currentPageIndex[0]


      //first page stop clause
      if(currentPageIndex[0] === 0){
        return
      }

      setrecordDisplayed(slicedRecords(startIndex, endIndex))


      //display first page if slice is not up to a page
      if(currentPageIndex[0] < recordsPerPage){
        setCurrentPageIndex([0,8])
        setrecordDisplayed(slicedRecords(0, recordsPerPage))
      }


    }
  },[registerClick,clickedButton])
 



//function for searching from a selected date records
  useEffect(() => {
    const recordIndex = userRecord.findIndex(
      (record) => record.date === selectedDate
    );
    const lastPageIndex =  userRecord.length - recordsPerPage


    if (recordIndex === -1 || recordIndex >= lastPageIndex) {

      return
     
    } else {
      const startIndex = recordIndex;
      const endIndex = recordIndex + recordsPerPage;


       setrecordDisplayed(slicedRecords(startIndex, endIndex))
    }
  }, [selectedDate]);





  return (
    <Fragment>
      {recordDisplayed.map((record, index) => {
        return (
          <tr className={classes.data} key={index}>
            <th>{record.date.slice(5).replace("-", "/")}</th>
            {Object.values(record)
              .slice(1)
              .map((data, index) => {
                return <td key={index}>{data}</td>;
              })}
          </tr>
        );
      })}
    </Fragment>
  );
};

export default DisplayRecords;

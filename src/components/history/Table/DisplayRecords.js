import { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { recordsPerPage } from "../../../utils";
import { allReadings,dataset, readingDates } from '../../../features/readingSlice';
import classes from "./DisplayRecords.module.css";


const DisplayRecords = (props) => {
  const dataSet = useSelector(dataset)
  const allDates =useSelector(readingDates)
  const [recordDisplayed, setrecordDisplayed] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState();
  const selectedDate = props.SelectedDate;
  const registerClick = props.OnNavigate
  const clickedButton = props.NavButtonClicked
  const userRecord =  dataSet.filter(element => Object.keys(element)  != 'date')
  // console.log(userRecord)
  

  //function to slice portion of  record to display
  const slicedRecords = (startIndex, endIndex) => {

    // const allRecords =  dataSet.filter(element => Object.keys(element)  !== 'date');
    const slicedrecord = userRecord.slice(startIndex, endIndex);

    setCurrentPageIndex([+startIndex,+endIndex])
    return  slicedrecord
  };


  //display last page
  useEffect(() => {
    if(!dataSet){
      return
    }
    

    const startIndex = userRecord.length - recordsPerPage
    const endIndex = userRecord.length

    console.log(startIndex,endIndex);
   
    setrecordDisplayed(slicedRecords(startIndex,endIndex))
  },[dataSet])


  // function for navigating through records
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

// console.log(recordDisplayed);





  return (
    <Fragment>
      <tr className={classes.header}>
      <th>DATE</th>
      {allDates.flat().map((data, index) => (
        <td key={index}>{data.replace('-','/')}</td>
      ))}
    </tr>
      {recordDisplayed.map((record, index) => {
        return (
          <tr className={classes.data} key={index}>
            <th>{Object.keys(record)}</th>
            {Object.values(record).flat().map((data, index) => {
                return <td key={index}>{data}</td>;
              })}
          </tr>
        );
      })}
    </Fragment>
  );
};

export default DisplayRecords;

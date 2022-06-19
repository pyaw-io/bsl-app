import {React,Fragment,useEffect ,useState} from "react";
import { useSelector } from "react-redux";
import { dataset, readingDates } from "../../features/readingSlice";
import { random_rgb } from "../../utils";
import classes from "./Graph.module.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Blood Sugar Levels Chart",
    },
  },
};


const Graph = () => {
  const readingData = useSelector(dataset)
  const [emptyData,setEmptyData] = useState(false);
  const allDates = useSelector(readingDates);
  const labels = allDates.map(date => date.slice(-5).replace('-','/'))
  const colours = ['rgb(254, 217, 2)','rgb(4, 3, 255)','rgb(2, 227, 241)','rgb(162, 63, 1)','rgb(202, 92, 241)','rgb(255, 160, 2)','rgb(19, 189, 112)'
]
  let dataSet = [];
  

  useEffect(() => {

    if(readingData.length > 0){
      setEmptyData(true)
    }else{
      setEmptyData(false)
    }

  },[readingData])


  

  readingData.map((datasetObj,i) => {
    const data = Object.values(datasetObj).flat();
    const label = Object.keys(datasetObj).flat();
    dataSet.push({
      label: label,
      data: data,
      borderColor: colours[i]? colours[i] : random_rgb(),
      backgroundColor: colours[i]? colours[i] : random_rgb(),
    });
  });

  const data = {
    labels,
    datasets: dataSet,
  };

  const graphHandler = () => {
   
  };
  return (
    <Fragment>{
      emptyData?<div className={classes.graph}>
      <Line
        className={classes.line}
        onClick={graphHandler}
        options={options}
        data={data}
      />
    </div> : <p className={classes.message}>Record more than two days to show graph</p>
      
      
      }
    
    </Fragment>
  );
};

export default Graph;

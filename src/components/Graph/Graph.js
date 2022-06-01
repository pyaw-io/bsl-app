import React from 'react'
import { useSelector } from 'react-redux'
import { dataset, readingDates } from '../../features/readingSlice'
import {random_rgb} from '../../utils'
import classes from './Graph.module.css'



import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);





const Graph = () => {
    const readingData = useSelector(dataset)
    const labels =useSelector(readingDates)
    let dataSet =[]

    const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' ,
    },
    title: {
      display: true,
      text: 'Blood Sugar Levels Chart',
    },
  },
};
    
    
    

    readingData.map((datasetObj) => {
        const data = Object.values(datasetObj).flat()
        const label = Object.keys(datasetObj).flat()
        const colour = random_rgb()
        

        dataSet.push( {
            label: label,
            data: data,
            borderColor: colour,
            backgroundColor: colour,
            })



    })



    const data = {
    labels,
    datasets: dataSet
    ,
    };






    const graphHandler = () =>{
        console.log(data);
    }
  return <div className={classes.graph}>
             <Line className={classes.line} onClick={graphHandler} options={options} data={data} />
      </div>;
}

export default Graph

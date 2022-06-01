import React, { Fragment, useEffect } from 'react';
import Graph from './components/Graph/Graph';
import Footer from './components/Layout/Footer/Footer';
import History from './components/history/History/History';


import Header from './components/Layout/Header/Header';
import Records from './components/Measure/Records'
import Target from './components/Target/Target';
import { useDispatch } from 'react-redux';
import { setTarget, setReadings } from './features/readingSlice';




const targets = {
 Before_breakfast : '-',
 After_Breakfast : '-',
 After_Lunch : '-',
 After_Dinner : '-',
};

const readings = []

const reading = [
  {
    date: '2022-04-15',
    Before_breakfast: 5.9,
    After_Breakfast: 5.9,
    After_Lunch: 5.9,
    After_Dinner: 5.9,
  },

  {
    date: '2022-04-16',
    Before_breakfast: 9,
    After_Breakfast: 5,
    After_Lunch: 5,
    After_Dinner: 9,
  },
  {
    date: '2022-04-17',
    Before_breakfast: 5.9,
    After_Breakfast: 5.9,
    After_Lunch: 5.9,
    After_Dinner: 5.9,
  },
  {
    date: '2022-04-18',
    Before_breakfast: 5.9,
    After_Breakfast: 5.9,
    After_Lunch: 5.9,
    After_Dinner: 5.9,
  },
  {
    date: '2022-04-19',
    Before_breakfast: 5.9,
    After_Breakfast: 5.9,
    After_Lunch: 5.9,
    After_Dinner: .9,
  },
  {
    date: '2022-04-20',
    Before_breakfast: 5.9,
    After_Breakfast: 5.9,
    After_Lunch: 59,
    After_Dinner: 5.9,
  },
  {
    date: '2022-04-21',
    Before_breakfast: 5.9,
    After_Breakfast: 5.9,
    After_Lunch: 5.9,
    After_Dinner: 5.9,
  },
  {
    date: '2022-04-22',
    Before_breakfast: 5.9,
    After_Breakfast: 5.9,
    After_Lunch: 5.9,
    After_Dinner: 5.9,
  },
  {
    date: '2022-04-23',
    Before_breakfast: 5.9,
    After_Breakfast: 5.9,
    After_Lunch: 5.9,
    After_Dinner: 5.9,
  },
  {
    date: '2022-04-24',
    Before_breakfast: 5.9,
    After_Breakfast: 5.9,
    After_Lunch: 5.9,
    After_Dinner: 5.9,
  },
  {
    date: '2022-04-25',
    Before_breakfast: 5.9,
    After_Breakfast: 5.9,
    After_Lunch: 5.9,
    After_Dinner: 5.9,
  },
  {
    date: '2022-04-26',
    Before_breakfast: 5.9,
    After_Breakfast: 5.9,
    After_Lunch: 5.9,
    After_Dinner: 5.9,
  },
  {
    date: '2022-04-27',
    Before_breakfast: 5.9,
    After_Breakfast: 5.9,
    After_Lunch: 5.9,
    After_Dinner: 5,
  },
  {
    date: '2022-04-28',
    Before_breakfast: 5.9,
    After_Breakfast: 5.9,
    After_Lunch: 5.9,
    After_Dinner: 5.9,
  },
  {
    date: '2022-04-29',
    Before_breakfast: 5.9,
    After_Breakfast: 5.9,
    After_Lunch: 9,
    After_Dinner: 5.9,
  },
  {
    date: '2022-04-30',
    Before_breakfast: 5.9,
    After_Breakfast: 5.9,
    After_Lunch: 5.9,
    After_Dinner: 5.9,
  },
  {
    date: '2022-04-31',
    Before_breakfast: 5.9,
    After_Breakfast: 5.9,
    After_Lunch: 59,
    After_Dinner: 5.9,
  },
  {
    date: '2022-05-01',
    Before_breakfast: 5.9,
    After_Breakfast: 5.9,
    After_Lunch: 5,
    After_Dinner: 5.9,
  },
  {
    date: '2022-05-02',
    Before_breakfast: 5.9,
    After_Breakfast: 5.9,
    After_Lunch: 99,
    After_Dinner: 5.9,
  },
];



function App(props) {

  const dispatch = useDispatch()



  useEffect(() => {
    dispatch(setReadings(readings))
    dispatch(setTarget(targets))
  },[])


   




  
  

  return (
    
   <Fragment>
      <Header/>
      <main>
        <Graph/>
        <Records />
        <History/> 
        <Target/>
      </main>
      <Footer/>
      </Fragment>
  
    
  );
}

export default App;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  
  target:{},
  readings: [],
  period: [],
  dataset: [],
  readingDates: [],
};

export const readingSlice = createSlice({
  name: "reading",
  initialState,
  reducers: {
    setReadings: (state, { payload }) => {
      state.readings = payload;


      const datesArray = payload.map(reading => (
        reading.date.slice(-5)
      ))
      

      state.readingDates = datesArray
    },
    setTarget: (state, { payload }) => {

      const newDS = [
        {BF: [2.3,5.2,5.1,4.0]},
        {AB: [3.5,6.5,7,5.4]},
        {AL: [4.0,1.5,3.7,4.2]},
        {BS: [3.2,3.0,4.2,4.4]},
      ]

      const dates = ['mon','tue','wed','thur','fri','sat']
      state.readingDates = dates
      state.dataset  = newDS


      let datasetArray = [];
      

      Object.keys(payload).forEach((key) => {
        datasetArray.push({ [key]: [] });
      });



      state.period = payload;
      // state.dataset = datasetArray;
      state.target = payload;

    },


    addTarget: (state, { payload }) => {

    
      const newTarget = {
        [payload.period]: payload.target,
      };

      const updatedTargets = {
        ...state.target,
        ...newTarget,
      };


      state.target = updatedTargets;
    }
    ,
    addReading: (state, { payload }) => {
      const readings = [...state.readings];
      const period = state.period;
      const datasetArray = [...state.dataset].filter(object => Object.keys(object) != payload.slot)
      let newDataSetObj;
    

      state.dataset.map((dataObj) => {
        if (Object.keys(dataObj) == payload.slot) {
          // console.log(dataObj);
        

          //flatten the array
         const newArray = [].concat(...Object.values(dataObj),payload.reading)

         console.log(newArray);

         newDataSetObj = {[payload.slot]: newArray}
        
          
        }
      });



      //create new reading
      const newRecord = {
        date: payload.date,
        ...period,
        [payload.slot]: +payload.reading,
      };

      const readingIndex = readings.findIndex(
        (reading) => reading.date === payload.date
      );

      if (readingIndex === -1 || readings.length === 0) {
        //add new record to reading
        state.readings.push(newRecord);
      } else {
        const existingReading = readings[readingIndex]; 
        

        const updatedReading = {
          ...existingReading,
          [payload.slot]: +payload.reading,
        };

        const newReadings = [
          ...readings.slice(0, readingIndex),
          updatedReading,
          ...readings.slice(readingIndex + 1),
        ];


        //removing existing record in dataset
        datasetArray.splice(readingIndex,1)

        state.dataset = [...datasetArray,newDataSetObj]
        state.readings = newReadings;
      }
    },
    deleteReading: (state, { payload }) => {
      const readings = [...state.readings];

      if (payload === " RESET") {
        state.readings = [];
      } else {
        const readingIndex = readings.findIndex(
          (reading) => reading.date === payload.date
        );

        const newReadings = [
          ...readings.slice(0, readingIndex),
          ...readings.slice(readingIndex),
        ];

        state.readings = newReadings;
      }
    },
  },
});

export const { setReadings,  setTarget,addTarget, addReading, deleteReading } =
  readingSlice.actions;

export const allReadings = (state) => state.reading.readings;
export const target = (state) => state.reading.target;
export const dataset = (state) => state.reading.dataset;
export const readingDates = (state) => state.reading.readingDates;

export default readingSlice.reducer;

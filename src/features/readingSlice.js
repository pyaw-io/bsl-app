import { createSlice } from "@reduxjs/toolkit";
import { getSavedReadings } from "../utils";

const initialState = {
  target: {},
  readings: [],
  dataset: [],
  readingDates: [],
};

export const readingSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    setReadings: (state, { payload }) => {
      let readingKeys;
      let initialDataset = [];

      const datesArray = payload.map((reading) => reading.date);

      if (payload.length > 0) {
        readingKeys = Object.keys(payload[0]).filter(element => element !== 'date')
       

        readingKeys.forEach((period) => {
          initialDataset.push(getSavedReadings(payload, period));
        });

        state.dataset = [...initialDataset];

        state.readings = payload;
      } else {
        Object.keys(payload).forEach((key) => {
          initialDataset.push({ [key]: [] });
        });

        state.dataset = initialDataset;
      }

      state.readingDates = datesArray;
    },
    setTarget: (state, { payload }) => {

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
    },
    addReading: (state, { payload }) => {
      let readingIndex;
      const readings = [...state.readings];
      const period = state.target;
      const existingDataset = [...state.dataset];
      const datasetArray = [...state.dataset].filter(
        (object) => Object.keys(object) != payload.slot
      );

      //create new reading
      const newRecord = {
        date: payload.date,
        ...period,
        [payload.slot]: +payload.reading,
      };

      ///check to see if there is any record for the new entered date

      readingIndex = readings.findIndex(
        (reading) => reading.date === payload.date
      );

  

      if (readingIndex === -1 || readings.length === 0) {

        const oldestReadingDate =  readings.length === 0? `${payload.date}` : `${(readings[0].date)}`
      

        //if it the first record, push into the reading array
        if (oldestReadingDate > `${payload.date}`){
          state.readings = [newRecord,...state.readings]


        }else{
         state.readings.push(newRecord); 
        }
        
       
        
      } else {

        //update existing record if its they exist 
        const existingReading = readings[readingIndex];
        let updatedReading;

        ///check the right location to add the new reading to 

        if (`${(readings[0].date)}` > `${payload.date}`){

          updatedReading = {
           
            [payload.slot]: +payload.reading,
             ...existingReading,
          };

        }else{

           updatedReading = {
          ...existingReading,
          [payload.slot]: +payload.reading,
        };
        }

       

        const newReadings = [
          ...readings.slice(0, readingIndex),
          updatedReading,
          ...readings.slice(readingIndex + 1),
        ];

        state.readings = newReadings;
      }


      //add new reading and date to dataset and reading date arrays

        //extract all data set keys into an array
      const datasetKeys = existingDataset
        .map((data) => Object.keys(data))
        .flat();
        ;

        //check to see if new dataset entry is already in dataset by findingits index
      const currentIndex = datasetKeys.findIndex((key) => key == payload.slot);
    

      if (currentIndex > -1) {
        //run this if dataset entry already exist


        let currentArray = Object.values(existingDataset[currentIndex]).flat();

        //checkto see if old value is being update or new value is being added by comparing with index of readings

        if (readingIndex > -1) {

    
          currentArray[readingIndex] = payload.reading;
          const updateObject = { [payload.slot]: currentArray };
          state.dataset = [...datasetArray, updateObject].flat();
        } else {
          

          // if its a new value, check the date being added and add to correct location in the array
          
        
          if (`${(readings[0].date)}` > `${payload.date}`) {

            //add at the front existing array if the date if before the ealiest date in the readings
         

            const updateObject = {
              [payload.slot]: [ payload.reading,...currentArray],
            };
  
            state.dataset = [...datasetArray, updateObject].flat();



        } else{

         //add behind existing array if the date if before the ealiest date in the readings



          const updateObject = {
            [payload.slot]: [...currentArray, payload.reading],
          };

          state.dataset = [...datasetArray, updateObject].flat();
        }
        

        }
      } else {

        //create and add new dataset key vaue pair if its not already in the array
        const newDatsetObject = { [payload.slot]: [+payload.reading] };

        state.dataset = [...datasetArray, newDatsetObject].flat();

      }


     //update the date array accordingly
      const dateIndex = [...state.readingDates].findIndex(
        (date) => date == payload.date
      );



      

      if (dateIndex > -1) {
        //if date already exist in date array return
        return
      } else {
        //if its a new date, addit to the date array and sorl all the date correctly from oldest to newest
        const dataArray = [...state.readingDates].sort(function (
          a,
          b
        ) {
          return new Date(...a.split("-")) - new Date(...b.split("-"));
        });

        state.readingDates = [...dataArray];
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

export const { setReadings, setTarget, addTarget, addReading, deleteReading } =
  readingSlice.actions;

export const allReadings = (state) => state.reading.readings;
export const target = (state) => state.reading.target;
export const dataset = (state) => state.reading.dataset;
export const readingDates = (state) => state.reading.readingDates;

export default readingSlice.reducer;

import {useState,useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addReading } from '../../features/readingSlice'
import { target } from '../../features/readingSlice'

import classes from './Records.module.css'



  


//get current date
const fullDate = new Date()
const date = fullDate.getDate()
const month = fullDate.getMonth()
const year = fullDate.getFullYear()

const dateString = `${year}-0${month + 1}-${date}`



const Records = (props) => {
    const dispatch = useDispatch()
    const initialtarget = useSelector(target)
    const [inputIsValid,setInputIsValid] =useState(true)
    const readingInput = useRef()
    const periodInput = useRef()
    const dateInput = useRef()

    


   
  

    const recordPeriods = Object.keys(initialtarget).map((data,index) => {
       return <option key={index} value={data}>{data.replace('_',' ')}</option>
    })
    



    const formSubmitHandler = (event) => {       
            event.preventDefault()

           

      

            const reading =   Number(readingInput.current.value)
            const  period = (periodInput.current.value)
            const selectedDate = dateInput.current.value
    
            if( reading >= 99  || isNaN(reading)  || reading == ''){
                setInputIsValid(false)
                return
            }

            setInputIsValid(true)

            const measuredInput = {
                date:selectedDate ? selectedDate: dateString ,
                slot: period,
                reading: reading
            }

            dispatch(addReading(measuredInput))


        }

    return (
        <div className={classes.records}>
        <h4>Record Meter reading</h4>
        <form onSubmit={formSubmitHandler} className={classes.record_form} >
            
            <div>
            <label>Date</label>
            <input type="date" ref={dateInput} name="date" />
            </div>
            <div>
            <label>Blood glucose reading</label>
            <input type="text" name='reading' ref={readingInput}/>
            </div>
            <div>
            <label>Select Reading Period</label>
            <select name="period" id="period" ref={periodInput}>
                {recordPeriods}
            </select>
            </div>
            
            <button>Submit</button>

            
        </form>
        { !inputIsValid && <p className={classes.error}> Please Enter a valid Reading</p>}
        </div>

    )
}

export default Records
import { React, useEffect, } from "react";
import { auth, db } from "../../firebase";
import { setTarget, setReadings } from "../../features/readingSlice";
import {  getDoc, doc, updateDoc } from "firebase/firestore";
import Graph from "../graph/Graph";
import Target from "../target/Target";
import Records from "../measure/Records";
import History from "../history/History/History";
import { useSelector, useDispatch } from "react-redux";
import { allReadings, target } from "../../features/readingSlice";

import classes from "./Account.module.css";

function Account() {
  const dispatch = useDispatch()
  const readings = useSelector(allReadings);
  const targets = useSelector(target);

  useEffect( () => {

    const getInitialData =async() => {


      const docRef = doc(db, "users", `${auth.currentUser.uid}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      

      dispatch( setReadings(docSnap.data().readings));
      dispatch(setTarget(docSnap.data().target));
    } else {

      throw new Error({ message: "No such document!" });
    }
    }

    getInitialData()

    

    

  },[])
 

  //
 
  useEffect(() => {

    if(readings.length < 1){
      return
    }
    


    const userRef = doc(db, "users",  `${auth.currentUser.uid}`); 

    updateDoc(userRef, {
      readings: readings,
    });
  }, [readings]);

  useEffect(() => {
      
   if(Object.values(targets).flat().every(el => el == 0)){
    return
   }
   
    const userRef = doc(db, "users",  `${auth.currentUser.uid}`); 

    updateDoc(userRef, {
      target: targets,
    });
  }, [targets]);




  return (
    <div className={classes.homepage}>
      <Graph/>
      <Records />
      <History/>
      <Target/>
    </div>
  );
}

export default Account;

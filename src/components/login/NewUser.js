import { React, useEffect, useState } from "react";
import AddTarget from "./AddTarget";
import Button from "../ui/Button";
import { useNavigate } from "react-router";
import { target } from "../../features/readingSlice";
import { useSelector } from "react-redux/es/exports";
import Target from "../target/Target";
import { collection, getDoc, setDoc, doc } from "firebase/firestore";
import { setTarget, setReadings } from "../../features/readingSlice";
import {useDispatch } from "react-redux";
import { db, auth } from "../../firebase";
import { initialtargets } from "../../utils";
import classes from "./NewUser.module.css";

function NewUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [targetIsEmpty, setTargetIsEmpty] = useState(false);
  const targets = useSelector(target);
  const emptyTarget = Object.keys(target).length === 0 ? false : true;

  useEffect(() => {
    if (Object.keys(targets).length > 0) {
      setTargetIsEmpty(true);
    } else {
      setTargetIsEmpty(false);
    }
  }, [targets]);

  const targetDoneHandler = async () => {
    try {
      const userRef = collection(db, "users");

      await setDoc(doc(userRef, `${auth.currentUser.uid}`), {
        readings: [],
        target: emptyTarget ? { ...target } : { ...initialtargets },
      });

     
      navigate("/Account", { replace: true });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={classes.new_user}>
      <h3>Set target levels</h3>

      <div>
        <p>
          Add at least three periods within the day to record blood sugar levels
          from the blood sugar monitor
        </p>
        <i>
          For example: <span>Period: Before Breakfast Target: 5.4 </span>
        </i>
      </div>

      <div className={classes.form_new}>
        <AddTarget />

        {targetIsEmpty ? <Target /> : ""}
      </div>

      <div className={classes.buttons}>
        <Button onClick={targetDoneHandler} type="submit">
          Done
        </Button>
      </div>
    </div>
  );
}

export default NewUser;

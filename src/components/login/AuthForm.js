import { React, useState,useRef } from "react";
import EmailValidator from "email-validator"
import {  login } from '../../features/authSlice'

import { auth } from "../../firebase";
import {  createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";

import { Link,useNavigate} from "react-router-dom";
import classes from "./AuthForm.module.css";

function AuthForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLogin,setIsLogin] = useState(true)
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false)
  const [invalidNickname,setInvalidNickname] =useState(false)
  const emailRef = useRef()
  const passwordRef = useRef()
  const nicknameRef = useRef()
  const regex = {
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
        nickname: /^\d*[a-zA-Z][a-zA-Z\d]+$/

      }


      const authModuleChanger = () => {
        setIsLogin(!isLogin)
      }


  const formSubmitHandler = (event) => {
    event.preventDefault()

    const emailInput = emailRef.current.value
    const passwordInput = passwordRef.current.value
    const nicknameInput = !isLogin? nicknameRef.current.value : true
    const validEmail = EmailValidator.validate(emailInput);
    const validPassword = regex.password.test(passwordInput)
    const validNickname = regex.nickname.test(nicknameInput)



    
    if(!validEmail ||  ''){
      setInvalidEmail(true)
      

    }else {
      setInvalidEmail(false)
    }
    
    if(!validPassword || ''){
      setInvalidPassword(true)


    } else {
      setInvalidPassword(false)
    }
    
    if(!validNickname || ''){
      setInvalidNickname(true)

  }else{
    setInvalidNickname(false)
 
  }

  if(validEmail && validPassword && validNickname){
    setInvalidEmail(false)
    setInvalidPassword(false)
    setInvalidNickname(false)

    if(isLogin){
      signInWithEmailAndPassword(auth, emailInput, passwordInput)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;





    dispatch(login({token : user.accessToken}))


    navigate('/Account' , {replace: true})


  })
  .catch((error) => {
    const errorMessage = error.message;
    alert(errorMessage)
  });

    }else{
      createUserWithEmailAndPassword(auth, emailInput, passwordInput)
      .then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user;

         await updateProfile(auth.currentUser, { displayName: nicknameInput })
       
         dispatch(login({token : user.accessToken}))
         navigate('/welcome' , {replace: true})

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
      

      });
    }


    
    
    
   

  } 
  






}





  return (
  
      <form onSubmit={formSubmitHandler} className={classes["login-page"]} >

        {!isLogin? <div className={classes.input_form}>
          <label >Nickname</label>
          <input ref={nicknameRef}type="text"  />
        {!invalidNickname ? (
            ""
          ) : (
            <small >Enter a valid Nickname</small>
          )}
          </div> : ''}
        

        <div className={classes.input_form}>
          <label >Email</label>
          <input ref={emailRef} type="email"  />
        {!invalidEmail ? (
            ""
          ) : (
            <small>Enter a valid Email</small>
          )}
          </div>

        <div className={classes.input_form}>
          <label >Password</label>
          <input ref={passwordRef} type="password"/>
          {!isLogin?'' :  <div className={classes.checkbox_form}>
          <label>Remember Me</label>
          <input type="checkbox" />
        </div>}

         {!isLogin? '': <Link to='/signup'>Forgot Password</Link>}
        
          {!invalidPassword ? "" : <small class="">Enter a valid Password</small>}
        </div>
        
        {!isLogin? <div className={classes.submit}>
          <p>
            Already have an account? <span className={classes.button_link} onClick ={authModuleChanger}>Login</span>
          </p>
          <button type="submit" >
            Signup
          </button>
        </div> : <div className={classes.submit}>
          <p>
            Dont have an account? <span  className={classes.button_link}  onClick ={authModuleChanger}>Signup</span>
          </p>
          <button type="submit" >
            Login
          </button>
        </div>}
      </form>
  
  );
}

export default AuthForm;

import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/layout/Footer/Footer';
import { onAuthStateChanged } from "firebase/auth";
import Header from './components/layout/Header/Header';
import { auth} from './firebase';
import { useDispatch } from 'react-redux';
import Account from './pages/Account';
import CreateUser from './pages/CreateUser';
import Auth from './pages/Auth';
import Terms from './pages/Terms';
import {  setToken } from './features/authSlice';
import Loading from './components/ui/Loading';





function App(props) {
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(true)
  const [isLoggedIn,setIsLoggedIn] = useState(true)

 
     onAuthStateChanged(auth, (user) => {
      if (user) {    
     
        const uid = user.uid;
        dispatch(setToken({token : uid}))
        setIsLoggedIn(true)
        
        // ...
      } else {
        setIsLoggedIn(false)
       
      }
      setLoading(false)
    })
   

  
  


  return (
    
   <div className='app'>
      
      <header>
        

        {!isLoggedIn?'': <Header/>}
      </header>
      {loading? <Loading /> : 
      
      <main>
        <Routes>
          
          
          {!isLoggedIn && <Route path='/' element={<Auth/>}/>}
          {isLoggedIn && <Route path='/welcome' element={<CreateUser/>} />}

          {isLoggedIn && <Route path='/account' element={<Account/>}/>}
          {isLoggedIn && <Route path='*' element={<Account/>}/>}
          {!isLoggedIn &&  <Route path='*' element={<Auth/>}/>}
          <Route path='/terms' element={<Terms/>}/>
         
      
         </Routes>
      </main>
      }

      <footer>
        <Footer/>
      </footer>
     
      
      </div>
  
    
  );
}

export default App;

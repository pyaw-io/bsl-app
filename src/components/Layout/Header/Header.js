import React from 'react'
import classes from './Header.module.css'
import {logout} from '../../../features/authSlice'
import { useDispatch } from 'react-redux'
import Button from '../../ui/Button'
import { auth } from '../../../firebase'

const Header = ({isLoggedIn}) => {
    const dispatch =  useDispatch()

        const logoutHandler = () => {
            auth.signOut().then(
               dispatch(logout()) 
            )
            
                }

    return (


        <div className={classes.header}>
            <h1>BSL</h1>
            <div className={classes.header_menu}>
                {isLoggedIn && 
            
                <Button onClick={logoutHandler}>Logout</Button>}
            </div>
        </div>


    )
}

export default Header
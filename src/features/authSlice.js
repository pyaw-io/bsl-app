import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        token: null,
    },


};

export const authSlice = createSlice({
    name: "authUser",
    initialState,
    reducers: {
        setToken: (state,{payload}) =>{
            state.user = {
                token: payload.token,
            }

        },
        logout: (state,{payload}) => {
            state.user = {
              token: null,
          }
        },

           
         login: (state,{payload}) =>{
          state.user = {
              token: payload.token,
          }
      },
    



   

    }

})

export const {login,logout,setToken} = authSlice.actions
export const activeUser = (state) => state.authenticate.user;

export default authSlice.reducer
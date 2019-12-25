import axios  from "axios"
import {localhost} from "../GlobalVars"
// Build connection function between frontend and backend

// Register
export const register = (newuser)=>{
    console.log("inside funcAuth")
    
    return axios.post(`${localhost}/user/register` ,newuser )
}
// login 
export const login = (user)=>{
    return axios.post(`${localhost}/user/login` , user)
}
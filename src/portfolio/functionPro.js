import axios  from "axios"
import {localhost} from "../GlobalVars"
// Build connection function between frontend and backend

// Register
export const addpro = (newuser)=>{
    console.log("inside addpro")
    
    return axios.post(`${localhost}/UserInfoRoutes/create` ,newuser )
}
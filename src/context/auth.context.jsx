
import React, { useState, useEffect,createContext } from "react";
import axios from "axios";
const API_URL = "http://localhost:5005";
 
const AuthContext = createContext();
 
function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  const authenticateUser = () => {           //  <==  ADD  
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem('authToken');
    
    // If the token exists in the localStorage
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
        axios.get(`${import.meta.env.VITE_API_URL}/auth/verify`,{headers:{Authorization:`Bearer ${storedToken}`}})
      .then((response) => {
        // If the server verifies that the JWT token is valid  
        const user = response.data;
        console.log(response.data)
       // Update state variables        
        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(user);        
      })
      .catch((error) => {
        // If the server sends an error response (invalid token) 
        // Update state variables         
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);        
      });      
    } else {
      // If the token is not available (or is removed)
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);      
    }   
  }

  function logOutUser(){

    localStorage.removeItem('authToken')

    authenticateUser()

  }
 
  useEffect(()=>{
    console.log("Verifies the token initially")
    authenticateUser()
  },[])
  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user, authenticateUser, logOutUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}
 
export { AuthProviderWrapper, AuthContext };
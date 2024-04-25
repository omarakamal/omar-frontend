// src/pages/LoginPage.jsx
 
import { useState ,useContext} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth.context";
 
const API_URL = "http://localhost:5005";

/* 
localStorage:

1. localStorage.setItem('myStudent','Juan')

2. localStorage.getItem('myStudent')
*/
 
 
function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const {authenticateUser} = useContext(AuthContext)
  
  const navigate = useNavigate();
 
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
 
  /* 
    this function does the following:

    1. posts the user information to the /login route
       and recieves the token as a response

    2. Saves the token in the localStorage


    3. gets the token from localStorage and send a request to the /verify route with the token


    4. /verify route returns the payload as a response and we setUser to the response.data
  
  */
  const handleLoginSubmit = (e) => {
    e.preventDefault()

    let body = {email,password}
    axios.post(`${import.meta.env.VITE_API_URL}/auth/login`,body)
    .then((response)=>{
        localStorage.setItem('authToken',response.data.authToken)

        authenticateUser()

        navigate('/projects')
    })
    .catch(err=>{
        console.log(err)
        setErrorMessage(err.response.data.message)
    })

  };
  
  return (
    <div className="LoginPage">
      <h1>Login</h1>
 
      <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input 
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
        />
 
        <label>Password:</label>
        <input
          required
          minLength={6}
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
 
        <button type="submit">Login</button>
      </form>
      { errorMessage && <p className="error-message">{errorMessage}</p> }
 
      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>
    </div>
  )
}
 
export default LoginPage;
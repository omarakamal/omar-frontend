import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
 
const API_URL = "http://localhost:5005";
 
 
function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
 
  const navigate = useNavigate();

  
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
 
  
  const handleSignupSubmit = (e) => {
    e.preventDefault()

    let newUser = {
        email:email,
        password:password,
        name:name
    }

    axios.post('http://localhost:5005/auth/signup',newUser)
    .then((createdUser)=>{
        navigate('/login')
        console.log(createdUser)
    })
    .catch(err=>{
        console.log(err.response.data.message)
        setErrorMessage(err.response.data.message)
    })
  };
 
  
  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>
 
      <form onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input 
          required
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
        />
 
        <label>Password:</label>
        <input 
          required
          minLength={6}
          type="text"
          name="password"
          value={password}
          onChange={handlePassword}
        />
 
       
        <label>Name:</label>
        <input 
          required
          type="text"
          name="name"
          value={name}
          onChange={handleName}
        />
 
        <button type="submit">Sign Up</button>
      </form>
 
 
      {errorMessage && <p className="error-message">ERROR: {errorMessage}</p>}
      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  )
}
 
export default SignupPage;
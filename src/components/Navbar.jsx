import { Link } from "react-router-dom";

import { useContext } from "react";

import { AuthContext } from "../context/auth.context";

function Navbar() {

  const {user, isLoggedIn, logOutUser} = useContext(AuthContext)
  return (
    <nav>
     
     
      {isLoggedIn && (
        <>
        
          {user.name}
          <Link to="/">
        <button>Home</button>
      </Link>
          <Link to="/projects">
        <button>Projects</button>
      </Link>

      <button onClick={logOutUser}>Logout</button>
        </>
      )}
    
      {!isLoggedIn && (
        <>
          <Link to="/signup">
          <button>Signup</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
        </>
      )}
   
    </nav>
  );
}

export default Navbar;

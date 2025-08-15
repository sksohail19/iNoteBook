import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        name: username,
        email,
        password
      });

      if (res.data.authToken) {
        localStorage.setItem("authToken", res.data.authToken);
        alert("Signup successful!");
        window.location.href = "/";
      } else {
        console.log("Signup failed:", res.data.message);
        alert("Signup failed: " + res.data.message);
      }
    }
    catch (error) {
      if (error.response) {
        alert(`Signup failed: ${error.response.data.message}`);
      } else {
        alert("Network error. Please try again.");
      }
      console.error("Error during signup:", error);
    }
  }
  const handleReset = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="container my-3 w-75">
        <h1 className="container my-3 text-center">Sign Up</h1>
          <form onSubmit={handleSubmit} onReset={handleReset}>
            <div className="mb-3">
              <label htmlFor="exampleInputUserName" className="form-label">Username</label>
              <input type="text" className="form-control" id="exampleInputUserName" value={username} onChange={(e) => { setUsername(e.target.value) }} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => { setPassword(e.target.value) }} />
            </div>
            
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="reset" className="btn btn-secondary mx-2">Reset</button>
            <p className="mt-3">Already have an account? <Link to="/login">Login</Link></p>
          </form>
      </div>
    </>
  )
}

export default Signup

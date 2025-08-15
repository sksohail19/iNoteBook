import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [rememberMe, setRememberMe] = React.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle login logic here
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password
            });

            if (response.data.authToken) {
                localStorage.setItem("authToken", response.data.authToken);
                alert("Login successful!");
                window.location.href = "/";
            } else {
                console.log("Login failed:", response.data.message);
                alert("Login failed: " + response.data.message);
            }

        }

        catch (error) {
            if (error.response) {
                alert(`Login failed: ${error.response.data.message}`);
            } else {
                alert("Network error. Please try again.");
            }
            console.error("Error during login:", error);
        }

    };
    const handleReset = () => {
        setEmail("");
        setPassword("");
        setRememberMe(false);
    };

    return (
        <>
            <form  className="container my-3" onSubmit={handleSubmit} onReset={handleReset}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" checked={rememberMe} onChange={(e) => { setRememberMe(e.target.checked) }} />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
                <button type="reset" className="btn btn-secondary mx-2">Reset</button>
                <p className="mt-3">Don't have an account? <Link to="/api/auth/signup">Sign Up</Link></p>
                <p className="mt-1">Forgot your password? <Link to="/reset-password">Reset Password</Link></p>
            </form>
        </>
    )
}

export default Login

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const SignUp = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/login')
        }
    }, [navigate]);
    const collectData = async () => {
        if (!name || !email || !password) {
            alert("Please enter all details.");
            return;
        }
        const emailRegex = /[a-zA-Z]/; // contains letters
        const numberRegex = /[0-9]/; // contains numbers
        if (!emailRegex.test(email) || !numberRegex.test(email)) {
            alert("Email must contain both letters and numbers.");
            return;
        }

        if (password === name) {
            alert("Password cannot be the same as username.");
            return;
        }
        if (password.length <= 5) {
            alert("Password must be at least 5 characters long");
            return;
        }
        if (!email.endsWith("@gmail.com")) {
            setError("Please use a Gmail address.");
            return;
        }
        setError("");
        try {
            console.log("Sending data:", { name, email, password });
            let result = await fetch('http://localhost:5000/register', {
                method: 'post',
                body: JSON.stringify({ name, email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }

            });
            result = await result.json();
            if (result.error) {
                setError(result.error);
                console.log("Server error:", result.error);
                return;
            }
            console.log("Account created successfully:", result);
            localStorage.getItem("user", JSON.stringify(result.result));
            localStorage.getItem("token", JSON.stringify(result.auth));
            navigate('/login');
        } catch (error) {
            console.error("Error creating account:", error);
            setError("Something went wrong. Please try again.");
        }
    };
    return (
        <div className="register">
            <h1>Create Account</h1>
            <input className="inputBox" type="text"
                value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />

            <input className="inputBox" type="text"
                value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />

            <input type={showPassword ? "text" : "password"} className='inputBox' placeholder='Enter password'
                onChange={(e) => setPassword(e.target.value)} value={password} />
            <div className="checkBox">
                <input type="checkbox" checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)} />
                <label>Show Password</label>
            </div>
            {error && <div className="error">{error}</div>}
            <button onClick={collectData} className="appButton" type="button">Sign Up</button>
        </div>
    )
}
export default SignUp;
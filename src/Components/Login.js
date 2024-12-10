import React, {useEffect} from "react";
import {useNavigate,Link} from 'react-router-dom'
const Login =()=>{
    const [email,setEmail]=React.useState("");
    const [password,setPassword]=React.useState("");
    const [showPassword,setShowPassword] = React.useState(false);
    const navigate=useNavigate();
    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
            navigate("/")
        }
    })
    const handleLogin= async()=>{
        console.warn(email,password)
        let result=await fetch('http://localhost:5000/login',{
         method: 'post',
         body:JSON.stringify({email,password}),
         headers:{
            'Content-Type':'application/json'
        }
    });
    result =await result.json();
    console.warn(result)
    if(result.auth) {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", JSON.stringify(result.auth));
        navigate("/");
    }else{ 
         if(result.message === "User not found"){
            alert("User not found");
        }else if (result.message === "Incorrect password") {
            alert("Please enter correct details");
        } else {
            alert("An unexpected error occurred. Please try again.");
            }
    }
};

    return(
    <div className='login'>
    <h1>Enter Details</h1>
       <input type="text" className='inputBox' placeholder='Enter email' 
       onChange={(e)=>setEmail(e.target.value)} value={email}/>
       <input type={showPassword ? "text" : "password"} className='inputBox' placeholder='Enter password' 
       onChange={(e)=>setPassword(e.target.value)} value={password} />
       <div className="checkBox">
       <input type="checkbox" checked={showPassword}
       onChange={() => setShowPassword(!showPassword)}/>
       <label>Show Password</label>
       </div> 
       <div className="applink">
       <Link to="/signup">Create New Account</Link>
       </div>
       <div className="applink">
       <Link to="/forgot-password">Forgot Password?</Link>
     </div>
       <button onClick={handleLogin} className="appButton" type="button">Login</button>
    </div>
    )
}
export default Login
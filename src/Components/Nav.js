import React, { useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import SignUp from './SignUp';
const Nav =() => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout =async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;
        try {
            // Delete user account from MongoDB
            const response = await fetch(`http://localhost:5000/delete/${user._id}`, {
              method: "DELETE",
            });
            if (response.ok){
        localStorage.removeItem("user");
        navigate('/login')
    }else{
        console.error("Failed to delete user");
    }
}catch (error){
            console.error("Error during logout:", error);
          }
      };
    return (
        <div>
        <img 
        alt="logo" className='logo'
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIcTa7JnwY25hw1FXUF8-Zgh9N1JWnwPfBaA&s'/>
            {auth ? <ul className="nav-ul">
                <li><Link to="/">Product</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/update">Update Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link onClick={logout} to="/signup">Logout({JSON.parse(auth).name})</Link></li>
                
            </ul>
                :
                <ul className="nav-ul nav-right">
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
                
            }
        </div>
    )
};

export default Nav
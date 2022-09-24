import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../../styles/form.css';
import Axios from 'axios';

const Register = () => {

    const navigate =useNavigate();
    const initialState = {
        name: "",
        email: "",
        password: ""
      };

     const [userData, setuserData] = useState(initialState);
     
  // handle Change in input
  const handleChange = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };

    const handlesubmit=async(e)=>{
     e.preventDefault();
     console.log(userData);
     const res= await Axios.post(`http://localhost:5000/api/v1/admin/auth/register`,{userData});
     console.log(res);
     alert("Registered Successfully..!");
     navigate('/auth/admin/login');
    }
    const changeform=()=>{
        navigate('/auth/admin/login');
    }

    return (
        <div  className='form'>
            <form onSubmit={handlesubmit}>
                <h2>Sign Up</h2>
                <input type="text" placeholder="Full Name" name='name' value={userData.name}  onChange={handleChange} />
                <input type="email" placeholder="Email" name='email' value={userData.email}  onChange={handleChange} />
                <input type="password" placeholder="Password" name='password'  value={userData.password}  onChange={handleChange} />
                <button type="submit">Register</button>
                <p>Already have an account? <b onClick={changeform} >Login</b> </p>
            </form>
        </div>
    )
}

export default Register
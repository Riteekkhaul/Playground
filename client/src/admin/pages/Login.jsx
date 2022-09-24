import React,{useState} from 'react';
import '../../styles/form.css';
import {useNavigate} from 'react-router-dom';
import Axios from 'axios';

const Login = () => {

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
     const res= await Axios.post(`http://localhost:5000/api/v1/admin/auth/login`,{userData});
     //console.log(res);
     window.localStorage.setItem('user',JSON.stringify(res.data.token));
     window.localStorage.setItem('username',res.data.user.name);
     navigate('/dashboard');
    }

    return (
        <div className='form'>
            <form onSubmit={handlesubmit}>
            <h2>Sign In</h2>
                <input type="email" placeholder="Email" name='email' value={userData.email}  onChange={handleChange} />
                <input type="password" placeholder="Password"  name='password'  value={userData.password}  onChange={handleChange}  />
                <button type="submit">Login</button>
                <p>Don't have an account? <br/><br/>Please ask the Authorities to Register yourself! </p>
            </form>
        </div>
    )
}

export default Login
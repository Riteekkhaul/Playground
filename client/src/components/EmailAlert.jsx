import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Popup from 'reactjs-popup';
import '../styles/navbar.css';
import Axios from 'axios';

const EmailAlert = () => {
  const [email, setemail] = useState("");
  const navigate =useNavigate();
 const handleSubmit=async(e)=>{
  e.preventDefault();
  const res= await Axios.post(`http://localhost:5000/api/v1/user/subscribe`,{email});
  alert("Subscribed Successfully..👍");
 }
 const BackToHome=()=>{
  navigate('/');
 }

  return (
    <div  className='emailalert'>
        <h3>Turn On Notification Alert 🔔</h3>
        <form id='alert-con'>
            <input type="email" placeholder="Enter your Email" onChange={(e)=>setemail(e.target.value)} />
            <button onClick={handleSubmit}>Subscribe</button>
        </form>
        <button id='back-to-home-btn' onClick={BackToHome}>Back To Homepage</button>
    </div>
  )
}

export default EmailAlert;
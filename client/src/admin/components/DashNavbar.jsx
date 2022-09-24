import React from 'react';
import '../../styles/DashNav.css';
import {useNavigate} from 'react-router-dom';

const DashNavbar = () => {


  const navigate =useNavigate();

   const LogoutUser=()=>{
       window.localStorage.removeItem('user');
       window.localStorage.removeItem('sportType');
       navigate('/auth/admin/login');
   }

  const SendRemainder=()=>{
    navigate('/admin/remainder');
  }

  return (
    <div className='dashnav'>
        <div className='dash-nav-left' >
           <img src='/logo.png' alt='logo'  />
           <h3> GCOEA...PlayGround </h3> 
           <img src='/icon.jpg' alt='icon' />
        </div>
        <div className='dash-nav-right' >
            <button onClick={SendRemainder}>Send Remainder 🔔 </button>
            <span onClick={LogoutUser}>Logout </span>
        </div>
    </div>
  )
}

export default DashNavbar
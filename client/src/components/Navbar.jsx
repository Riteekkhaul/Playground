import React from 'react';
import {useNavigate} from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {

  const navigate =useNavigate();
 const CallAlert=()=>{
  //console.log("caled");
  navigate('/subscribe');
 }
 const handlleHome=()=>{
  navigate('/');
 }

 const HandleHelp=()=>{
  navigate('/help');
 }

  return (
    <div className='dashnav'>
        <div className='dash-nav-left' >
           <img src='/logo.png' alt='logo'  />
           <h3> GCOEA...PlayGround </h3> 
           <img src='/icon.jpg' alt='icon' />
        </div>
        <div className='dash-nav-right' >
          <p id='homebtn' onClick={handlleHome} >Home</p>
          <p id='aboutbtn'>About</p>
          <p id='helpbtn' onClick={HandleHelp}>Help</p>
          <p onClick={CallAlert} ><img src='/notify.png' alt='notify' id='bell' /><br/> Alert </p>
        </div>
    </div>
  )
}

export default Navbar
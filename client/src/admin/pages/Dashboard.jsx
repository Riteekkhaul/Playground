import React,{useEffect} from 'react';
import '../../styles/Dashboard.css';
import DashNavbar from '../components/DashNavbar';
import Main from '../components/Main';
import {useNavigate} from 'react-router-dom';


const Dashboard = () => {

  const navigate =useNavigate();

useEffect(() => {
  const user = window.localStorage.getItem('user');
  console.log(user);
  CheckAuth(user);
}, []);


const CheckAuth=(user)=>{
  if(!user){
    navigate('/auth/admin/login');
  }
  else{
    console.log("Auth Checked");
  }
}

  return (
    <div className='dashboard'>
       <div>
         <DashNavbar /> 
       </div>      
       <div className='warning'>
        <marquee>🛑 Kindly Please Remember that you are allowed to Manage only those sports details for which you are appointed...if any kind of violation occurs strict action will be taken as It is used by many college students and faculty members to moniter the college sports activities.!!! 🛑  For any query contact us on : <b>gcoeaplaground22@gmail.com</b></marquee>
       </div>      
       <div className='dash-main'>
         <Main   />
       </div>      
       <div>
        
       </div>      
    </div>
  )
}

export default Dashboard
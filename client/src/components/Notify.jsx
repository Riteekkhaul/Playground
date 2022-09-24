import React,{useState,useEffect} from 'react';
import '../styles/Notify.css';


const Notify = () => {

  const [notification, setnotification] = useState("");

const getNotification=()=>{
  fetch('http://localhost:5000/api/v1/user/get-notification').then(data => { return data.json();    }).then(data => { 
      //console.log(data.result[0].notification);
     setnotification(data.result[0].notification);
 })
} 

useEffect(()=>{
  getNotification();
},[])

  return (
    <div className='notify-con'>
        <marquee behavior="" direction="">{notification}</marquee>
        <hr/>
    </div>
  )
}

export default Notify
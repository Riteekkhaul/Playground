import React,{useState , useEffect} from 'react';
import '../../styles/helppage.css';
import { useNavigate} from 'react-router-dom';
import Dashnavbar from '../components/DashNavbar';

import emailjs from '@emailjs/browser';

const Remainder = () => {

    const navigate =useNavigate();
    const initialState = { email:"",subject:"", message: "" };
    const [userData, setuserData] = useState(initialState);
    const [subscribersList, setsubscribersList] = useState([]);

  useEffect(()=>{
 fetchSubscribers();
  },[]);

    const fetchSubscribers=()=>{
        fetch('http://localhost:5000/api/v1/admin/getsubscribers').then(data => 
        { return data.json(); }).then(data => { 
            // console.log(data.result[1].email);
             setsubscribersList(data.result); 
          }) ;
        }    

  const handleChange = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };

  const SendEmail=(e)=>{
    e.preventDefault();
    
    // var templateParams = {
    //     subject:userData.subject,
    //     email: subscribersList,
    //     message: userData.message
    // };

    emailjs.sendForm('service_4zytp29', 'template_58l10ty', e.target , '00JPgKkpAawmAdMFZ')
      .then((result) => {
          alert("Email sent successfully ✔");
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset();
  }

  return (
    <>
    <Dashnavbar  />
    <div id='help-page'>
        <div className='help-page-box'>
            <h2>Send a Remainder to Subsribers..!</h2>
            <form id='help-page-form' onSubmit={SendEmail} >
                <input type="email" name='email' placeholder="To_email" onChange={handleChange} />
                <input type="text" name='subject' placeholder="Subject" onChange={handleChange} />
                <textarea type="text" name='message' placeholder="Your message..." onChange={handleChange} /> 
                <button type='submit' >Send</button>
            </form>
        </div>
        <div className='help-page-box'>
            <h2>All Subsribers </h2>
            <div id='emaillist-p'>
                {
                   subscribersList.map((ele,i)=>{
                    return(
                        <p key={i}> {ele.email} </p>
                    )
                   }) 
                }
            </div>
        </div>
    </div>
    </>
  )
}

export default Remainder;
import React,{useState} from 'react';
import '../styles/helppage.css';
import { useNavigate} from 'react-router-dom';
import Navbar from '../components/Navbar';

import emailjs from '@emailjs/browser';

const Help = () => {

    const navigate =useNavigate();
    const initialState = {  name: "", email: "", subject:"", message: "" };
    const [userData, setuserData] = useState(initialState);
     

  const handleChange = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };

  const SendEmail=(e)=>{
    e.preventDefault();

    emailjs.sendForm('service_4zytp29', 'template_ctbp1ly', e.target , '00JPgKkpAawmAdMFZ')
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
     <Navbar />
    <div id='help-page'>
        <div className='help-page-box'>
            <h2>Need Some Help ?</h2>
            <form id='help-page-form' onSubmit={SendEmail} >
                <input type="text" name='name' placeholder="Your name"  onChange={handleChange} />
                <input type="email" name='email' placeholder="Your email" onChange={handleChange} />
                <input type="text" name='subject' placeholder="Subject" onChange={handleChange} />
                <textarea type="text" name='message' placeholder="Your message..." onChange={handleChange} />
                <button type='submit' >Send</button>
            </form>
        </div>
    </div>
    </>
  )
}

export default Help
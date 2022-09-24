import React from 'react';
import '../styles/sport-section.css';
import {useNavigate} from 'react-router-dom';

const SportsSection = () => {

  const navigate =useNavigate();


  const Cricketpage=()=>{
    navigate('/cricket');
  }

 const Football=()=>{
   navigate('/football');
 }
 
 const Tennis=()=>{
  navigate('/tennis');
}

const Vollyball=()=>{
  navigate('/vollyball');
}

const Badminton=()=>{
  navigate('/badminton');
}

const Chess=()=>{
  navigate('/chess');
}



  return (
    <div className='sport-section'>
       <div className='right'>
         <div className='cricket box'><img src='/cricket.jpg' onClick={Cricketpage} className='banner-con' /></div>
         <div className='Football box'><img src='/football.jpg' onClick={Football} className='banner-con' /></div>
         <div className='Badminton box'><img src='/badminton.jpg' onClick={Badminton} className='banner-con' /> </div>
         <div className='Wollyball box'> <img src='/wollyboll.jpg' onClick={Vollyball} className='banner-con' /> </div>
         <div className='Chess box'><img src='/chess.jpg' className='banner-con' onClick={Chess} /> </div>
         <div className='Table-Tenis box'><img src='/teniss.jpg' className='banner-con' onClick={Tennis} /> </div>
       </div>
    </div>
  )
}

export default SportsSection;
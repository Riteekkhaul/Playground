import React from 'react';
import '../../styles/main-right.css';

const MainRight = () => {

  const Cricket=()=>{
   window.localStorage.setItem('sportType',"cricket");
   window.location.reload();
  }
  
  const Football=()=>{
    window.localStorage.setItem('sportType',"football");
    window.location.reload();
  }
  
  const Vollyball=()=>{
    window.localStorage.setItem('sportType',"vollyball");
    window.location.reload();
  }
  
  const Chess=()=>{
    window.localStorage.setItem('sportType',"chess");
    window.location.reload();
  }
  
  const Badminton=()=>{
    window.localStorage.setItem('sportType',"badminton");
    window.location.reload();
  }

  return (
    <div className='main-right'>
        <div className='main-right-box'>
            <button onClick={Cricket} >Cricket</button>
            <button onClick={Football}>Football</button>
            <button onClick={Chess}>Chess</button>
            <button onClick={Vollyball}>Vollyball</button>
            <button onClick={Badminton}>Badminton</button>
        </div>
    </div>
  )
}

export default MainRight
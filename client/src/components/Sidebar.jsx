import React from 'react';
import '../styles/sidebar.css';

const Sidebar = () => {
  return (
    <div>
      <div className='left-sidebar'> 
         <div className='event-tag'> <span>Events</span></div>
         <div className='poster1'>
          <img src='/event2.jpg' id='banner1' />
         </div>
         <div className='poster2'>
         <img src='/event1.jpg' id='banner2' />
         </div>
      </div>
    </div>
  )
}

export default Sidebar
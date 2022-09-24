import React from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar'
import Notify from '../components/Notify';
import Recent from '../components/Recent'
import Sidebar from '../components/Sidebar'
import SportsSection from '../components/SportsSection';
import '../styles/Homepage.css';

const Homepage = () => {
  return (
    <div className='homepage'>
      <div className='top-part'>
        <Navbar />
        <Notify />
      </div>
      <div className='mid-section'>
        <div className='mid-left'>
          <SportsSection />
          <Recent />
        </div>
        <div className='mid-right'>
          <Sidebar />
        </div>
      </div>  
      <div className='footer'>
        <Footer />
      </div>
    </div>
  )
}

export default Homepage
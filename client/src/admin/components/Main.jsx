import React from 'react';
import '../../styles/Dashboard.css';
import MainLeft from './MainLeft';
import MainRight from './MainRight';

const Main = ({username}) => {
  return (
    <div className='dash-main' >
        <MainLeft  />
        <MainRight />
    </div>
  )
}

export default Main
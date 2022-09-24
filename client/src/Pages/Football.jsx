import React,{useState,useEffect} from 'react';
import Navbar from '../components/Navbar';
import '../styles/football.css';

const Football = () => {

  const [allMatches, setallMatches] = useState([1,2,3,4,5]);

  return (
    <div>
      <Navbar />
      <div className='football-main-con'>
        <div className='football-left'>
          <div id='football-box'>
             <div id='innerbox-1'>
              <h2>IT</h2>
              <img src='/it.jpg' alt='team1' />
             </div>
             <div id='innerbox-2'>
              <br/><br/>
               <h3>05 - 07</h3>
               <h3> 20'</h3>
               <h5>10th August 2022 11:45 </h5>
               <p id='live-status'>Live</p>
               <p>Gcoea Football Trophy</p>
             </div>
             <div id='innerbox-3'>
             <h2>CS</h2>
              <img src='/cs.png' alt='team1' />
             </div>
          </div>
        </div>
        <div id='football-right'>
        <div id='football-upcoming' >
             <h3>Upcoming Matches</h3>
             <table className='table-con'>
                    <thead> 
                    <tr>
                        <th>Teams </th>
                        <th>Dates </th>
                        <th>Timing</th>
                        </tr>
                    </thead>
                    <tbody>
                      {
                        allMatches.map((data,i)=>{
                          return(
                            <tr  key={i}>
                            <td>Team1 vs team2</td>
                            <td>date</td>
                            <td>time</td>
                            </tr>
                          );
                        })
                      }
                    </tbody>
             </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Football
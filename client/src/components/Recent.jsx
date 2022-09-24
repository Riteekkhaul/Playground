import { useState, useEffect } from 'react';
import '../styles/recent.css';

const Recent = () => {

  const [recentMatches, setrecentMatches] = useState([]);

  
const getRecentMatches=()=>{
  fetch('http://localhost:5000/api/v1/user/getrecentmatches').then(data => { return data.json();    }).then(data => { 
     //console.log(data.result);
     setrecentMatches(data.result);
    // console.log("1st object is", recentMatches[0].gender);
 })
}     

useEffect(()=>{
  getRecentMatches();
},[])

  return (
    <div className='recent'>
      <div id="wrapper">
        <h1>Recent Matches</h1>
        <table id="keywords" cellspacing="0" cellpadding="0">
          <thead>
            <tr>
              <th><span>Sports</span></th>
              <th><span>Teams</span></th>
              <th><span>Dates</span></th>
              <th><span>Winners</span></th>
              <th><span>Girls/Boys</span></th>
            </tr>
          </thead>
          <tbody>
         {
          recentMatches.map((data,i)=>{
            return(
            <tr key={i}>
              <td class="lalign">{recentMatches[i].sportType}</td>
              <td>{recentMatches[i].team1} vs {recentMatches[i].team2}</td>
              <td>{recentMatches[i].date}</td>
              <td>{recentMatches[i].winner}</td>
              <td>{recentMatches[i].gender}</td>
            </tr>
            )
          })
         }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Recent
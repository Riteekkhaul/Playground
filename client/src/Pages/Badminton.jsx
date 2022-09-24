import React,{useEffect , useState}  from 'react';
import Navbar from '../components/Navbar';
import '../styles/Badmintob.css';

const Badminton = () => {



  const [allMatches , setallMatches] = useState([]);  


  const getAllUpcomingMatches=()=>{
    fetch('http://localhost:5000/api/v1/user/getallmatches').then(data => { return data.json();    }).then(data => { 
      // console.log(data.result);
       setallMatches(data.result);
       //console.log("1st object is", allMatches[0].serialNo);
   })
  }     
useEffect(()=>{
  getAllUpcomingMatches();
},[])
  
  return (
    <div className='badminton-page'>
      <Navbar />
      <div className='badminton-con'>
      <div id='badminton-score-con'>
          <div id='badminton-score' >
          <h2 id='h2-head'>Live Score</h2>
            <div id='badminton-score-box'>
              <p>Mayank B. ( IT ) : <span>21  |  16  |  13</span></p>
              <p>Anurag K.  ( IT ) : <span>15  |  21  |  21</span></p>
            </div>
          </div>
      </div>
      <div id='upcoming' className='badminton-upcoming' >
             <h3>Upcoming Matches</h3>
             <table className='table-con'>
                    <thead> 
                    <tr>
                        <th>Teams </th>
                        <th>Dates </th>
                        <th>Timing</th>
                        <th>Singles / Doubles</th>
                        </tr>
                    </thead>
                    <tbody>
                      {
                        allMatches.map((data,i)=>{
                          return(
                            <tr  key={i}>
                            <td>{allMatches[i].team1} vs {allMatches[i].team2}</td>
                            <td>{allMatches[i].date}</td>
                            <td>{allMatches[i].time}</td>
                            <td>Singles</td>
                            </tr>
                          );
                        })
                      }
                    </tbody>
             </table>
          </div>
        </div>
      </div>
  )
}

export default Badminton;
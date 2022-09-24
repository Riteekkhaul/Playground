import React,{useEffect , useState} from 'react';
import '../styles/Cricketpage.css';
import Navbar from '../components/Navbar';

const CricketPage = () => {

const [allMatches , setallMatches] = useState([]);  
const [score, setscore] = useState({
      "_id": "",
      "run": 0,
      "vicket": 0,
      "overs": 0.0,
      "crr": 0.0,
      "isLive": false,
      "player1":"",
      "player2":"",
      "bowler":"",
      "serialNo":1
});

const getAllUpcomingMatches=()=>{
  fetch('http://localhost:5000/api/v1/user/getallmatches').then(data => { return data.json();    }).then(data => { 
    // console.log(data.result);
     setallMatches(data.result);
     //console.log("1st object is", allMatches[0].serialNo);
 })
}     

useEffect(()=>{
    
  const fetchData=()=>{
    fetch('http://localhost:5000/api/v1/user/score').then(data => { return data.json();    }).then(data => { 
             // console.log(data.result[0].isLive)

              const { _id, run , vicket , overs , crr , isLive ,player1,player2,bowler,serialNo ,team1,team2} = data.result[0];
              setscore({
                _id,
                run,
                vicket,
                overs,
                crr,
                isLive,
                player1,
                player2,
                bowler,
                serialNo,
                team1,
                team2
              }); 
              console.log(score.isLive);
               }) ;
              }     
         
              getAllUpcomingMatches();
              fetchData();

         var repeat = setInterval(()=>{
                if(!score.isLive){
                    clearInterval(repeat);
                }
                fetchData();
                console.log("called after 1min");
              },30000);
            
},[]);

  return (
    <div className='cricketpage'>
      <Navbar />
      <div className='cricket-con'>
        <div className='cricket-left'>
           <div id='score-box'>
               <h3>Live Score</h3>
               <div className='compete'>
                  <div className='team1'>
                    <img src='/cs.png' alt='cs'  />
                  </div>
                  <div className='vs'>V/S</div>
                  <div className='team2'>
                  <img src='/it.jpg' alt='it'  />
                  </div>
               </div>
               <div className='score'>
                  <div className='score-left'>
                    <p><b>Runs: {score.run} / {score.vicket}  </b> </p>
                    <p> CRR : {score.crr} </p>
                    <p> Player 1 : {score.player1}</p>
                    <p> Player 2 : {score.player2}</p>
                 </div>
                  <div className='score-right'> 
                    <p><b>Overs : {score.overs.toFixed(1)}</b> </p> 
                    <p>Bowler : {score.bowler}</p>  
                  </div>
               </div>
           </div>
        </div>
        <div className='cricket-left'>
          <div id='upcoming' >
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
                            <td>{allMatches[i].team1} vs {allMatches[i].team2}</td>
                            <td>{allMatches[i].date}</td>
                            <td>{allMatches[i].time}</td>
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

export default CricketPage
import React,{useState,useEffect} from 'react';
import '../../styles/LiveCricket.css';
import  Axios  from 'axios';

const LiveFootball = ()=>{

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

  const [buttonStatus, setbuttonStatus] = useState({ score:false,player:false,Overs:false});
  const [updatePlayer, setupdatePlayer] = useState({player1:"",player2:"",bowler:""});
  const [updateOvers, setupdateOvers] = useState({Overs:0,CRR:0,wicket:0});
  const [updateScore, setupdateScore] = useState({Runs:0,bolls:0});
  const id=99;

  const fetchData=()=>{
    fetch('http://localhost:5000/api/v1/user/score').then(data => { return data.json();    }).then(data => { 
             // console.log(data.result[0].isLive)
              const { _id, run , vicket , overs , crr , isLive ,player1,player2,bowler,serialNo ,team1,team2} = data.result[0];
              setscore({ _id,run, vicket, overs, crr, isLive, player1, player2, bowler, serialNo, team1, team2 }); 
              console.log(score);
               }) ;
          }     
     
   const updateRunsfunc=async()=>{
    console.log("called-update-runs");
     const res= await Axios.put(`http://localhost:5000/api/v1/admin/score-live-runs/${id}`,{updateScore});
     console.log(res);
     document.location.reload();
   }

   const updatePlayersfunc=async()=>{
    console.log("called-update-players");
    const res= await Axios.put(`http://localhost:5000/api/v1/admin/score-live-players/${id}`,{updatePlayer});
    console.log(res);
    document.location.reload();
   }

   const updateBowlerfunc=async()=>{
    console.log("called-update-overs");
    const res= await Axios.put(`http://localhost:5000/api/v1/admin/score-live-overs/${id}`,{updateOvers});
    console.log(res);
    document.location.reload();
   }

useEffect(()=>{
   fetchData();
},[])
            
    return(
      <>
        <div className="liveCricket-con">
                <div id='teams-con'>
                  <div className='team1-ckt'><img src='/cs.png' alt='cs'  /></div>
                  <div className='vs'>V/S</div>
                  <div className='team2-ckt'><img src='/it.jpg' alt='it'  /></div>
                </div>
               <div className='score-ckt'>
                  <div className='score-left-ckt'>
                    Team1 Score :  15
                  </div>
                  <div className='score-right-ckt'> 
                  Team2 Score :  15
                  </div>
               </div>
        </div>
        <div className='edit-btn'>
                    <button className='edit-btn-1' onClick={()=>{}} >Go Live 💥</button>
                    <button className='edit-btn-4' onClick={()=>{setbuttonStatus({score:true,Overs:false,player:false})}} >Update Score</button>
                    <button className='edit-btn-2' onClick={()=>{setbuttonStatus({score:false,Overs:false,player:true})}} >Update Player</button>
                    <button className='edit-btn-3' onClick={()=>{setbuttonStatus({score:false,Overs:true,player:false})}} >Wicket ,Over & CRR</button>
                    <button className='edit-btn-1' onClick={()=>{}} >Finished 🏆</button>
        </div>
        {
          buttonStatus.score &&(
           <div className='edit-input-box'>
             <p className='runs'>Runs :</p>
             <span>
               <button className='increase-btn'  onClick={()=>{setupdateScore((member)=>({...member,Runs:1}))}} >+1</button>
               <button className='increase-btn'  onClick={()=>{setupdateScore((member)=>({...member,Runs:2}))}}>+2</button>
               <button className='increase-btn'  onClick={()=>{setupdateScore((member)=>({...member,Runs:3}))}}>+3</button>
               <button className='increase-btn'  onClick={()=>{setupdateScore((member)=>({...member,Runs:4}))}}>+4</button>
               <button className='increase-btn'  onClick={()=>{setupdateScore((member)=>({...member,Runs:6}))}}>+6</button>
             </span>
             <p  className='bolls'>Bolls :</p>
             <span>
             <button className='increase-btn'  onClick={()=>{setupdateScore((member)=>({...member,bolls:0.1}))}}>+1</button>
             </span>
             <button className='edit-input edit-submit' onClick={updateRunsfunc} >Update</button>
           </div>
          )
        }
        {
          buttonStatus.Overs &&(
           <div className='edit-input-box'>
           <input type="number" placeholder="Overs" className='edit-input'  name='team2' onChange={(e)=>{setupdateOvers((member)=>({...member,Overs:e.target.value}))}} />
           <input type="number" placeholder="CRR" className='edit-input'name='date' onChange={(e)=>{setupdateOvers((member)=>({...member,CRR:e.target.value}))}} />
           <input type="number" placeholder="Wicket" className='edit-input'name='date' onChange={(e)=>{setupdateOvers((member)=>({...member,wicket:e.target.value}))}} />
           <button className='edit-input edit-submit' onClick={updateBowlerfunc} >Update</button>
           </div>
          )
        }{
          buttonStatus.player &&(
           <div className='edit-input-box'>
           <input type="text" placeholder="Player-1" className='edit-input'  name='team2' onChange={(e)=>{setupdatePlayer((member)=>({...member,player1:e.target.value}))}} />
           <input type="text" placeholder="Player-2" className='edit-input'name='date' onChange={(e)=>{setupdatePlayer((member)=>({...member,player2:e.target.value}))}} />
           <input type="text" placeholder="Bowler" className='edit-input' name='timing' onChange={(e)=>{setupdatePlayer((member)=>({...member,bowler:e.target.value}))}}/>
           <button className='edit-input edit-submit' onClick={updatePlayersfunc} >Update</button>
           </div>
          )
        }
        </>
    )
}
export default LiveFootball;
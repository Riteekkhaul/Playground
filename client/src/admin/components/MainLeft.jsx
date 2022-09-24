import React, { useState, useEffect, useContext } from 'react';
import '../../styles/main-left.css';
import LiveCricket from '../components/LiveCricket';
import Axios from 'axios';
import LiveBadminton from './LiveBadminton';
import LiveChess from './LiveChess';
import LiveFootball from './LiveFootball';
import LiveVollyball from './LiveVollyball';

const MainLeft = () => {

  const [Screen, setScreen] = useState({liveScreen:true,upcomingScreen:false,recentScreen:false});
  const [sportType, setsportType] = useState(localStorage.getItem('sportType'));
  const [recentMatches, setrecentMatches] = useState([]);
  const [allMatches, setallMatches] = useState([]);
  const [editUpcoming, seteditUpcoming] = useState({add:false,update:false, delete:false  })
  const [username, setusername] = useState("Unknown");
  const [upcomingData, setupcomingData] = useState({   serialNo:0 , team1:"" , team2:"" , date:"" , timing:"" });
  const [recentData, setrecentData] = useState({ serialNo:0 ,sportType:"", team1:"" , team2:"" , date:"" , winner:"" , gender:""   });


// API Request for  upcoming matches
  
  const getAllUpcomingMatches = () => {
    fetch('http://localhost:5000/api/v1/user/getallmatches').then(data => { return data.json(); }).then(data => {
       console.log(data.result);
      setallMatches(data.result);
      //console.log("1st object is", allMatches[0].serialNo);
    })
  }
  
  const addUpcoming=async()=>{
    console.log("called-add");
    const res =await Axios.post('http://localhost:5000/api/v1/admin/addmatch',{upcomingData});
  //  console.log(res);
    document.location.reload();
  }

  const updateUpcoming=async()=>{
    console.log("called-update");
    const res= await Axios.put('http://localhost:5000/api/v1/admin/updatematch',{upcomingData});
  //  console.log(res);
    document.location.reload();
  }

  const deleteUpcoming=async()=>{
  //  console.log("called-delete");
    var sr =upcomingData.serialNo;
    console.log(sr);
    const res =await Axios.delete(`http://localhost:5000/api/v1/admin/removematch/${sr}`);
   // console.log(res);
    document.location.reload();
  }


// API FOR Recent Matches


const getRecentMatches = () => {
  fetch('http://localhost:5000/api/v1/user/getrecentmatches').then(data => { return data.json(); }).then(data => {
  //  console.log(data.result);
    setrecentMatches(data.result);
    //.log("1st object is", recentMatches[0].gender);
  })
}        
  
const addRecent=async()=>{
 // console.log("called-add");
  const res =await Axios.post('http://localhost:5000/api/v1/admin/addrecentmatch',{recentData});
 // console.log(res);
  document.location.reload();
}

const updateRecent=async()=>{
//  console.log("called-update");
  const res= await Axios.put('http://localhost:5000/api/v1/admin/updaterecentmatch',{recentData});
 // console.log(res);
  document.location.reload();
}

const deleteRecent=async()=>{
//  console.log("called-delete");
  var sr =recentData.serialNo;
  //  console.log(sr);
    const res =await Axios.delete(`http://localhost:5000/api/v1/admin/deleterecentmatch/${sr}`);
   // console.log(res);
    document.location.reload();
}

  useEffect(() => {
    getRecentMatches();
    getAllUpcomingMatches();
    const loggedInuser=window.localStorage.getItem('username');
    window.localStorage.setItem('sportType',"welcome");
    setusername(loggedInuser);
  }, []);


  // functions for dynamic sreen rendering    

  const LiveScore = () => {
    setScreen({liveScreen:true,recentScreen:false,upcomingScreen:false});
  }
  const Upcoming = () => {
    setScreen({liveScreen:false,recentScreen:false,upcomingScreen:true});
  }
  const Recent = () => {
    setScreen({liveScreen:false,recentScreen:true,upcomingScreen:false});
  }

  // function for dynamic form  rendering 

  const AddUpcomingMatch=()=>{
     seteditUpcoming({
      add:true,
      update:false,
      delete:false
     });
  }
  const UpdateUpcomingMatch=()=>{
    seteditUpcoming({
      add:false,
      update:true,
      delete:false
     });
  }
  const DeleteUpcomingMatch=()=>{
    seteditUpcoming({
      add:false,
      update:false,
      delete:true
     });
  }

  // form data handeling 

  const handleUpcoming = (event) => {
    event.preventDefault();
    setupcomingData({ ...upcomingData, [event.target.name]: event.target.value });
  };
  
  const handleRecent = (event) => {
    event.preventDefault();
    setrecentData({ ...recentData, [event.target.name]: event.target.value });
  };

  return (
    <div className='main-left'>
      <div className='admin-name'>
        <h4>Welcome Mr. {username} </h4>
      </div>
      {
        sportType =="welcome" && (
          <div className='welcome-con'>
            <h1>Welcome Back Sir...</h1>
          </div>
        )
      }
      {
        sportType!="welcome" && (
          <div className='work-con'>
            <div className='work-options'>
              <button id='btn-recent' onClick={Recent} > Recently Played  </button>
              <button id='btn-live' onClick={LiveScore} > Live Score </button>
              <button id='btn-upcoming' onClick={Upcoming}>Upcoming Matches  </button>
            </div>
            {
              Screen.liveScreen && (
                <div className='work-area-live'>
                  {
                    sportType=="cricket" &&( <LiveCricket /> )
                  }
                  {
                    sportType=="badminton" &&( <LiveBadminton /> )
                  }
                  {
                    sportType=="chess" &&( <LiveChess /> )
                  }
                  {
                    sportType=="football" &&( <LiveFootball /> )
                  }
                  {
                    sportType=="vollyball" &&( <LiveVollyball /> )
                  }
                </div>
              )
            }
            {
              Screen.upcomingScreen && (
                <div className='work-area-upcoming'>
                  <div id='upcoming' >
                    <h3>Upcoming Matches</h3>
                    <table className='table-con' id='upcoming-table'>
                      <thead>
                        <tr>
                          <th>Sr.No.</th>
                          <th>Teams </th>
                          <th>Dates </th>
                          <th>Timing</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          allMatches.map((data, i) => {
                            return (
                              <tr key={i}>
                                <td>{allMatches[i].serialNo}</td>
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
                  <div className='edit-section'>
                   <div className='edit-btn'>
                    <button className='edit-btn-1' onClick={AddUpcomingMatch} >Add  Match</button>
                    <button className='edit-btn-2' onClick={UpdateUpcomingMatch} >Update Match</button>
                    <button className='edit-btn-3' onClick={DeleteUpcomingMatch} >Delete Match</button>
                   </div>
                   {
                    editUpcoming.add &&(
                      <div className='edit-input-box'>
                      <input type="number" placeholder="Serial  No." className='edit-input'  name='serialNo' onChange={handleUpcoming} />
                      <input type="text" placeholder="Team1" className='edit-input'name='team1'  onChange={handleUpcoming}  />
                      <input type="text" placeholder="Team2" className='edit-input'  name='team2' onChange={handleUpcoming} />
                      <input type="text" placeholder="Date" className='edit-input'name='date' onChange={handleUpcoming} />
                      <input type="text" placeholder="Timing" className='edit-input' name='timing' onChange={handleUpcoming}/>
                      <button className='edit-input edit-submit' onClick={addUpcoming} >Add</button>
                      </div>
                    )
                   }
                   {
                    editUpcoming.update &&(
                      <div className='edit-input-box'>
                      <input type="number" placeholder="Serial  No." className='edit-input' name='serialNo' onChange={handleUpcoming} />
                      <input type="text" placeholder="Team1" className='edit-input' name='team1'  onChange={handleUpcoming} />
                      <input type="text" placeholder="Team2" className='edit-input' name='team2' onChange={handleUpcoming}  />
                      <input type="text" placeholder="Date" className='edit-input' name='date' onChange={handleUpcoming}  />
                      <input type="text" placeholder="Timing" className='edit-input' name='timing' onChange={handleUpcoming} />
                      <button className='edit-input edit-submit' onClick={updateUpcoming} >Update</button>
                      </div>
                    )
                   } 
                   {
                    editUpcoming.delete &&(
                      <div className='edit-input-box'>
                      <input type="number" placeholder="Serial  No." className='edit-input' name='serialNo' onChange={handleUpcoming} />
                      <button className='edit-input edit-submit' onClick={deleteUpcoming} >Delete</button>
                      </div>
                    )
                   }
                  </div>
                </div>
              )
            }
            {
              Screen.recentScreen && (
                <div className='work-area-recent'  >
                  <h1 className='setProp'>Recent Matches</h1>
                  <table id="keywords" cellSpacing="0" cellPadding="0">
                    <thead>
                      <tr>
                      <th><span>Serial No.</span></th>
                        <th><span>Sports</span></th>
                        <th><span>Teams</span></th>
                        <th><span>Dates</span></th>
                        <th><span>Winners</span></th>
                        <th><span>Girls/Boys</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {                        
                        recentMatches.map((data, i) => {
                          return (
                            <tr key={i}>
                              <td className="setprop imp">{recentMatches[i].serialNo}</td>
                              <td className="setprop imp" >{recentMatches[i].sportType}</td>
                              <td className='setProp' >{recentMatches[i].team1}  V/S  {recentMatches[i].team2}</td>
                              <td className='setProp'>{recentMatches[i].date}</td>
                              <td className='setProp'>{recentMatches[i].winner}</td>
                              <td className='setProp'>{recentMatches[i].gender}</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                  <div  className='edit-recent'>
                  <div className='edit-btn'>
                    <button className='edit-btn-1' onClick={AddUpcomingMatch} >Add  Match</button>
                    <button className='edit-btn-2' onClick={UpdateUpcomingMatch} >Update Match</button>
                    <button className='edit-btn-3' onClick={DeleteUpcomingMatch} >Delete Match</button>
                   </div>
                   {
                    editUpcoming.add &&(
                      <div className='edit-input-box'>
                      <input type="number" placeholder="Serial  No." className='edit-input'  name='serialNo' onChange={handleRecent} />
                      <input type="text" placeholder="Team1" className='edit-input' name='team1'  onChange={handleRecent} />
                      <input type="text" placeholder="Team2" className='edit-input'   name='team2' onChange={handleRecent}   />
                      <input type="text" placeholder="Date" className='edit-input'  name='date' onChange={handleRecent}  />
                      <input type="text" placeholder="SportType" className='edit-input'  name='sportType' onChange={handleRecent}  />
                      <input type="text" placeholder="Winner" className='edit-input'  name='winner' onChange={handleRecent}  />
                      <input type="text" placeholder="Girls/Boys" className='edit-input'  name='gender' onChange={handleRecent}   />
                      <button className='edit-input edit-submit' onClick={addRecent} >Add</button>
                      </div>
                    )
                   }
                   {
                    editUpcoming.update &&(
                      <div className='edit-input-box'>
                      <input type="number" placeholder="Serial  No." className='edit-input'   name='serialNo' onChange={handleRecent} />
                      <input type="text" placeholder="Team1" className='edit-input' name='team1'  onChange={handleRecent} />
                      <input type="text" placeholder="Team2" className='edit-input'  name='team2' onChange={handleRecent}   />
                      <input type="text" placeholder="Date" className='edit-input'  name='date' onChange={handleRecent} />
                      <input type="text" placeholder="SportType" className='edit-input'name='sportType' onChange={handleRecent} />
                      <input type="text" placeholder="Winner" className='edit-input'   name='winner' onChange={handleRecent}   />
                      <input type="text" placeholder="Girls/Boys" className='edit-input' name='gender' onChange={handleRecent}   />
                      <button className='edit-input edit-submit' onClick={updateRecent} >Update</button>
                      </div>
                    )
                   }
                   {
                    editUpcoming.delete &&(
                      <div className='edit-input-box'>
                      <input type="number" placeholder="Serial  No." className='edit-input' name='serialNo' onChange={handleRecent}  />
                      <button className='edit-input edit-submit' onClick={deleteRecent} >Delete</button>
                      </div>
                    )
                   }
                  </div>
                </div>
              )
            }
          </div>
        )
      }
    </div>
  )
}

export default MainLeft;
import {FaUserFriends} from 'react-icons/fa'
import {GiCloudyFork} from 'react-icons/gi'
import {RiAddLine} from 'react-icons/ri'
import {IoSettingsSharp} from 'react-icons/io5'
import './FriendBar.css'
import './UserDetails.css'
import {Link} from 'react-router-dom'
import FriendProfile from '../FriendProfile/FriendProfile'
import { useState, useEffect,useRef } from 'react'
import UserDetails from './UserDetails'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useUserContext } from '../../hooks/useUserContext'
import Zoom from '@mui/material/Zoom';



function FriendBar() {

  const {user} = useAuthContext()
  const currentUser = user.user;

  const userDetailsRef = useRef(null);
  const userDetailButtonRef = useRef(null);

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (userDetailsRef.current && !userDetailsRef.current.contains(event.target) && 
      userDetailButtonRef.current && !userDetailButtonRef.current.contains(event.target)) {
      setUserDetailDisplay(false);
    }
  };

  document.addEventListener('click', handleClickOutside);

  return () => {
    document.removeEventListener('click', handleClickOutside);
  };
}, []);

  let paddedNum = currentUser.uniqueNameCounter.toString().padStart(4,"0");
  
  const [activeItem, setActiveItem] = useState('friends')
  const [userDetailDislpay,setUserDetailDisplay] = useState(false);
  const [activeStatus, setActiveStatus] = useState(user.user.status)

  const activeStatusStyles = {
    udActiveStatus:{
      forinvisible:{left:'118px', height:'10px', width:'10px',outline:'4px solid #232428',bottom:'9px'},
      foronline:{left:'118px', height:'10px', width:'10px',bottom:'9px',border:'none',outline:'4px solid #232428'},
      foridle:{left:'118px', height:'10px', width:'10px',outline:'4px solid #232428',bottom:'9px',backgroundColor:'#f0b232', border:"none"},
      fordnd:{left:'118px', height:'10px', width:'10px',outline:'4px solid #232428',bottom:'9px', display:"flex", alignItems:"center", justifyContent:"center", backgroundColor:"#f23f43"}
    },
    udasIcon:{
      forinvisible:{height:'10px', width:'10px', outline:'3px solid #232428',border:'3px solid rgba(183, 221, 255, 0.461)', backgroundColor:"#232428", borderRadius:"50%"},
      foronline:{height:'10px', width:'10px', backgroundColor:'#32ae5f',border:'none'},
      foridle:{height:'6px', width:'7px', borderRadius:'50%',backgroundColor:"#232428", border:"none"},
      fordnd:{backgroundColor:"#232428", height:"2px", width:"8px",border:'none', borderRadius:'2px'}
    }
  }

  // friend profile stuff
  const {friends} = useUserContext();
  const [isHovered,setIsHovered] = useState(false)

  return (
    <div className="friendsBar" style={{userSelect:'none'}}>

          <div className="findConversation">
            <button>Find or start a conversation</button>
          </div>

          <div className="dmList" >

            <Link to="/channels/@me">
              <button onClick={() => setActiveItem('friends')} className={`friends ${activeItem === 'friends' ? 'active' : ''}`}>
                <FaUserFriends className='friendIcon'/>
                <span>Friends</span>
              </button>
            </Link>

            <Link to="#">
              <button onClick={() => setActiveItem('nitro')} className={`nitro friends ${activeItem === 'nitro' ? 'active' : ''}`} style={{marginTop:'2px', marginBottom:'20px'}}>
                <GiCloudyFork className='friendIcon'/>
                <span>Nitro</span>
              </button>
            </Link>

            <div className="createDm">
              <h5>DIRECT MESSAGES</h5>
              <button className='dmIcon'>
                <RiAddLine className='createIcon'/>
                <div className="btn-info">
                  Create DM
                </div>
              </button>
            </div>

          
            {friends && friends.map((friend) => {
              return (
                <FriendProfile key={friend._id} activeItem={activeItem} setActiveItem={setActiveItem} friend = {friend}/>
              )
            })}
  
            

          </div>

          <div className="current-user-bar">

            <button ref={userDetailButtonRef} onClick={() => setUserDetailDisplay(prev => !prev)} className="user-info">
              
              {currentUser.avatar ===null ? <img src="https://www.svgviewer.dev/static-svgs/34446/discord-v2.svg" alt=":)" /> : <img src={currentUser.avatar} alt=":)" />}

              <div className="ud-active-status" style={activeStatusStyles.udActiveStatus[`for${activeStatus}`]}><div className="udas-icon" style={activeStatusStyles.udasIcon[`for${activeStatus}`]}></div></div>

              <div className="user-name">
                <p>{currentUser.username}</p>
                <p>#{paddedNum}</p>
              </div>
            </button>

            <div ref={userDetailsRef} style={{position:'fixed', transform:'translate(-10px, -210px)', display:`${userDetailDislpay ? 'block' : 'none'}`}} >
              <UserDetails displayOption = {userDetailDislpay} user = {user} activeStatus={activeStatus} setActiveStatus={setActiveStatus} />
            </div>
      

            <button className="user-settings-btn">
              <IoSettingsSharp className='settings-btn'/>
              <div className="btn-info">
                User Settings
              </div>
            </button>


          </div>

    </div>
  )
}

export default FriendBar
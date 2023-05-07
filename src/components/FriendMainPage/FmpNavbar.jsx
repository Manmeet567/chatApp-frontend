import './FriendMainPage.css'
import {FaUserFriends} from 'react-icons/fa'
import {MdQuickreply} from 'react-icons/md'
import {BsFillQuestionCircleFill} from 'react-icons/bs'
import { useUserContext } from '../../hooks/useUserContext'

function FmpNavbar({activeItem,setActiveItem}) {

  const handleNavClick = (str) => {
    setActiveItem(str)
  }

  const {pending} = useUserContext();
  const pendingLength = pending?.length

  return (
    <div className="fmp-navbar" style={{userSelect:'none'}}>
        <ul className="fmp-options">
            <li><FaUserFriends className="f-icon" /><span>Friends</span></li>
            <li onClick={() => handleNavClick('online')} className={activeItem==='online' ? 'active':''}>Online</li>
            <li onClick={() => handleNavClick('all')} className={activeItem==='all' ? 'active':''}>All</li>

            <li onClick={() => handleNavClick('pending')} className={activeItem==='pending' ? 'active':''} style={{display:'flex', alignItems:'center'}}>Pending{pendingLength!=0 && <div style={{marginLeft:'6px', width:'18px',height:'18px',display:'flex',alignItems:'center', justifyContent:'center', fontSize:'12px',fontWeight:'550', borderRadius:'50%', backgroundColor:'#f23f42', color:'#fff'}}className='fmpo-plength'>{pendingLength > 9 ? '9+' : pendingLength}</div>}</li>
            
            <li onClick={() => handleNavClick('blocked')} className={activeItem==='blocked' ? 'active':''}>Blocked</li>
            <li onClick={() => handleNavClick('addFriend')}><button>Add Friend</button></li>
        </ul>

        <div className="fmp-icon-options">
            <div className='fmp-icon-container fmp-icon-container-1'><MdQuickreply/></div>
            <div className="fmp-name-first">New Group DM</div>

            <div className="fmp-line"></div>
            <div className='fmp-icon-container fmp-icon-container-2'><BsFillQuestionCircleFill /></div>
            <div className="fmp-name-second">Help</div>
        </div>
        

    </div>
  )
}

export default FmpNavbar
import './FriendMainPage.css'
import {FaUserFriends} from 'react-icons/fa'
import {MdQuickreply} from 'react-icons/md'
import {BsFillQuestionCircleFill} from 'react-icons/bs'

function FmpNavbar() {
  return (
    <div className="fmp-navbar">
        <ul className="fmp-options">
            <li><FaUserFriends className="f-icon" /><span>Friends</span></li>
            <li>All</li>
            <li>Pending</li>
            <li>Blocked</li>
            <li><button>Add Friend</button></li>
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
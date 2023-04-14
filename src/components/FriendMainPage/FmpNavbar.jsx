import './FriendMainPage.css'
import {FaUserFriends} from 'react-icons/fa'
import {MdQuickreply} from 'react-icons/md'
import {BsFillQuestionCircleFill} from 'react-icons/bs'

function FmpNavbar() {
  return (
    <div className="fmp-navbar">
        <div className="fmp-options">
            <FaUserFriends/><span>Friends</span>
            <p>All</p>
            <p>Pending</p>
            <p>Blocked</p>
            <button>Add Friend</button>
        </div>

        <div className="fmp-icon-options">
            <p><MdQuickreply /></p>
            <p><BsFillQuestionCircleFill /></p>
        </div>

    </div>
  )
}

export default FmpNavbar
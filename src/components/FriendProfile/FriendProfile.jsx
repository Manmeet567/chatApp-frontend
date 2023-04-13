import './FriendProfile.css'
import tadashi from '../../assets/tadashi.jpg'

function FriendProfile() {
  return (
    <button className="friendProfile">
        <div className="userProfile">
            <img src={tadashi} alt="user" />
        </div>

        <div className="userInfo">
            <span>Tadashi</span>
        </div>
    </button>
  )
}

export default FriendProfile
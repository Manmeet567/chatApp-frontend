import './FriendProfile.css'
import tadashi from '../../assets/tadashi.jpg'

function FriendProfile({activeItem, setActiveItem}) {

  return (
    <button onClick={() => setActiveItem('id')} className={`friendProfile ${activeItem === 'id' ? 'active' : ''}`}>
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
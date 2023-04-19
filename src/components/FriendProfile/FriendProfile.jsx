import './FriendProfile.css'
import tadashi from '../../assets/tadashi.jpg'

function FriendProfile({activeItem, setActiveItem, friend}) {


  return (
    <button onClick={() => setActiveItem('id')} className={`friendProfile ${activeItem === 'id' ? 'active' : ''}`}>
        <div className="userProfile">
            {friend.avatar === null ? <img src="https://www.svgviewer.dev/static-svgs/34446/discord-v2.svg" alt=":)" /> : <img src={Hiro} alt=":)" />}
        </div>

        <div className="userInfo">
            <span>{friend.username}</span>
        </div>
    </button>
  )
}

export default FriendProfile
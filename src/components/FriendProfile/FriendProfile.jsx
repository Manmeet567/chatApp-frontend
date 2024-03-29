import './FriendProfile.css'

function FriendProfile({activeItem, setActiveItem, friend}) {


  return (
    <button onClick={() => setActiveItem(`${friend._id}`)} className={`friendProfile ${activeItem === `${friend._id}` ? 'active' : ''}`}>
        <div className="userProfile">
            {friend.avatar === null ? <img src="https://www.svgviewer.dev/static-svgs/34446/discord-v2.svg" alt=":)" /> : <img src={friend.avatar} alt=":)" />}
        </div>

        <div className="userInfo">
            <span>{friend.username}</span>
        </div>
    </button>
  )
}

export default FriendProfile
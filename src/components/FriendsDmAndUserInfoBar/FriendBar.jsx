import {FaUserFriends} from 'react-icons/fa'
import {GiCloudyFork} from 'react-icons/gi'
import {RiAddLine} from 'react-icons/ri'
import {IoSettingsSharp} from 'react-icons/io5'
import './FriendBar.css'
import {Link} from 'react-router-dom'
import FriendProfile from '../FriendProfile/FriendProfile'
import Hiro from '../../assets/Hiro.jpg'
import { useState } from 'react'

function FriendBar() {

  const [activeItem, setActiveItem] = useState('friends')

  return (
    <div className="friendsBar">

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

            <FriendProfile activeItem={activeItem} setActiveItem={setActiveItem}/>
            

          </div>

          <div className="current-user-bar">

            <button className="user-info">
              <img src={Hiro} alt=":)" />
              <div className="user-name">
                <p>HIRO</p>
                <p>#3518</p>
              </div>
            </button>

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
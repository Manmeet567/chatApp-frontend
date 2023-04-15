import { useEffect,useState } from 'react'
import './FmpMainSection.css'
import {GoSearch} from 'react-icons/go'
import NoOneOnline from '../../assets/noOneIsOnline.svg'
import WaitingWumpus from '../../assets/waitingForFriends.svg';
import PendingWumpus from '../../assets/pendingWumpus.svg'
import BlockedWumpus from '../../assets/blockedWumpus.svg'
import FriendlyWumpus from '../../assets/friendWumpus.svg'

function FmpMainSection({activeNavItem}) {

  const displayOption = [{
    display:'none'
  },
  {
    display:'flex'
  },
  {
    display:'block'
  }
]

  const [titleText, setTitleText] = useState('All FRIENDS')

  useEffect(() => {
     if(activeNavItem === 'all'){
        setTitleText('All FRIENDS')
      }
      else if(activeNavItem === 'online'){
        setTitleText('ONLINE')
      }
      else if(activeNavItem === 'pending'){
        setTitleText('PENDING')
      }
      else if(activeNavItem === 'blocked') {
        setTitleText('BLOCKED')
      }
      else if(activeNavItem === 'addFriend') {
        setTitleText('ADD FRIEND')
      }
  }, [activeNavItem])

  return (
    <section className="fms-main-section">

        {/* Online pending and Blocked friends  when their data is zero*/}
        <div className="fms-online" style={activeNavItem !== 'addFriend' ? displayOption[2] : displayOption[0]}>
          <div className="fms-no-one-online">
            <img className='fms-img' src={`${activeNavItem === 'online' ? NoOneOnline : ''}${activeNavItem === 'pending' ? PendingWumpus : ''}${activeNavItem === 'blocked' ? BlockedWumpus : ''}${activeNavItem === 'all' ? FriendlyWumpus : ''}`} alt="No one is Online" />

            <p>{`${activeNavItem === 'online' ? "No one's around to play with Wumpus." : ''}${activeNavItem === 'all' ? "Wumpus is waiting on friends. You don't have to though!" : ''}${activeNavItem === 'pending' ? "There are no pending friend requests. Here's Wumpus for now." : ''}${activeNavItem === 'blocked' ? "You can't unblock the Wumpus." : ''}`}</p>
          </div>
        </div>



        {/* All Friend List */}
        <div className="fms-all" style={activeNavItem === 'all' ? displayOption[2] : displayOption[0]}>
          <div className="fms-search-bar" style={activeNavItem === 'all' ? displayOption[1] : displayOption[0]}>
            <input type="text" placeholder="Search" autoFocus/>
            <button><GoSearch className="fms-search-btn"/></button>
          </div>

          <div className="fms-all-friend-text">
              <p>{titleText} - 0</p>
          </div>

          <div className="fms-friend-list">
              <div className="fms-friend-info">
                  
              </div>
          </div>
        </div>

        {/* Add Friend Content */}
        <div className="fms-add-friend" style={activeNavItem === 'addFriend' ? displayOption[2] : displayOption[0]}>
          
          <div className="fms-search-friend">
            <p>ADD FRIEND</p>
            <p>You can add a friend with their Discord Tag. It's cAsE-sEnSitIvE!</p>
            <div className="fmssf-input-box">
              <div className="fmssf-input">
                <input type="text" placeholder='Enter Username'/>
                <input type="text" placeholder='#0000'/>
              </div>
              <button>Send Friend Request</button>
            </div>
          </div>
          <div className="fmssf-img">
            <img src={WaitingWumpus} alt="waiting for friends" />
            <p>Wumpus is waiting on friends. You don't have to though!</p>
          </div>
          
        </div>

    </section>
  )
}

export default FmpMainSection
import NoOneOnline from '../../assets/noOneIsOnline.svg'
import PendingWumpus from '../../assets/pendingWumpus.svg'
import BlockedWumpus from '../../assets/blockedWumpus.svg'
import FriendlyWumpus from '../../assets/friendWumpus.svg'
import { useUserContext } from '../../hooks/useUserContext';
import {GoSearch} from 'react-icons/go'
import { useState,useEffect } from 'react';
import './FmpMainSection.css'

function FmpMainSectionComponent({activeNavItem, setActiveNavItem ,displayOption}) {

    const {friends,pending,blocked} = useUserContext()
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
    <div className="fmpmsc">

        {friends && activeNavItem === 'all' && <div className="fms-all" style={activeNavItem === 'all' ? displayOption[2] : displayOption[0]}>
          <div className="fms-search-bar" style={activeNavItem === 'all' ? displayOption[1] : displayOption[0]}>
            <input type="text" placeholder="Search" autoFocus/>
            <button><GoSearch className="fms-search-btn"/></button>
          </div>

          <div className="fms-all-friend-text">
              <p>{titleText} - {friends.length}</p>
          </div>

          <div className="fms-friend-list">
              <div className="fms-friend-info-main">
                  {friends.length == 0 && <div className='fms-friend-info'><img src={FriendlyWumpus} alt=";" />
                  <p style={{userSelect:'none',marginTop:'20px'}}>Wumpus is waiting on friends. You don't have to though!</p></div>}

                  {friends.length!= 0 && <div className='friendsFound'>
                        <div className="ff-friend">
                            
                        </div>

                    </div>}
              </div>
          </div>
        </div>}


    </div>
  )
}

export default FmpMainSectionComponent
import NoOneOnline from '../../assets/noOneIsOnline.svg'
import PendingWumpus from '../../assets/pendingWumpus.svg'
import BlockedWumpus from '../../assets/blockedWumpus.svg'
import FriendlyWumpus from '../../assets/friendWumpus.svg'
import { useUserContext } from '../../hooks/useUserContext';
import {GoSearch} from 'react-icons/go'
import { useState,useEffect } from 'react';
import './FmpMainSection.css'
import {BsChatSquareFill, BsThreeDotsVertical} from 'react-icons/bs';

function FmpMainSectionComponent({activeNavItem, setActiveNavItem ,displayOption}) {

    const {friends,pending,blocked} = useUserContext()
    const onlineUsers = friends !== null ? friends.filter(obj => obj.status !== "invisible") : [];
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
                  <p style={{userSelect:'none',marginTop:'20px'}}>Wumpus is waiting on friends. You don't have to though!</p>
                    <button onClick={() => setActiveNavItem('addFriend')} style={{cursor:'pointer', padding:'7px 13px', color:'#fff', backgroundColor:'#5865f2', borderRadius:'5px', marginTop:'20px'}}>Add Friend</button>
                  </div>}

                  {friends.length!= 0 && <div className='friendsFound'>
                        {friends.map((friend) => {
                            return (
                            <div key={friend._id} className="ff-friend">
                                <div className="fff-info">
                                    <div className="fffi-pic">
                                        {friend.avatar === null ? <img src="https://www.svgviewer.dev/static-svgs/34446/discord-v2.svg" alt=":)" /> : <img src={friend.avatar} alt=":)" />}
                                        <div className="fff-activestatus">
                                            <div className={`fffa-outer ${friend.status}`}><div className={`fffa-inner ${friend.status}`}></div></div>
                                        </div>

                                    </div>
                                    <div className="fffi-name-status">
                                        <div className="fffins-name">
                                            <h5 style={{color:'#ffffff', fontSize:'14px'}}>{friend.username}</h5><span className='fffinsn-span' style={{fontSize:'14px'}}>#{friend.uniqueNameCounter.toString().padStart(4,"0")}</span>
                                        </div>
                                        <div className="fffins-status">
                                            <p style={{fontSize:'13px'}}>
                                              {
                                                friend.customStatus === null
                                                  ? friend.status === "dnd"
                                                    ? "Do not Disturb"
                                                    : friend.status === "invisible"
                                                      ? "Offline"
                                                      : friend.status.charAt(0).toUpperCase() + friend.status.slice(1)
                                                  : friend.customStatus
                                              }
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="fff-icons">
                                        <div className="fffii-icon">
                                          <BsChatSquareFill style={{marginTop:'2px'}}/>
                                          <div className="fffiii-text">Message</div>
                                        </div>
                                        <div className="fffii-icon">
                                          <BsThreeDotsVertical style={{marginLeft:'0.5px'}}/>
                                          <div className="fffiii-more">More</div>
                                        </div>
                                </div>
                            </div>
                            )
                        })}
                    </div>}
              </div>
          </div>
        </div>}


        {/* online list */}

        {onlineUsers && activeNavItem === 'online' && <div className="fms-all" style={activeNavItem === 'online' ? displayOption[2] : displayOption[0]}>
          <div className="fms-search-bar" style={activeNavItem === 'online' ? displayOption[1] : displayOption[0]}>
            <input type="text" placeholder="Search" autoFocus/>
            <button><GoSearch className="fms-search-btn"/></button>
          </div>

          <div className="fms-all-friend-text">
              <p>{titleText} - {onlineUsers.length}</p>
          </div>

          <div className="fms-friend-list">
              <div className="fms-friend-info-main">
                  {onlineUsers.length == 0 && <div className='fms-friend-info'><img src={NoOneOnline} alt=";" />
                  <p style={{userSelect:'none',marginTop:'20px'}}>No one's around to play with Wumpus.</p>
                  </div>}

                  {onlineUsers.length!= 0 && <div className='friendsFound'>
                        {onlineUsers.map((friend) => {
                            return (
                            <div key={friend._id} className="ff-friend">
                                <div className="fff-info">
                                    <div className="fffi-pic">
                                        {friend.avatar === null ? <img src="https://www.svgviewer.dev/static-svgs/34446/discord-v2.svg" alt=":)" /> : <img src={friend.avatar} alt=":)" />}
                                        <div className="fff-activestatus">
                                            <div className={`fffa-outer ${friend.status}`}><div className={`fffa-inner ${friend.status}`}></div></div>
                                        </div>

                                    </div>
                                    <div className="fffi-name-status">
                                        <div className="fffins-name">
                                            <h5 style={{color:'#ffffff', fontSize:'14px'}}>{friend.username}</h5><span className='fffinsn-span' style={{fontSize:'14px'}}>#{friend.uniqueNameCounter.toString().padStart(4,"0")}</span>
                                        </div>
                                        <div className="fffins-status">
                                            <p style={{fontSize:'13px'}}>{friend.customStatus === null
                                                    ? friend.status === "dnd"
                                                    ? "Do not Disturb"
                                                    : friend.status.charAt(0).toUpperCase() + friend.status.slice(1)
                                                    : friend.customStatus}                  
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="fff-icons">
                                        <div className="fffii-icon">
                                          <BsChatSquareFill style={{marginTop:'2px'}}/>
                                          <div className="fffiii-text">Message</div>
                                        </div>
                                        <div className="fffii-icon">
                                          <BsThreeDotsVertical style={{marginLeft:'0.5px'}}/>
                                          <div className="fffiii-more">More</div>
                                        </div>
                                </div>
                            </div>
                            )
                        })}
                    </div>}
              </div>
          </div>
        </div>}
        



        {pending && activeNavItem === 'pending' && <div className="fms-all" style={activeNavItem === 'pending' ? displayOption[2] : displayOption[0]}>

          <div className="fms-search-bar" style={activeNavItem === 'pending' ? displayOption[1] : displayOption[0]}>
            <input type="text" placeholder="Search" autoFocus/>
            <button><GoSearch className="fms-search-btn"/></button>
          </div>

          <div className="fms-all-friend-text">
              <p>{titleText} - {pending.length}</p>
          </div>

          <div className="fms-friend-list">
              <div className="fms-friend-info-main">
                  {pending.length == 0 && <div className='fms-friend-info'><img src={PendingWumpus} alt=";" />
                  <p style={{userSelect:'none',marginTop:'20px'}}>There are no pending friend requests. Here's Wumpus for now.</p>
                   
                  </div>}

                  {pending.length!= 0 && <div className='friendsFound'>
                        {pending.map((friend) => {
                            return (
                            <div key={friend._id} className="ff-friend">
                                <div className="fff-info">
                                    <div className="fffi-pic">
                                        {friend.avatar === null ? <img src="https://www.svgviewer.dev/static-svgs/34446/discord-v2.svg" alt=":)" /> : <img src={friend.avatar} alt=":)" />}
                                        <div className="fff-activestatus">
                                            <div className={`fffa-outer ${friend.status}`}><div className={`fffa-inner ${friend.status}`}></div></div>
                                        </div>

                                    </div>
                                    <div className="fffi-name-status">
                                        <div className="fffins-name">
                                            <h5 style={{color:'#ffffff', fontSize:'14px'}}>{friend.username}</h5><span className='fffinsn-span' style={{fontSize:'14px'}}>#{friend.uniqueNameCounter.toString().padStart(4,"0")}</span>
                                        </div>
                                        <div className="fffins-status">
                                            <p style={{fontSize:'13px'}}>
                                              {
                                                friend.customStatus === null
                                                  ? friend.status === "dnd"
                                                    ? "Do not Disturb"
                                                    : friend.status === "invisible"
                                                      ? "Offline"
                                                      : friend.status.charAt(0).toUpperCase() + friend.status.slice(1)
                                                  : friend.customStatus
                                              }
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="fff-icons">
                                        <div className="fffii-icon">
                                          <BsChatSquareFill style={{marginTop:'2px'}}/>
                                          <div className="fffiii-text">Message</div>
                                        </div>
                                        <div className="fffii-icon">
                                          <BsThreeDotsVertical style={{marginLeft:'0.5px'}}/>
                                          <div className="fffiii-more">More</div>
                                        </div>
                                </div>
                            </div>
                            )
                        })}
                    </div>}
              </div>
          </div>

        </div>}



        {/* blocked users */}
        {blocked && activeNavItem === 'blocked' && <div className="fms-all" style={activeNavItem === 'blocked' ? displayOption[2] : displayOption[0]}>
          <div className="fms-search-bar" style={activeNavItem === 'blocked' ? displayOption[1] : displayOption[0]}>
            <input type="text" placeholder="Search" autoFocus/>
            <button><GoSearch className="fms-search-btn"/></button>
          </div>

          <div className="fms-all-friend-text">
              <p>{titleText} - {blocked.length}</p>
          </div>

          <div className="fms-friend-list">
              <div className="fms-friend-info-main">
                  {blocked.length == 0 && <div className='fms-friend-info'><img src={BlockedWumpus} alt=";" />
                  <p style={{userSelect:'none',marginTop:'20px'}}>You can't unblock the Wumpus.</p>
                  </div>}

                  {blocked.length!= 0 && <div className='friendsFound'>
                        {blocked.map((friend) => {
                            return (
                            <div key={friend._id} className="ff-friend">
                                <div className="fff-info">
                                    <div className="fffi-pic">
                                        {friend.avatar === null ? <img src="https://www.svgviewer.dev/static-svgs/34446/discord-v2.svg" alt=":)" /> : <img src={friend.avatar} alt=":)" />}
                                        <div className="fff-activestatus">
                                            <div className={`fffa-outer ${friend.status}`}><div className={`fffa-inner ${friend.status}`}></div></div>
                                        </div>

                                    </div>
                                    <div className="fffi-name-status">
                                        <div className="fffins-name">
                                            <h5 style={{color:'#ffffff', fontSize:'14px'}}>{friend.username}</h5><span className='fffinsn-span' style={{fontSize:'14px'}}>#{friend.uniqueNameCounter.toString().padStart(4,"0")}</span>
                                        </div>
                                        <div className="fffins-status">
                                            <p style={{fontSize:'13px'}}>
                                              {
                                                friend.customStatus === null
                                                  ? friend.status === "dnd"
                                                    ? "Do not Disturb"
                                                    : friend.status === "invisible"
                                                      ? "Offline"
                                                      : friend.status.charAt(0).toUpperCase() + friend.status.slice(1)
                                                  : friend.customStatus
                                              }
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="fff-icons">
                                        <div className="fffii-icon">
                                          <BsChatSquareFill style={{marginTop:'2px'}}/>
                                          <div className="fffiii-text">Message</div>
                                        </div>
                                        <div className="fffii-icon">
                                          <BsThreeDotsVertical style={{marginLeft:'0.5px'}}/>
                                          <div className="fffiii-more">More</div>
                                        </div>
                                </div>
                            </div>
                            )
                        })}
                    </div>}
              </div>
          </div>
        </div>}


    </div>
  )
}

export default FmpMainSectionComponent
import { useState } from 'react'
import './FmpMainSection.css'
import WaitingWumpus from '../../assets/waitingForFriends.svg';
import { useUserContext } from '../../hooks/useUserContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import FmpMainSectionComponent from './FmpMainSectionComponent';

function FmpMainSection({activeNavItem, setActiveNavItem}) {

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


  const [username,setUsername] = useState('')
  const [userId, setUserId] = useState('')
  const [friendRequestError, setFriendRequestError] = useState(null);
  const [friendRequestSent, setFriendRequestSent] = useState(null);

  function validateInput(username, userId) {
  // check if username is empty
  if (!username) {
    setFriendRequestSent(null)
    setFriendRequestError('Username is required')
    return false;
  }
  
  // check if userId is exactly 5 characters
  if(!userId){
    setFriendRequestSent(null)
    setFriendRequestError('User Id is required')
    return false;
  }

  if (userId.length !== 5) {
    setFriendRequestSent(null)
    setFriendRequestError('4 digit Id required')
    return false;
  }
  
  // check if first character is '#'
  if (userId[0] !== '#') {
    setFriendRequestSent(null)
    setFriendRequestError("First character of User's Id should be '#'")
    return false;
  }
  
  // check if remaining characters are numbers
  if (isNaN(userId.substr(1))) {
    setFriendRequestError('Please enter a valid user ID, Only numbers are allowed in User ID')
    return false;
  }
  setFriendRequestError(null)
  // if all checks pass, return true
  return true;
}

  const {friends} = useUserContext()
  const {user} = useAuthContext()

  const alreadyAFriendOrNot = (id, friends) => {
    // Loop through the friends array to check if userId exists in the array
    for (let i = 0; i < friends.length; i++) {
    // If the uniqueUsername of the current friend object matches the userId, return true
      if (friends[i].uniqueUsername === id) {
        return true;
      }
    }
    // If userId is not found in the friends array, return false
    return false;
  }


  function sendFriendRequest(username,userId) {

    const sendRequest = async (id) => {
      try{
        const response = await fetch('http://localhost:4000/api/userProfile/sendFriendRequest',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
            'authorization' : `Bearer ${user.token}`
          },
          body: JSON.stringify({uniqueUsername:id})
        });

        const data = await response.json()
        console.log(data)
        if(response.ok){
          if(!data.sent){
            setFriendRequestSent(null);
            setFriendRequestError(data.message);
          }
          if(data.sent){
            setFriendRequestError(null);
            setFriendRequestSent(data.message);
          }
        }
        if(!response.ok){
          setFriendRequestError(data.error)
          setFriendRequestSent(null)
        }

      }
      catch(error){
        console.log(error);
      }
    }

    if(validateInput(username,userId)){
      let id = username+userId;
      const friendExists = alreadyAFriendOrNot(id,friends)
      if(user.user.uniqueUsername !== id){
        if(!friendExists){
          sendRequest(id)
        }
        else{
          setFriendRequestSent(null)
          setFriendRequestError(`${id} is already a Friend.`)
        }
      }
      else{
        setFriendRequestSent(null)
        setFriendRequestError("Whoops!! You can't send friend request to yourself.")
      }
    }
  }


  return (
    <section className="fms-main-section" style={{userSelect:'none'}}>
        <FmpMainSectionComponent activeNavItem={activeNavItem} setActiveNavItem={setActiveNavItem} displayOption ={displayOption}/>
        

        {/* Add Friend Content */}
        <div className="fms-add-friend" style={activeNavItem === 'addFriend' ? displayOption[2] : displayOption[0]}>
          
          <div className="fms-search-friend">
            <p>ADD FRIEND</p>
            <p>You can add a friend with their Discord Tag. It's cAsE-sEnSitIvE!</p>
            <div className="fmssf-input-box">
              <div className="fmssf-input">
                <input type="text" placeholder='Enter Username' value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="text" placeholder='#0000' onChange={(e) => setUserId(e.target.value)} value={`${userId}`}  maxLength={5} required/>
              </div>
              <button style={{marginTop:'25px'}} onClick={() => sendFriendRequest(username, userId)}>Send Friend Request</button>
              <p style={{margin:'15px 0 0', fontSize:'14px', color:'red'}}>{friendRequestError}</p>
              <p style={{margin:'5px 0 0', fontSize:'14px', color:'#32ae5f'}}>{friendRequestSent}</p>
            </div>
          </div>
          <div className="fmssf-img">
            <img style={{userSelect:'none'}} src={WaitingWumpus} alt="waiting for friends" />
            <p style={{userSelect:'none'}}>Wumpus is waiting on friends. You don't have to though!</p>
          </div>
          
        </div>

    </section>
  )
}

export default FmpMainSection
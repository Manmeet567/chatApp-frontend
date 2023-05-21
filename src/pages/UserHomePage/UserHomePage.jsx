import React, { useEffect, useState } from 'react'
import ServerListSidebar from '../../components/ServerListSidebar/ServerListSidebar'
import './UserHomePage.css'
import FriendBar from '../../components/FriendsDmAndUserInfoBar/FriendBar'
import { useAuthContext } from '../../hooks/useAuthContext'
import FriendMainPage from '../../components/FriendMainPage/FriendMainPage'
import { useUserContext } from '../../hooks/useUserContext'
import {socket as mainSocket} from '../../../socket/socket'



function UserHomePage() {

    const {dispatch} = useUserContext()

    const {user} = useAuthContext()

    let friends = user.user.friends
    let blocked = user.user.blocked
    let pending = user.user.pending.map(obj => obj.user_id)

    useEffect(() => {

        const fetchData = async () => {
        try {
          const [friendsResponse, pendingResponse, blockedResponse] = await Promise.all([
            fetch('http://localhost:4000/api/userProfile/friends', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${user.token}`
              },
              body: JSON.stringify({ friends })
            }),
            fetch('http://localhost:4000/api/userProfile/pending', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${user.token}`
              },
              body: JSON.stringify({ pending })
            }),
            fetch('http://localhost:4000/api/userProfile/blocked', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${user.token}`
              },
              body: JSON.stringify({ blocked })
            })
          ])

        const friendsData = await friendsResponse.json()
        const pendingData = await pendingResponse.json()
        const blockedData = await blockedResponse.json()

        if (friendsResponse.ok) {
          dispatch({ type: 'FRIENDS', payload: friendsData })
        }

        if(pendingResponse.ok) {
          const modifiedPendingData = pendingData.map(user => {
            const modifiedPendingRequests = user.pending.filter(request => request.user_id !== user._id).map(request => request.receiver);
            const realPendingData = modifiedPendingRequests[0];
              return {
                ...user,
                pendingRequest: realPendingData
              }
            });
          dispatch({ type: 'PENDING', payload: modifiedPendingData })
        }

        if (blockedResponse.ok) {
          dispatch({ type: 'BLOCKED', payload: blockedData })
        }
    } catch (error) {
      console.error(error)
    }
  }

  if (user) {
    fetchData()
  }

}, [])


  // connecting socket


  const [socket, setSocket] = useState(null)

  const sendRequest = async (socketId) => {
      try {
        const response = await fetch('http://localhost:4000/api/webSocket/newConnection', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
            'authorization': `Bearer ${user.token}`
          },
          body: JSON.stringify({ socketId }),
        });

        if (response.ok) {
          console.log('Socket ID stored successfully');
        } else {
          console.log('Failed to send Socket ID');
        }
      } catch (error) {
        console.log('Error sending Socket ID:', error);
      }
    };
 
  useEffect(() => {
    setSocket(mainSocket);
  }, []);

useEffect(() => {
  if (socket && user) {
    socket.on('connect', () => {
      console.log('Connected to web socket:', socket.id);
      console.log(`${user.user.username} connected`)
      dispatch({type:'SET_SOCKET', payload:socket.id});
      
      sendRequest(socket.id)
    });
  }

  socket?.on('disconnect', () => {
    console.log('a user disconnected')
  })
}, [socket]);
  


  return (
        <div className="userHomePage">
            <ServerListSidebar />
            <FriendBar />
            {/* <button onClick={handleLogout}>Logout</button> */}
  

            <FriendMainPage />

        </div>
  )
}

export default UserHomePage
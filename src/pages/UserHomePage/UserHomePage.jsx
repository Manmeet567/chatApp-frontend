import React, { useEffect, useState } from 'react'
import ServerListSidebar from '../../components/ServerListSidebar/ServerListSidebar'
import './UserHomePage.css'
import FriendBar from '../../components/FriendsDmAndUserInfoBar/FriendBar'
import { useAuthContext } from '../../hooks/useAuthContext'
import FriendMainPage from '../../components/FriendMainPage/FriendMainPage'
import { useUserContext } from '../../hooks/useUserContext'
import {initializeSocket ,socket as mainSocket} from '../../../socket/socket'


function UserHomePage() {

    const {notifications,dispatch:userDispatch} = useUserContext()
    useEffect(()=>{console.log(notifications)},[notifications])

    const {user,dispatch} = useAuthContext()

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
          userDispatch({ type: 'FRIENDS', payload: friendsData })
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
          userDispatch({ type: 'PENDING', payload: modifiedPendingData })
        }

        if (blockedResponse.ok) {
          userDispatch({ type: 'BLOCKED', payload: blockedData })
        }
    } catch (error) {
      console.error(error)
    }
  }

  if (user) {
    fetchData()
    userDispatch({type:'NOTIFICATIONS', payload:user.user.notifications})
    initializeSocket()
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
      userDispatch({type:'SET_SOCKET', payload:socket.id});
      
      sendRequest(socket.id)
      
       socket?.once('newFriendRequest', (data) => {
        userDispatch({type:'NOTIFICATIONS', payload:data.receiver.notifications})
        userDispatch({type:'UPDATE_PENDING', payload:data.sender})
        dispatch({type:'UPDATE_USER', payload:{pending:data.receiver.pending, notifications:data.receiver.notifications}})
      });

    });
  }
  
  socket?.on('disconnect', () => {
    console.log('a user disconnected')
    userDispatch({type:'NOTIFICATIONS', payload:null})
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
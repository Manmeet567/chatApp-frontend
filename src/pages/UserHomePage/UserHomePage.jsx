import React, { useEffect, useState } from 'react'
import { useLogout } from '../../hooks/useLogout'
import ServerListSidebar from '../../components/ServerListSidebar/ServerListSidebar'
import './UserHomePage.css'
import FriendBar from '../../components/FriendsDmAndUserInfoBar/FriendBar'
import { useAuthContext } from '../../hooks/useAuthContext'
import FriendMainPage from '../../components/FriendMainPage/FriendMainPage'
import { useUserContext } from '../../hooks/useUserContext'
import {io} from 'socket.io-client'


function UserHomePage() {

    const {dispatch} = useUserContext()
    const {logout} = useLogout()

    const handleLogout = () => {
        logout()
    }

    const {user} = useAuthContext()
    let friends = user.user.friends

    let pending = user.user.pending

    let blocked = user.user.blocked

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

      if (pendingResponse.ok) {
        dispatch({ type: 'PENDING', payload: pendingData })
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

  // socket 
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    setSocket(io('ws://localhost:8900'))
  }, [])

  useEffect(() => {
    
    socket?.on('hello', message => {
      console.log(message)
    })
  },[socket])
  


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
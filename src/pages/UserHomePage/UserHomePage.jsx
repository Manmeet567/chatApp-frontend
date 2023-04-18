import React, { useEffect } from 'react'
import { useLogout } from '../../hooks/useLogout'
import ServerListSidebar from '../../components/ServerListSidebar/ServerListSidebar'
import './UserHomePage.css'
import FriendBar from '../../components/FriendsDmAndUserInfoBar/FriendBar'
import { useAuthContext } from '../../hooks/useAuthContext'
import FriendMainPage from '../../components/FriendMainPage/FriendMainPage'
import { useUserContext } from '../../hooks/useUserContext'


function UserHomePage() {

    const {dispatch:friendDispatch} = useUserContext()
    const {logout} = useLogout()

    const handleLogout = () => {
        logout()
    }

    const {user} = useAuthContext()
    let friends = user.user.friends
    
    useEffect(() => {

        const fetchFriends = async () => {
            const response = await fetch('http://localhost:4000/api/userProfile/friends', {
                method:'POST',
                headers:{
                'Content-Type':'application/json',
                'authorization' : `Bearer ${user.token}`
                },
                body: JSON.stringify({friends})
            })

            const data = await response.json()
            if(response.ok){
                friendDispatch({type:'FRIENDS', payload:data})
            }
        }

        if(user){
            fetchFriends()
        }

    }, [user])


  return (
        <div className="userHomePage">
            <ServerListSidebar />
            <FriendBar />
            <button onClick={handleLogout}>Logout</button>
  

            <FriendMainPage />

        </div>
  )
}

export default UserHomePage
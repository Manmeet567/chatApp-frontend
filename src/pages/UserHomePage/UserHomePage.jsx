import React from 'react'
import { useLogout } from '../../hooks/useLogout'

import ServerListSidebar from '../../components/ServerListSidebar/ServerListSidebar'
import './UserHomePage.css'
import FriendBar from '../../components/FriendsDmAndUserInfoBar/FriendBar'
import FriendMainPage from '../../components/FriendMainPage/FriendMainPage'


function UserHomePage() {

    const {logout} = useLogout()

    const handleLogout = () => {
        logout()
    }

  return (
    <div className="userHomePage">
        <ServerListSidebar />
        <FriendBar />
        {/* <button onClick={handleLogout}>Logout</button> */}
        {/* checking github */}

        <FriendMainPage />

    </div>
  )
}

export default UserHomePage
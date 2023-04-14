import React from 'react'
import { useLogout } from '../../hooks/useLogout'

import ServerListSidebar from '../../components/ServerListSidebar/ServerListSidebar'
import './UserHomePage.css'
import FriendBar from '../../components/FriendsDmAndUserInfoBar/FriendBar'


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
    </div>
  )
}

export default UserHomePage
import FmpMainSection from './FmpMainSection'
import FmpNavbar from './FmpNavbar'
import FmpRightSection from './FmpRightSection'
import './FriendMainPage.css'
import { useEffect, useState } from 'react'

function FriendMainPage() {

  const [navSelectedItem,setNavSelectedItem] = useState('online');

  return (
    <div className="friend-main-page">
        <FmpNavbar activeItem={navSelectedItem} setActiveItem={setNavSelectedItem}/>
        
        <div className="fmp-main">
          <FmpMainSection activeNavItem={navSelectedItem}/>

          <FmpRightSection />
        </div>

    </div>
  )
}

export default FriendMainPage
import FmpMainSection from './FmpMainSection'
import FmpNavbar from './FmpNavbar'
import FmpRightSection from './FmpRightSection'
import './FriendMainPage.css'

function FriendMainPage() {
  return (
    <div className="friend-main-page">
        <FmpNavbar />
        
        <div className="fmp-main">
          <FmpMainSection />
          <FmpRightSection />
        </div>

    </div>
  )
}

export default FriendMainPage
import './SingleUserChatPage.css'
import SucpNavbar from './SucpNavbar'
import { useAuthContext } from '../../hooks/useAuthContext'

function SingleUserChatPage() {

  const {user} = useAuthContext()

  return (
    <div className="sucp">
        <SucpNavbar />
    </div>
  )
}

export default SingleUserChatPage
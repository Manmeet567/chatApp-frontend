import {BiLogOut} from 'react-icons/bi'
import {CgProfile} from 'react-icons/cg'
import './UserSettings.css'
import { useLogout } from '../../hooks/useLogout'
import { Link } from 'react-router-dom'

function UserSettings({userSettings}) {

    const {logout} = useLogout()

    const handleLogout = () => {
        logout()
    }

  return (
    <div className="user-settings" style={{display: userSettings ? 'flex': 'none'}}>
        <Link to='/channels/@me/settings'><button className='us-btn'><CgProfile style={{fontSize:'18px', marginRight:'5px'}} />User Settings</button></Link>
        <button className='us-btn' style={{marginTop:'12px'}} onClick={handleLogout}><BiLogOut style={{fontSize:'18px', marginRight:'5px'}} />Logout</button>
    </div>
  )
}

export default UserSettings
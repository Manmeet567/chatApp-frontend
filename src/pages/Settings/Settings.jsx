import './Settings.css'
import { RxCross2 } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom';

function Settings() {

    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/channels/@me')
    }

  return (
    <div className="settings-page">
        <div className="sp-title">
            <h3>MY ACCOUNT</h3>
            <RxCross2 onClick={handleClose} title='Close' style={{fontSize:'40px', borderRadius:'50%', padding:'5px' ,border:'2px solid #fff', cursor:'pointer'}} />
        </div>
        <div className="sp-options">
            
        </div>
    </div>
  )
}

export default Settings
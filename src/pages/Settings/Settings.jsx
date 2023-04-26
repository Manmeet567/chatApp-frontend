import './Settings.css'
import { RxCross2 } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

function Settings() {

    const {user} = useAuthContext();
    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/channels/@me')
    }

    const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="settings-page">
      <div className="sp-title">
        <h3>MY ACCOUNT</h3>
        <div className="esc-btn" onClick={handleClose} title='Close' >
          <RxCross2 title='Close' style={{fontSize:'40px', borderRadius:'50%', padding:'5px' ,border:'2px solid #aeb3ba', cursor:'pointer'}} />
          <p style={{fontSize:'12px'}}>ESC</p>
        </div>
      </div>

      <div className="sp-profile-settings">

        <div className="sps-profile">
          <div className="top-banner">
            <div className="sp-img">
              <img src={user.user.avatar === null ? 'https://www.svgviewer.dev/static-svgs/34446/discord-v2.svg' : user.user.avatar} alt="loading..." />
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default Settings
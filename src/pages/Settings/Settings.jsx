import './Settings.css'
import { RxCross2 } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Settings() {

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
        
      </div>
    </div>
  )
}

export default Settings
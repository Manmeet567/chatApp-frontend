import { Modal, Box, Zoom } from '@mui/material';
import './UserProfileModal.css'
import { useAuthContext } from '../../hooks/useAuthContext';

function UserProfileModal({handleClose, open, TopBg}) {

    const { user } = useAuthContext()
    let paddedNum = user.user.uniqueNameCounter.toString().padStart(4,"0");
    const dateStr = user.user.createdAt;
    const  date = new Date(dateStr);
    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date)

  return (
    <div className="userProfileModal">
        <Modal
            className='up-modal'
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Zoom in={open} timeout={200}>
                <Box className='upm-box'>
                    <div className="topBg" style={{backgroundColor:TopBg, height:'120px', }}>
                        <div className="avatar"><img src={`${user.user.avatar === null ? 'https://www.svgviewer.dev/static-svgs/34446/discord-v2.svg' : user.user.avatar}`} alt=":)" /> <div className={`upm-activeStatus-outer ${user.user.status}`}><div className={`upm-activeStatus-inner ${user.user.status}`}></div></div> </div>
                    </div>
                    <Box className="upm-infoBox">
                        <div className="upmi-username">
                            <p style={{fontSize:'20px', fontWeight:'500'}}>{user.user.username}</p>
                            <p style={{fontSize:'20px', fontWeight:'500', color:'#ffffff7c'}}>#{paddedNum}</p>
                        </div>

                        {user.user.custumStatus != null && <div className='upmi-about'>
                                <p style={{fontSize:'12px', fontWeight:'550', marginBottom:'12px',letterSpacing:'0.5px',marginTop:'15px'}}>ABOUT ME</p>
                                <p style={{fontSize:'14px', fontWeight:'300',marginBottom:'25px'}}>{user.user.customStatus}</p>
                            </div>}

                        <div className="upmi-member-since">
                            <p style={{fontSize:'12px',letterSpacing:'0.5px', fontWeight:'550', marginBottom:'12px'}}>MISCORD MEMBER SINCE</p>
                            <p style={{fontSize:'14px', fontWeight:'300'}}>{formattedDate}</p>
                        </div>
                    </Box>
                </Box>
                </Zoom>

        </Modal>
    </div>
  )
}

export default UserProfileModal
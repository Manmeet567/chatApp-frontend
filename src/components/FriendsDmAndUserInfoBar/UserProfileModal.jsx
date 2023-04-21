import { Modal, Box } from '@mui/material';
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
                 <Box className='upm-box'>
                    <div className="topBg" style={{backgroundColor:TopBg, height:'120px', }}>
                        <div className="avatar"><img src={`${user.user.avatar === null ? 'https://www.svgviewer.dev/static-svgs/34446/discord-v2.svg' : user.user.avatar}`} alt=":)" /></div>
                    </div>
                    <Box className="upm-infoBox">
                        <div className="upmi-username">
                            <p style={{fontSize:'20px', fontWeight:'500'}}>{user.user.username}</p>
                            <p style={{fontSize:'20px', fontWeight:'500', color:'#ffffffc7'}}>#{paddedNum}</p>
                        </div>

                        {user.user.custumStatus != null && <div className='upmi-about'>
                                <h5>ABOUT ME</h5>
                                <p>{user.user.customStatus}</p>
                            </div>}

                        <div className="upmi-member-since">
                            <h5>MISCORD MEMBER SINCE</h5>
                            <p>{formattedDate}</p>
                        </div>
                    </Box>
                </Box>

        </Modal>
    </div>
  )
}

export default UserProfileModal
import './UserDetails.css'
import {MdOutlineFileCopy} from 'react-icons/md'
import {RiPencilFill} from 'react-icons/ri'
import {FaSmile} from 'react-icons/fa'
import Hiro from '../../assets/Hiro.jpg'
import {useRef, useState, useEffect} from 'react'
import { useAuthContext } from '../../hooks/useAuthContext';


function UserDetails({displayOption, user,activeStatus, setActiveStatus}) {

  const [copyTextContent,setCopyTextContent] = useState('click to copy username')

  const [activeStatusDisplay,setActiveStatusDisplay] = useState(false);
  const divRef = useRef(null);


  const [udTopBg,setUdTopBg] = useState('#000000')
  const handleColorChange = (event) => {
    setUdTopBg(event.target.value); // update the udTopBg value when the color is changed
  };

  const copyText = () => {
    const textToCopy = divRef.current.querySelector('h2').innerText;;
    navigator.clipboard.writeText(textToCopy);

    // Swap the classes of the two divs
    divRef.current.querySelector('.udui-copy-username').classList.add('copied');
    setCopyTextContent('Copied!!')

    // Set a timer to swap the classes back after 3 seconds
    setTimeout(() => {
      divRef.current.querySelector('.udui-copy-username').classList.remove('copied');
      setCopyTextContent('click to copy username')
    }, 3000);
  }


  const dateStr = user.user.createdAt
  const date = new Date(dateStr);
  const options = { month: 'short', day: '2-digit', year: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date)

  const { dispatch } = useAuthContext();
  const token = user.token;

  useEffect(() => {

    const updateStatus = async () => {
      try{

        const response = await fetch('http://localhost:4000/api/userProfile/updateStatus',{
          method:'PATCH',
          headers:{
            'Content-Type':'application/json',
            'authorization' : `Bearer ${token}`
          },
          body: JSON.stringify({ status:activeStatus })
        });

        const data = await response.json();
        let updateduser = {
          user:data.updatedUserStatus,
          token:token
        }
      
        localStorage.setItem('user', JSON.stringify(updateduser));
        dispatch({type:'UPDATE_USER', payload:updateduser})

        
      }
      catch(error){
        console.log(error);
      }
    }
    updateStatus()

  },[activeStatus])

  return (
    <div className="user-details" style={displayOption === true ? {display:"block"} : {display:"none"}}>

      <div className="ud-top-bg" style={{backgroundColor: udTopBg}}>
        <input style={{position:'fixed', width:'40px', height:'40px',cursor:'pointer', transform:"translateX(-20px)", borderRadius:'50%', opacity:0}} type='color' name='color' value={udTopBg} onChange={handleColorChange} />
        <button><RiPencilFill style={{color:"#fff", fontSize:"18px"}}/></button>
      </div>

      <div className="ud-avatar">
        <img className='ud-avatar-img' src={user.user.avatar === null ? "https://www.svgviewer.dev/static-svgs/34446/discord-v2.svg" : {Hiro}} alt=":)" />
        <div className={`ud-active-status ${activeStatus}`}><div className={`udas-icon ${activeStatus}`}></div></div>
      </div>

      <div className="ud-user-info">
        <div className="udui-username" ref={divRef} onClick={copyText}>
          <h2>{user.user.uniqueUsername}</h2>
          <MdOutlineFileCopy style={{fontSize:"18px"}} className='udui-copy-icon'/>
          <div className="udui-copy-username"><p>{copyTextContent}</p></div>
        </div>

        <div className="udui-extra-info">
          <h5 style={{display:`${user.user.status === null ? 'none' : 'block'}`}}>ABOUT ME</h5>
          <p style={{display:`${user.user.status === null ? 'none' : 'block'}`}}>{user.user.status}</p>
          <h5>MISCORD MEMBER SINCE</h5>
          <p>{formattedDate}</p>
        </div>

        <div className="udui-active-options">
          <button onMouseEnter={() => setActiveStatusDisplay(true)} className="udui-set-active-status" onMouseLeave={() => setActiveStatusDisplay(false)}>
            <div style={{display:"flex", alignItems:'center'}}>

              <div className={`ud-active-status ${activeStatus}`} style={{position:'relative', bottom:0, outline:'none',borderRadius:'50%',overflow:'hidden', margin:'0px 5px'}}><div className={`udas-icon ${activeStatus}`} style={{position:'relative'}}></div></div>
              
              <p style={{fontSize:'14px'}}>Invisible</p>
            </div>
            <div className="udui-arrow-icon">
              <p style={{cursor:'pointer'}}>&gt;</p>
            </div>
          </button>

          <div onMouseEnter={() => setActiveStatusDisplay(true)} onMouseLeave={() => setActiveStatusDisplay(false)} style={{display:`${activeStatusDisplay ? 'block' : 'none'}`}} className="activeStatusContainer">
            <div className="asc-main">

              <button onClick={() => setActiveStatus('online')} className="ascm-on-btn">
                <div className="st-online"></div>
                <p>Online</p>
              </button>

              <div className="ascm-line" style={{backgroundColor:"#adadad82", width:'100%', height:'1px',margin:"10px 0"}}></div>
      
              <button className='ascm-idle-btn' onClick={() => setActiveStatus('idle')}>
                <div className="st-idle"><div className="sti-idle"></div></div>
                <p>Idle</p>
              </button>

              <button className='ascm-dnd' onClick={() => setActiveStatus('dnd')}>
                <div className="ascm-dnd-btn-info">
                  <div className="st-dnd"><div className="stdnd-dnd"></div></div>
                  <p>Do Not Disturb</p>
                </div>
                <p>You will not receive any desktop notifications.</p>
              </button>

              <button className='ascm-invisible' onClick={() => setActiveStatus('invisible')}>
                <div className="ascm-inv-btn-info">
                  <div className="st-inv"><div className="stinv-inv"></div></div>
                  <p>Invisible</p>
                </div>
                <p>You will not appear online, but will have full access to all of Discord.</p>
              </button>
            </div>
          </div>


          <div className="udui-set-custom-status">
            <FaSmile style={{marginRight:'10px'}}/>
            <p style={{fontSize:'14px'}}>Set Custom Status</p>
          </div>
          
        </div>

      </div>

    </div>
  )
}

export default UserDetails
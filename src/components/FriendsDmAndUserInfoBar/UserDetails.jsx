import './UserDetails.css'
import {MdOutlineFileCopy} from 'react-icons/md'
import {RiPencilFill} from 'react-icons/ri'
import {FaSmile} from 'react-icons/fa'
import Hiro from '../../assets/Hiro.jpg'
import {useRef, useState, useEffect} from 'react'


function UserDetails({displayOption, user}) {

  const [copyTextContent,setCopyTextContent] = useState('click to copy username')

  const [activeStatusDisplay,setActiveStatusDisplay] = useState(false);
  const divRef = useRef(null);
  const activeStatusButtonRef = useRef(null);
  const activeStatusBoxDisplayRef = useRef(null);

//   useEffect(() => {
//   const handleClickOutside = (event) => {
//     if (activeStatusBoxDisplayRef.current && !activeStatusBoxDisplayRef.current.contains(event.target) && 
//       activeStatusButtonRef.current && !activeStatusButtonRef.current.contains(event.target)) {
//       setActiveStatusDisplay(false);
//     }
//   };

//   document.addEventListener('click', handleClickOutside);

//   return () => {
//     document.removeEventListener('click', handleClickOutside);
//   };
// }, []);


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

  const activeStatus = ['online', 'idle', 'do-not-disturb', 'invisible']

  return (
    <div className="user-details" style={displayOption === true ? {display:"block"} : {display:"none"}}>

      <div className="ud-top-bg" style={{backgroundColor: udTopBg}}>
        <input style={{position:'fixed', width:'40px', height:'40px',cursor:'pointer', transform:"translateX(-20px)", borderRadius:'50%', opacity:0}} type='color' name='color' value={udTopBg} onChange={handleColorChange} />
        <button><RiPencilFill style={{color:"#fff", fontSize:"18px"}}/></button>
      </div>

      <div className="ud-avatar">
        <img className='ud-avatar-img' src={user.user.avatar === null ? "https://www.svgviewer.dev/static-svgs/34446/discord-v2.svg" : {Hiro}} alt=":)" />
        <div className="ud-active-status "><div className="udas-icon invisible"></div></div>
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
              <div className="udas-icon invisible" style={{position:'relative', marginRight:'10px'}}></div>
              <p style={{fontSize:'14px'}}>Invisible</p>
            </div>
            <div className="udui-arrow-icon">
              <button style={{cursor:'pointer'}}>&gt;</button>
            </div>
          </button>

          <div onMouseEnter={() => setActiveStatusDisplay(true)} onMouseLeave={() => setActiveStatusDisplay(false)} style={{display:`${activeStatusDisplay ? 'block' : 'none'}`}} className="activeStatusContainer">
            <div className="asc-main">

              <button className="ascm-on-btn">
                <div className="st-online"></div>
                <p>Online</p>
              </button>

              <div className="ascm-line" style={{backgroundColor:"#adadad82", width:'100%', height:'1px',margin:"10px 0"}}></div>
      
              <button className='ascm-idle-btn'>
                <div className="st-idle"><div className="sti-idle"></div></div>
                <p>Idle</p>
              </button>

              <button className='ascm-dnd'>
                
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
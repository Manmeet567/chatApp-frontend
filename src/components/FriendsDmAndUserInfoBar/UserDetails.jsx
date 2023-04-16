import './UserDetails.css'
import {MdOutlineFileCopy} from 'react-icons/md'
import {RiPencilFill} from 'react-icons/ri'
import {FaSmile} from 'react-icons/fa'
import Hiro from '../../assets/Hiro.jpg'
import {useRef, useState} from 'react'


function UserDetails({displayOption, user}) {

  const [copyTextContent,setCopyTextContent] = useState('click to copy username')
  const divRef = useRef(null);

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

      <div className="ud-top-bg">
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
          <h5>ABOUT ME</h5>
          <p>Lorem ipsum dolors sit amet consectetur adipisicing elit. Ducimus aut officia adg facere eveniet tempora sae kefnf adofj</p>
          <h5>MISCORD MEMBER SINCE</h5>
          <p>{formattedDate}</p>
        </div>

        <div className="udui-active-options">
          <div className="udui-set-active-status">
            <div style={{display:"flex", alignItems:'center'}}>
              <div className="udas-icon invisible" style={{position:'relative', marginRight:'10px'}}></div>
              <p style={{fontSize:'14px'}}>Invisible</p>
            </div>
            <div className="udui-arrow-icon">
              <button>&gt;</button>
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
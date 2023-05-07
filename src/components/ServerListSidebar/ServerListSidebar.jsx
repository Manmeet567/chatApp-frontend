import './serverListSidebar.css'
import {FaDiscord,FaCompass} from 'react-icons/fa'
import {AiOutlinePlus} from 'react-icons/ai'
import { useState } from 'react'
import {useUserContext} from '../../hooks/useUserContext';

import ServerIcon from '../ServerIcon/ServerIcon'

function ServerListSidebar() {

    const {pending} = useUserContext();
    const pendingLength = pending?.length;
    const [activeItem,setActiveItem] = useState('discord-icon')

    function onServerClick(item) {
        setActiveItem(item)
    }

  return (
    <div className="serverList">
        <div className={`discord-icon ${activeItem === 'discord-icon' ? 'active' : ''}`} onClick={() => onServerClick('discord-icon')}>

            {pendingLength && <div style={{margin:'0 10px', width:'26px',height:'26px',display:'flex',alignItems:'center', justifyContent:'center', fontSize:'12px',fontWeight:'550', borderRadius:'50%', backgroundColor:'#f23f42', color:'#fff', position:'fixed', zIndex:'1', border:'5px solid #1e1f22', transform:'translate(20px,18px)'}} >{pendingLength > 9 ? '9+' : pendingLength}</div>}

            <div className={`${activeItem === 'discord-icon' ? 'serverBarHoverEffect active' : 'serverBarHoverEffect'}`}></div>

            <FaDiscord className='dms'/>
            <div className="s-name">
                Direct Messages
            </div>
        </div>

        <div className="line"></div>
        

        <ServerIcon setActiveItem={setActiveItem} activeItem={activeItem} onServerClick={onServerClick}/>

        <div className={`addServer ${activeItem === 'addServer' ? 'active' : ''}`} onClick={() => onServerClick('addServer')}>
            <div className={`${activeItem === 'addServer' ? 'serverBarHoverEffect active' : 'serverBarHoverEffect'}`}></div>

            <AiOutlinePlus className='add-icon'/>
            <div className="a-name">
                Add a Server
            </div>
        </div>
        
        <div className={`explore addServer ${activeItem === 'explore' ? 'active' : ''}`} onClick={() => onServerClick('explore')}>
            <div className={`${activeItem === 'explore' ? 'serverBarHoverEffect active' : 'serverBarHoverEffect'}`}></div>

            <FaCompass className='add-icon'/>
            <div className="e-name">
                Explore Public Servers
            </div>
        </div>

    </div>
  )
}

export default ServerListSidebar

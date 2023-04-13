import './serverListSidebar.css'
import {FaDiscord,FaCompass} from 'react-icons/fa'
import {AiOutlinePlus} from 'react-icons/ai'
import { useState } from 'react'

import ServerIcon from '../ServerIcon/ServerIcon'

function ServerListSidebar() {

    const [activeItem,setActiveItem] = useState('discord-icon')

    function onServerClick(item) {
        setActiveItem(item)
    }

  return (
    <div className="serverList">
        <div className={`discord-icon ${activeItem === 'discord-icon' ? 'active' : ''}`} onClick={() => onServerClick('discord-icon')}>

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

import { useEffect, useState, useCallback} from 'react'
import { useServersContext } from '../../hooks/useServersContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import './ServerIcon.css'

function ServerIcon({activeItem, onServerClick}) {

  const { user } = useAuthContext()
  const { servers, dispatch } = useServersContext()

    useEffect(() => {

      const fetchServers = async () => {
        const response = await fetch('http://localhost:4000/api/server/getServer', {
          headers: {
            'authorization' : `Bearer ${user.token}`
          }
        })

        const json = await response.json()

        if(response.ok) {
          dispatch({type:'GET_SERVER_LIST', payload:json})
        }
      }

      if(user) {
        fetchServers()
      }

    }, [dispatch, user])


  return (
    <div className="serverIconList">
        {servers && servers.map((server) => {

          // split the server name 
          const serverName = server.name.split(" ")

          // Get the first characters of the first two words
          const initials = serverName.map((word, index) => {
            return index < 2 ? word.charAt(0).toUpperCase() : ''
          }).join('')

          return (
            <div className={`serverIcon ${activeItem === server._id ? 'active' : ''} ${server.serverImg == null ? 'text' : 'img'}`} key={server._id} onClick={() => onServerClick(server._id)}>
              <div className={`serverIconHoverEffect ${activeItem === server._id ? 'active' : ''}`}></div>
              <p style={{color:'#fff'}}>{initials}</p>
              <div className="serverNameEffect">
                <p>{server.name}</p>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default ServerIcon


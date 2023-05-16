import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { Home,Login,Signup,UserHomePage } from './pages'
import { useAuthContext } from './hooks/useAuthContext'
import './App.css'
import Settings from './pages/Settings/Settings'
import { useState, useEffect } from 'react'
import {socket as mainSocket} from '../socket/socket'
import { useUserContext } from './hooks/useUserContext'

function App() {

  const {user} = useAuthContext()

  const {dispatch:userDispatch} = useUserContext()

  const [socket, setSocket] = useState(null)

  const sendRequest = async (socketId) => {
      try {
        const response = await fetch('http://localhost:4000/api/webSocket/newConnection', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
            'authorization': `Bearer ${user.token}`
          },
          body: JSON.stringify({ socketId }),
        });

        if (response.ok) {
          console.log('Socket ID stored successfully');
        } else {
          console.log('Failed to send Socket ID');
        }
      } catch (error) {
        console.log('Error sending Socket ID:', error);
      }
    };
 
  useEffect(() => {
    setSocket(mainSocket);
  }, []);

useEffect(() => {
  if (socket && user) {
    socket.on('connect', () => {
      console.log('Connected to web socket:', socket.id);
      console.log(`${user.user.username} connected`)
      userDispatch({type:'SET_SOCKET', payload:socket.id});
      
    sendRequest(socket.id)
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      sendRequest(null)
    });
  }
}, [socket]);

  return (
      <BrowserRouter>
        <div className="pages">
          <Routes>

            <Route path='/' element={user? <Navigate to='/channels/@me'/> : <Home/>} />

            <Route path='/channels/@me' element={user ? <UserHomePage /> : <Navigate to='/' />} />

            <Route path='/channels/@me/settings' element={user ? <Settings /> : <Navigate to='/'/>} />

            <Route path='/login' element={!user ? <Login/> : <Navigate to='/channels/@me' />} />

            <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/channels/@me'/>} />

          </Routes>
        </div>
      </BrowserRouter>
  )
}

export default App

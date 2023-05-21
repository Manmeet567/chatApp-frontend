import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { Home,Login,Signup,UserHomePage } from './pages'
import { useAuthContext } from './hooks/useAuthContext'
import './App.css'
import Settings from './pages/Settings/Settings'

function App() {

  const {user} = useAuthContext()

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

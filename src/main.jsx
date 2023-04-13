import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { AuthContextProvider } from './context/AuthContext';
import { ServerContextProvider } from './context/ServerContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ServerContextProvider>
        <App />
      </ServerContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)

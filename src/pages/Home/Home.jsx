import React from 'react'
import {Link} from 'react-router-dom';
import {FaDiscord} from 'react-icons/fa';
import './Home.css'
import first from '../../assets/first.svg'
import second from '../../assets/second.svg'
import third from '../../assets/third.svg'

function Home() {
  return (
    <div className="home">

      <img src={first} alt="1" className='goo'/>
      <img src={second} alt="2" className='mountains'/>
      <img src={third} alt="3" className='goo2'/>

      <nav>
        <Link to='/' className="logo">
          <FaDiscord className='logo-img'/><span>Miscord</span>
        </Link>

        <div className="menu">
          <ul>
            <li>Download</li>
            <li>Nitro</li>
            <li>Discover</li>
            <li>Safety</li>
            <li>Support</li>
            <li>Blog</li>
            <li>Careers</li>
          </ul>
        </div>

        <div className="button">
          <Link to="/signup">Open Miscord</Link>
        </div>
      </nav>

      <main>
        <h1>IMAGINE A PLACE...</h1>
        <div className="main-text">
          <p>...where you can belong to a school club, a gaming group, or a worldwide art community.</p>Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.
        </div>

        <div className="main-button">
          <Link to='/signup'><button className='firstButton'>New User? Sign Up here</button></Link>
          <Link to='/login'><button>Welcome back! Login</button></Link>
        </div>
      </main>

    </div>
  )
}

export default Home
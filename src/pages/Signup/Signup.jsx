import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import './Signup.css'
import {BsFillEyeFill,BsFillEyeSlashFill} from 'react-icons/bs'
import { useSignup } from '../../hooks/useSignup'

const Signup = () => {

    const [eye, setEye] = useState(false);
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const {signup,error,loading} = useSignup()

    const handleSignup = async (e) => {
        e.preventDefault()

        await signup(email, password, username)
    }

  return (
    <div className="container">
        <div className="login__content">
            {/* <img src="https://assets.codepen.io/7773162/4kNYC.jpeg" alt="login image" class="login__img" /> */}

            <form className="login__form" onSubmit={handleSignup}>
                <div>
                    <h1 className="login__title">
                        <span>Welcome</span> New User!
                    </h1>
                    <p className="login__description">
                        Please Signup to continue.
                    </p>
                </div>

                <div>
                    <div className="login__inputs">
                        
                        <div>
                            <label htmlFor="" className="login__label">Username</label>
                            <input type="text" placeholder="Username" required className="login__input" onChange={(e) => setUsername(e.target.value)} value={username} autoFocus/>
                        </div>
                        
                        <div>
                            <label htmlFor="" className="login__label">Email</label>
                            <input type="email" placeholder="Enter your email address" required className="login__input" onChange={(e) => setEmail(e.target.value)} value={email}/>
                        </div>

                        <div>
                            <label htmlFor="" className="login__label">Password</label>

                            <div className="login__box">
                                <input type={!eye ? 'password' : 'text'} placeholder="Enter your password" required className="login__input" id="input-pass" onChange={(e) => setPassword(e.target.value)} value={password}/>
                                <i className="ri-eye-off-line login__eye" id="input-icon" onClick={() => setEye(!eye)}>{eye ? <BsFillEyeFill/> : <BsFillEyeSlashFill />}</i>
                            </div>
                        </div>
                    </div>

                    {/* <div className="login__check">
                        <input type="checkbox" className="login__check-input" value={rememberMe} onChange={(e) => setRememberMe(!rememberMe)}/>
                        <label htmlFor="" className="login__check-label">Remember me</label>
                    </div> */}
                </div>

                <div className='login__buttons'>
                    <button className="login__button" disabled={loading}>Sign Up</button>
                    <a href="#" className="login__forgot">Forgot Password?</a>
                    <p className='login__already'>Already have an account? <Link to='/login' style={{textDecoration:'none', color:'#ff96de'}}><b>Log In</b></Link></p>
                </div>

                {error && <div className="error">{error}</div>}
            </form>
        </div>
    </div>
  )
}

export default Signup
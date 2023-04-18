import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import './Login.css'
import {BsFillEyeFill,BsFillEyeSlashFill} from 'react-icons/bs'
import { useLogin } from '../../hooks/useLogin'

function Login() {

    const [eye, setEye] = useState(false);
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const {login, error, loading} = useLogin()

    const handleLogin = async (e) => {
        e.preventDefault()
        console.log(email,password,rememberMe)
        await login(email, password, rememberMe)
    } 

  return (
    <div className="container">
        <div className="login__content">
            {/* <img src="https://assets.codepen.io/7773162/4kNYC.jpeg" alt="login image" class="login__img" /> */}

            <form className="login__form" onSubmit={handleLogin}>
                <div>
                    <h1 className="login__title">
                        <span>Welcome</span> Back!
                    </h1>
                    <p className="login__description">
                        Please Login to continue.
                    </p>
                </div>

                <div>
                    <div className="login__inputs">
                        <div>
                            <label htmlFor="" className="login__label">Email</label>
                            <input type="email" autoComplete='off' placeholder="Enter your email address" required className="login__input" onChange={(e) => setEmail(e.target.value)} value={email} autoFocus/>
                        </div>

                        <div>
                            <label htmlFor="" className="login__label">Password</label>

                            <div className="login__box">
                                <input type={!eye ? 'password' : 'text'} autoComplete='off' placeholder="Enter your password" required className="login__input" id="input-pass" onChange={(e) => setPassword(e.target.value)} value={password}/>
                                <i className="ri-eye-off-line login__eye" id="input-icon" onClick={() => setEye(!eye)}>{eye ? <BsFillEyeFill/> : <BsFillEyeSlashFill />}</i>
                            </div>
                        </div>
                    </div>

                    <div className="login__check">
                        <input type="checkbox" autoComplete='off' className="login__check-input" value={rememberMe} onChange={(e) => setRememberMe(!rememberMe)}/>
                        <label htmlFor="" className="login__check-label">Remember me</label>
                    </div>
                </div>

                <div className='login__buttons'>
                    <button className="login__button" disabled={loading}>Log In</button>
                    <a href="#" className="login__forgot">Forgot Password?</a>
                    <p className='login__already'>Create new account. <Link to='/signup' style={{textDecoration:'none', color:'#ff96de'}}><b>Sign Up</b></Link></p>
                </div>

                {error && <div className="error">{error}</div>}
            </form>
        </div>
    </div>
  )
}

export default Login
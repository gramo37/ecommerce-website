import React, { useEffect, useRef, useState } from 'react'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/Lock';
import FaceIcon from '@mui/icons-material/Lock';
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, signinUser } from "../../actions/userAction"
import './loginSignup.css'
import { useNavigate } from 'react-router';
import { useAlert } from "react-alert";
import Loader from '../Loader/Loader';
import Navbar from '../Navbar/Navbar';
import { useLocation } from 'react-router-dom';

const LoginSignup = () => {

    // Variables
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [user, setuser] = useState(
        {
            name: "",
            email: "",
            password: "",
        }
    )

    const search = useLocation().search;
    let redirect = new URLSearchParams(search).get('redirect');

    const [avatar, setavatar] = useState()
    const [avatarPreview, setavatarPreview] = useState("/logo192.png")

    const { name, email, password } = user
    const alert = useAlert()
    let navigate = useNavigate();
    const loginTab = useRef(null)
    const registerTab = useRef(null)
    const switcherTab = useRef(null)
    const dispatch = useDispatch()

    // useSelectors
    const userDetails = useSelector(
        (state) => state.user
    )

    useEffect(() => {
        if (userDetails.error) {
            // dispatch(clearUserError())
            return alert.error(userDetails.error.message);
        }
        if (!userDetails.isAuthenticated && redirect === "checkout") {
            navigate("/login")
        }
        else if (userDetails.isAuthenticated && redirect === "checkout") {
            console.log(redirect)
            navigate('/checkout')
        }
        else if (userDetails.isAuthenticated && redirect === null) {
            navigate('/profile')
        }
    }, [dispatch, userDetails.isAuthenticated, userDetails.error, alert])

    // Form switching code
    const switchTabs = (e, tab) => {
        if (tab === 'login') {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm")
            loginTab.current.classList.remove("shiftToLeft")
        }

        if (tab === 'signup') {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm")
            loginTab.current.classList.add("shiftToLeft")
        }
    };

    // Functions
    const loginSubmit = async (e) => {
        e.preventDefault()
        await dispatch(loginUser(loginEmail, loginPassword))
    }
    const signinSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        // Call the compress function compressImg()

        dispatch(signinUser(name, email, password, avatar))

    }
    const registerDataChange = (e) => {
        // If avatar is uploaded
        // console.log(e.target.files[0])
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setavatarPreview(reader.result);
                    setavatar(reader.result)
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        }
        else {
            setuser({ ...user, [e.target.name]: e.target.value })
        }
    }

    return (
        <>
            <Navbar showFilter={false} />
            {!userDetails.loading ? <div className="loginSignupContainer">
                <div className="loginSignupBox">
                    <div>
                        <div className="login_signup_toggle">
                            <p onClick={(e) => switchTabs(e, "login")}>Login</p>
                            <p onClick={(e) => switchTabs(e, "signup")}>SignUp</p>
                        </div>
                        <button ref={switcherTab}></button>
                    </div>
                    <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                        <div className="loginEmail">
                            <MailOutlineIcon />
                            <input
                                type="email"
                                required
                                placeholder='Email'
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div className='loginPassword'>
                            <LockIcon />
                            <input
                                type="password"
                                placeholder='Password'
                                required
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>
                        <div className='forgotPassword'><Link to="/forgotPassword" id="">Forgot Password ?</Link></div>
                        <input type="submit" value="Login" className='loginBtn btn-sm btn-primary' />
                    </form>
                    <form className='signupForm' ref={registerTab} onSubmit={signinSubmit} encType="multipart/form-data" onChange={registerDataChange}>
                        <div className="signupName">
                            <FaceIcon />
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder='Name'
                            />
                        </div>
                        <div className="loginEmail">
                            <MailOutlineIcon />
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder='Email'
                            />
                        </div>
                        <div className='loginPassword'>
                            <LockIcon />
                            <input
                                type="password"
                                name="password"
                                placeholder='Password'
                                required
                            />
                        </div>
                        {/* Image Logic */}
                        <div className="registerImage">
                            <img src={avatarPreview} alt="Avatar Preview" />
                            <input
                                id="img-input"
                                type="file"
                                name="avatar"
                                accept='image/*'
                            />
                        </div>
                        <input type="submit" value="Signup" className='signinBtn btn-sm btn-primary' />
                    </form>
                </div>
            </div> : <Loader />}
        </>
    )
}

export default LoginSignup

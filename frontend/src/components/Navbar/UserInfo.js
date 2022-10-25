import React, { useEffect } from 'react'
import "./userInfo.css"
import { logoutUser } from '../../actions/userAction';
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const UserInfo = ({ user }) => {

    const alert = useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {

    }, [])

    const logout = () => {
        if (window.confirm("Are you sure you want to Logout?") == true) {
            dispatch(logoutUser())
            alert.success("Logout successfully")
            navigate("/products")
          } else {
            console.log("Logout Fail");
          }
        
    }

    return (
        <>
            <div className="nav-item dropdown HeaderOptionContainer">
                <a className="nav-link dropdown-toggle p-0" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {/* <AccountBoxIcon /> */}
                    <Avatar
                        sx={{ bgcolor: deepOrange[500] }}
                        alt={user.user.user.name}
                        src={user.user.user.avatar.url}
                        sx={{ width: 25, height: 25 }}

                    />
                </a>
                <h6>Profile</h6>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    {user.user.user.role === "admin" && <li><Link className="dropdown-item" to="/dashboard">Dashboard</Link></li>}
                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                    <li><Link className="dropdown-item" to="/orders">Orders</Link></li>
                    {/* <li><Link className="dropdown-item" to="/cart">Your Cart</Link></li> */}
                    <li><hr className="dropdown-divider" /></li>
                    <li onClick={() => logout()} className='btn btn-danger mx-3'>Logout</li>
                </ul>
            </div>
        </>
    )
}

export default UserInfo

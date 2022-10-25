import { Avatar } from '@mui/material'
import React from 'react'
import { Link } from "react-router-dom";
import './navbar.css'

const HeaderOption = (props) => {
    
    return (
        <>
        <Link to={props.linkTo?props.linkTo:"/"} style={{textDecoration: "none"}} >
        <div className="HeaderOptionContainer" onClick={props.onClick}>
            {props.Icon && <props.Icon className="HeaderOptionIcon" />}
            {props.avatar && <Avatar src="/broken-image.jpg" sx={{ width: 25, height: 25 }} className="HeaderOptionIcon" />}
            <h6>{props.title}</h6>
        </div>
        </Link>
        </>
    )
}

export default HeaderOption

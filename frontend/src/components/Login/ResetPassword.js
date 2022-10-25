import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom"
import Navbar from '../Navbar/Navbar';
import { useSelector, useDispatch } from 'react-redux'; 
import {resetPassword} from "../../actions/userAction";
import {useAlert} from "react-alert";
import {loadUser} from "../../actions/userAction"

const ResetPassword = () => {

    const alert = useAlert()
    const navigate = useNavigate()
    const[newPassword, setNewPassword] = useState("")
    const[confirmPassword, setConfirmPassword] = useState("")
    const dispatch = useDispatch();

    const resetPasswordReducer = useSelector((state)=>state.resetPassword)
    let { token } = useParams();

    useEffect(async ()=>{
        if(!resetPasswordReducer.loading && resetPasswordReducer.error) {
            alert.error(resetPasswordReducer.error.message)
        }

        else if(!resetPasswordReducer.loading && resetPasswordReducer.message.success) {
            alert.success("Password Successfully changed")
            await dispatch(loadUser())
            navigate("/profile")
        }
    }, [resetPasswordReducer])

    const resetPasswordSubmit = (e) => {
        e.preventDefault()
        dispatch(resetPassword(token, newPassword, confirmPassword))
    }

    return (
        <>
            <Navbar />
            <h1 className='text-center my-2'>Reset your Password</h1>
            <form className='container' onSubmit={resetPasswordSubmit}>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">New Password</label>
                    <input type="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
                    <input type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} className="form-control" id="exampleInputPassword2" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
};

export default ResetPassword;

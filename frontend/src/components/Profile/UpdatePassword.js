import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../actions/userAction';
import { useAlert } from "react-alert";
import Loader from '../Loader/Loader';

const UpdatePassword = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const alert = useAlert()
    const [updateSuccessful, setUpdateSuccessful] = useState(false)

    const userDetails = useSelector(
        (state) => state.user
    )

    const [userPassword, setUserPassword] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    useEffect(() => {
        if (userDetails.error && !userDetails.loading) {
            setUpdateSuccessful(false)
            return alert.error(userDetails.error.message)
        }
        else if (userDetails.user.success && updateSuccessful && !userDetails.loading && !userDetails.error) {
            navigate("/profile")
            return alert.success("Successfully Updated")
        }
    }, [userDetails])

    const updatePassword = async (e) => {
        e.preventDefault()
        setUpdateSuccessful(true)
        await dispatch(changePassword(userPassword))
    }

    const handleChange = (e) => {
        setUserPassword({ ...userPassword, [e.target.name]: e.target.value })
    }

    return (
        <>
            {userDetails.loading ? <Loader /> : <><Navbar />
                <h1 className="text-center m-2">Change Password</h1>
                <div className="container">
                    <form onSubmit={updatePassword} onChange={handleChange}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Current Password</label>
                            <input type="password" className="form-control" id="exampleInputEmail1" name="currentPassword" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">New Password</label>
                            <input type="password" className="form-control" name="newPassword" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" name="confirmPassword" id="exampleInputPassword2" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div></>}
        </>
    )
};

export default UpdatePassword;

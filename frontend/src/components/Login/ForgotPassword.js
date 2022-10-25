import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { sendMail } from "../../actions/userAction"
import { useAlert } from 'react-alert';
import Loader from '../Loader/Loader';

const ForgotPassword = () => {

    const alert = useAlert()

    const [email, setEmail] = useState("")

    const forgotPassword = useSelector((state) => state.forgotPassword)

    console.log(forgotPassword)

    useEffect(()=>{
        if(!forgotPassword.loading && forgotPassword.error) {
            // console.log(forgotPassword.error.message)
            return alert.error(forgotPassword.error.message)
        }
        if(!forgotPassword.loading && forgotPassword.message) {
            console.log(forgotPassword.message.message)
            return alert.success(forgotPassword.message.message)
        }
    }, [forgotPassword.loading])

    const dispatch = useDispatch()

    const recoverPassword = (e) => {
        e.preventDefault()
        dispatch(sendMail(email))
    }

    return (
        <>
        {forgotPassword.loading ? <Loader /> : <>
            <Navbar />
            <div className="container">
                <h3 className='text-center my-2'>Please enter your Email for Password Recovery</h3>
                <form onSubmit={recoverPassword}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>}
            
        </>
    )

};

export default ForgotPassword;

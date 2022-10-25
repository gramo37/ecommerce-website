import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from "../../actions/userAction";
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import Navbar from '../Navbar/Navbar';
import Loader from '../Loader/Loader';

const EditProfile = () => {

  const userDetails = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert()
  const [updateSuccessful, setUpdateSuccessful] = useState(false)

  const [avatar1, setavatar] = useState()
  const [avatarPreview, setavatarPreview] = useState("")

  const [user, setuser] = useState({
    name: "",
    email: ""
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

  useEffect(() => {
    setuser({
      name: userDetails.user.user.name,
      email: userDetails.user.user.email
    })
    setavatarPreview(userDetails.user.user.avatar.url)
  }, [])

  try {


    const submitUserDetails = async (e) => {
      e.preventDefault();
      if (avatar1 === undefined) {
        setUpdateSuccessful(true)
        await dispatch(updateUserProfile(user.name, user.email, ""))
      }
      else {
        setUpdateSuccessful(true)
        await dispatch(updateUserProfile(user.name, user.email, avatar1))
      }
    }
    const editUserDetails = (e) => {
      e.preventDefault();
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
        {userDetails.loading ? <Loader /> : <><Navbar />
        <h1 className='text-center m-2'>Change Profile</h1>
        <div className="container">
          <form onChange={editUserDetails} onSubmit={submitUserDetails}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Name:</label>
              <input type="text" name="name" value={user.name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
              <input type="text" name="email" value={user.email} className="form-control" id="exampleInputPassword1" />
            </div>
            <div>
              <label htmlFor="exampleInputPassword1" className="form-label">Avatar</label>
              <img width={"100px"} height={"100px"} src={avatarPreview} alt="Avatar Preview" />
              <input
                type="file"
                name="avatar"
                accept='image/*'
              />
            </div>
            <button type="submit" className="btn btn-primary m-2" >Submit</button>
          </form>
        </div></>}
      </>)
  } catch (error) {
    return (
      <>
        <Navbar />
        <Loader />
      </>
    )
  }


};

export default EditProfile;




//Problems
// 1. Error while Refresh
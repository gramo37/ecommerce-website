import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import FaceIcon from '@mui/icons-material/Lock';
import { Country, State } from "country-state-city";
import { useDispatch, useSelector } from "react-redux"
import { useAlert } from "react-alert";
import CheckoutStepper from './CheckoutStepper';
import './checkout.css'
import {saveShippingInfo} from '../../actions/productAction'
import { useNavigate } from 'react-router-dom';

const Checkout = () => {

  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()
  const { shippingInfo } = useSelector((state) => state.cart)

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const checkOut = async (e) => {
    e.preventDefault()
    if(phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone Number Should be 10 digit")
      return
    }
    await dispatch(saveShippingInfo({ address, city, state, country, pinCode, phoneNo }))
    navigate("/confirmOrder")
  }

  return (
    <>
      <Navbar />
      <CheckoutStepper activeStep={0}/>
      <h1 className='text-center my-2'>Your Shipping Info</h1>
      <form className='loginForm container' encType="multipart/form-data" onSubmit={checkOut}>
        <div className="signupName">
          <FaceIcon />
          <input
            type="text"
            name="name"
            required
            placeholder='Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="signupName">
          <FaceIcon />
          <input
            type="text"
            name="name"
            required
            placeholder='City'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="signupName">
          <FaceIcon />
          <select
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">Country</option>
            {
              Country && Country.getAllCountries().map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))
            }
          </select>
        </div>

        {country && (
          <div className="signupName">
            <FaceIcon />
            <select
              required
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="">State</option>
              {
                State && State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))
              }
            </select>
          </div>
        )}

        <div className="signupName">
          <FaceIcon />
          <input
            type="text"
            name="name"
            required
            placeholder='Pincode'
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
          />
        </div>
        <div className="signupName">
          <FaceIcon />
          <input
            type="text"
            name="name"
            required
            placeholder='Phone No'
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
        </div>
        <input type="submit" value="Continue" className='signinBtn btn-sm btn-primary' />
      </form>
    </>
  )
};

export default Checkout;

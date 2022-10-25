import React, { useRef } from 'react';
import Navbar from '../Navbar/Navbar';
import CheckoutStepper from './CheckoutStepper';
import { Typography } from '@mui/material';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from 'react-redux';
import "./payment.css";
import axios from "axios"
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import {createOrder} from "../../actions/orderAction"

const Payment = () => {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const orderInfo = JSON.parse(sessionStorage.getItem("OrderInfo"));
  const alert = useAlert()
  const payBtn = useRef(null)
  const stripe = useStripe()
  const elements = useElements()
  const { shippingInfo, cartItems } = useSelector((state) => state.cart)
  const navigate = useNavigate()

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100)  // Convert Rs to Paise
  }

  const submitPaymentForm = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/v4/payment",
        paymentData,
        config
      )

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country
            }
          }
        }
      });

      if (result.error) {
        payBtn.current.disabled = false;
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          // Create Order here
          const input_data = {
            shippingInfo: {
              address: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              country: shippingInfo.country,
              pinCode: shippingInfo.pinCode,
              phoneNo: shippingInfo.phoneNo
            },
            orderItems: cartItems,
            paymentInfo: {
              id: client_secret,
              status: "paid"
            },
            itemPrice: orderInfo.subtotal,
            taxPrice: orderInfo.tax,
            shippingPrice: orderInfo.shippingCharges,
            totalPrice: orderInfo.totalPrice,
            orderStatus: "Payment Done"
          }
          console.log(input_data);
          await dispatch(createOrder(input_data))
          navigate("/payment/success")
        }
        else {
          alert.error("There is some issue while processing payment.")
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error)
    }

  }

  return (
    <>
      <Navbar />
      <CheckoutStepper activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitPaymentForm(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className='paymentInput' />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className='paymentInput' />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className='paymentInput' />
          </div>
          <input
            type="submit"
            value={`Pay - ${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className='paymentFormBtn btn btn-primary'
          />
        </form>
      </div>
    </>
  )
};

export default Payment;
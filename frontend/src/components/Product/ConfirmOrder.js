import React from 'react';
import Navbar from '../Navbar/Navbar';
import CheckoutStepper from './CheckoutStepper';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import "./confirmOrder.css"
import Loader from '../Loader/Loader';
import { useNavigate } from 'react-router-dom';

const ConfirmOrder = () => {

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user)

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price, 0
    )

    const navigate = useNavigate()

    const capitalize = (letter) => {
        return (letter[0].toUpperCase() + letter.substring(1))
    }

    const proceedToPayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice
        }

        // Store all price related data in session storage
        sessionStorage.setItem("OrderInfo", JSON.stringify(data))

        navigate("/payment")
    }

    const shippingCharges = subtotal > 1000 ? 0 : 200;

    const tax = subtotal * 0.18

    const totalPrice = subtotal + shippingCharges + tax

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
    try {
        return (
            <>
                <Navbar />
                <CheckoutStepper activeStep={1} />
                <div className="confirmOrderPage">
                    <div>
                        <div className="confirmShippingAreaBox">
                            <div>
                                <p><b>Name:</b></p>
                                <span>{user.user.user.name && user.user.user.name}</span>
                            </div>
                            <div>
                                <p><b>Phone:</b></p>
                                <span>{shippingInfo.phoneNo}</span>
                            </div>
                            <div>
                                <p><b>Address:</b></p>
                                <span>{address}</span>
                            </div>
                        </div>
                        <div className='confirmCartItems'>
                            <Typography >
                                Your Cart Items:
                            </Typography>
                            <div className="confirmCartItemsContainer">
                                {cartItems &&
                                    cartItems.map((item) => (
                                        <>
                                            <div>
                                                <img src={`${item.image}`} alt="" />
                                                {/* <img src={require(`${item.image}`)} alt="" /> */}
                                                <Link to={`/product/${item.product}`}>{capitalize(item.name)}</Link>
                                                <span>
                                                    {item.quantity} X {item.price} = <b>Rs {item.price * item.quantity}</b>
                                                </span>
                                            </div>
                                        </>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="orderSummary">
                            <Typography >
                                <b>Order Summary</b>
                            </Typography>
                            <div>
                                <div>
                                    <p>Subtotal</p>
                                    <span>Rs{subtotal}</span>
                                </div>
                                <div>
                                    <p>Shipping Charges:</p>
                                    <span>Rs{shippingCharges}</span>
                                </div>
                                <div>
                                    <p>GST:</p>
                                    <span>Rs{tax}</span>
                                </div>
                            </div>
                            <div className="orderSummaryTotal">
                                <div>
                                    <p>
                                        <b>Total:</b>
                                    </p>
                                    <span>Rs{totalPrice}</span>
                                </div>
                            </div>
                            <button onClick={proceedToPayment} className='btn btn-primary my-2'>Proceed To Payment</button>
                        </div>
                    </div>
                </div>
            </>
        )
    } catch (error) {
        console.log(error);
        return (
            <>
                <Navbar />
                <Loader />
            </>
        )
    }

};

export default ConfirmOrder;

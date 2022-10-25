import React from 'react';
import "./order.css";
import {Link} from "react-router-dom"
import { Translate } from '@mui/icons-material';

const OrderItem = (props) => {

    const { shippingInfo, paymentInfo, itemPrice, _id, createdAt, paidAt, orderItems, orderStatus, totalPrice, shippingPrice, taxPrice } = props.order;

    return (
        <>
            <div className="orderContainer">
                <div className={`card-header orderContainer-header`}>
                    <div>Order Status: {orderStatus}</div>
                    <div>Order Date: {String(createdAt).substr(0, 10)}</div>
                </div>
                <div className="orderInfoContainer">
                    <div className="orderInfoContainer">
                        {orderItems.map((order, index) => (
                            <>
                                <div className="orders">
                                    <div className="orders-left">
                                        {/* Product Image: {order.image} */}
                                        {/* <img src="" alt="" /> */}
                                        <img src={`${order?.image}`} alt="" />
                                    </div>
                                    <div className="orders-right">
                                        Product Id: {order.product}<br />
                                        Product Name: {order.name}<br />
                                        Product Price: {order.price}<br />
                                        Product Quantity: {order.quantity}<br />
                                    </div>
                                </div>
                            </>
                        ))}
                        {/* <Link to={`${_id}`} className="btn-sm my-2 btn-primary" role="button">Order Info</Link> */}
                        <Link to={`${_id}`} ><button className='btn-sm btn-primary my-2' style={{
                            position: "relative",
                            left: "50%",
                            transform: "translate(-50%, 0%)"
                        }}>OrderInfo</button></Link>
                    </div>
                </div>
            </div>
        </>
    )
};

export default OrderItem;

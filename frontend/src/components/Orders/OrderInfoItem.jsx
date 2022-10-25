import React from 'react'

const OrderInfoItem = ({ data }) => {
    
    const {createdAt, itemPrice, orderStatus, paidAt, paymentInfo, shippingInfo, shippingPrice, taxPrice, totalPrice} = data;
    console.log(data);
    console.log(data.orderItems);
    // console.log(data.paymentInfo);
    console.log(data.shippingInfo);
    console.log(orderStatus, paidAt, paymentInfo, shippingInfo, shippingPrice, taxPrice, totalPrice);

    return (
        <div>
            <div>
                {data.orderItems.map((item)=>{
                    return (
                    <div style={{border: "2px solid red"}}>
                        <img src={item?.image} alt="Product Image" /> <br />
                        {item?.name} <br />
                        {item?.price} <br />
                        {item?.product} <br />
                        {item?.quantity} <br />
                    </div>)
                })}
            </div>
            {itemPrice}<br /> {createdAt}<br /> {orderStatus}<br /> {paidAt}<br /> {shippingPrice}<br /> {taxPrice}<br /> {totalPrice}<br />
            <div style={{border: "2px solid red"}}>
                {data.shippingInfo.address} <br />
                {data.shippingInfo.city} <br />
                {data.shippingInfo.country} <br />
                {data.shippingInfo.phoneNo} <br />
                {data.shippingInfo.pinCode} <br />
                {data.shippingInfo.state} <br />
            </div>
        </div>
    )
}

export default OrderInfoItem
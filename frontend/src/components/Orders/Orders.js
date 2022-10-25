import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { useSelector, useDispatch } from 'react-redux';
import { getOrders } from '../../actions/orderAction';
import Loader from "../Loader/Loader"
import OrderItem from './OrderItem';

const Orders = () => {

    const dispatch = useDispatch()

    const order = useSelector((state)=> state.orders)
    
    if(!order.loading) {
        console.log(order?.orders?.orders)
    }

    useEffect(async ()=>{
        await dispatch(getOrders())
    }, [])

    try {
        return (
            <div>
                <Navbar />
                 {(!order.loading && order?.orders?.orders !== undefined) ? (
                     <>
                        <div className='container my-2'>
                            <h1 className='mx-2 text-center'>Your Orders</h1>
                            {order?.orders?.orders.map((item, index)=>(
                                <OrderItem key={item._id} index={index} order={item} />
                            ))}
                        </div>
                     </>
                 )
                 
                 : <Loader />}
            </div>
        )
    } catch (error) {
        console.log(error);
        <Loader />
    }

    
}

export default Orders

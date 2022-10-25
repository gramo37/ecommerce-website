import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { getOrderById } from '../../actions/orderAction';
import Navbar from '../Navbar/Navbar';
import Loader from '../Loader/Loader';
import OrderInfoItem from './OrderInfoItem';

const OrderInfo = () => {
  let { id } = useParams();
  // const [data, setData] = useState({});

  const dispatch = useDispatch()
  const order = useSelector((state) => state.orderInfo)

  useEffect(async () => {
    await dispatch(getOrderById(id));
  }, [])

  useEffect(() => {
    console.log(order);
  }, [order])


  return (
    <div>
      <Navbar />
      {(!order.loading && order?.orderInfo?.order) ? (
        <>
          <OrderInfoItem data={order?.orderInfo?.order} />
        </>
      )

        : <Loader />}
    </div>
  )
}

export default OrderInfo
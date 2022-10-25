import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import CartItem from './CartItem';
import "./cart.css";
import { removeItem } from '../../actions/productAction';
import { Link } from 'react-router-dom';

const Cart = () => {

    const cart = useSelector(
        (state) => state.cart
    )
    const dispatch = useDispatch()

    const [totalPrice, settotalPrice] = useState(0);
    const removeItemPressed = (id) => {
        dispatch(removeItem(id))
    }

    useEffect(() => {
        let temp = 0;
        cart?.cartItems?.map((i) => {
            temp += (i.price * i.quantity)
        })
        settotalPrice(temp)
    }, [dispatch, cart.cartItems])
    return (
        <>
            <Navbar />
            {cart?.cartItems?.length === 0 ?
                <div className='container noItemsCart'>
                    <p className='text-center'>No items in cart. </p>
                    <Link to="/products">Continue shopping</Link>
                </div>
                : <><h2 className='text-center m-2'>Your Cart</h2>

                    <table class="container table table-light table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Sr No</th>
                                <th scope="col">Image</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                                <th scope="col">Sub-Total</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart?.cartItems?.map((i, index) =>
                                <CartItem removeItem={removeItemPressed} item={i} index={index + 1} />
                            )}
                            <tr>
                                <th scope="row">Total Price</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>{totalPrice}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button className='btn btn-primary checkOutButton'><Link to="/login?redirect=checkout">Check Out</Link></button>
                </>}
        </>
    )
};

export default Cart;

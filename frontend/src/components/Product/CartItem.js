import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProductDetails, editQuantity } from '../../actions/productAction';
import "./cart.css";

const CartItem = (props) => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)

    const { name, quantity, price, product } = props.item;

    useEffect(async ()=>{
        await dispatch(getProductDetails(product))
    }, [])

    const [cartquantity, setCartquantity] = useState(quantity);

    const increaseQuantity = () => {
        if (cartquantity >= productDetails.product.stock) return
        let qty = cartquantity + 1
        setCartquantity(qty)
        dispatch(editQuantity(qty, product))
    }

    const decreaseQuantity = () => {
        if (cartquantity <= 1) return
        let qty = cartquantity - 1
        setCartquantity(qty)
        dispatch(editQuantity(qty, product))
    }

    return (
        <>
            <tr className='cartItemContainer'>
                <th scope="row">{props.index}</th>
                <td><img width={"70px"} height={"70px"} src={`${props.item?.image}`} /></td>
                {/* <td><img width={"70px"} height={"70px"} src={require(`${props.item?.image}`)} /></td> */}
                <td>{name}</td>
                <td>
                    <div className="detailsblock-3-1-1">
                        <button className='btn btn-primary m-2' disabled={cartquantity <= 1 ? true : false} onClick={decreaseQuantity}>-</button>
                        <input type="number" style={{ width: "50px" }} className='form-control cartQuantity' readOnly value={cartquantity} />
                        <button className='btn btn-primary m-2' disabled={cartquantity >= productDetails.product?.stock ? true : false} onClick={increaseQuantity}>+</button>
                    </div>
                </td>
                <td>{price}</td>
                <td>{price * quantity}</td>
                <td><button className='btn btn-danger' onClick={() => props.removeItem(product)}>Remove</button></td>
            </tr>
        </>
    )
};

export default CartItem;
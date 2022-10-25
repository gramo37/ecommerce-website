import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { getProductDetails } from '../../actions/productAction'
import { useDispatch, useSelector } from "react-redux"
import ReactStars from 'react-stars';
import { useParams } from "react-router-dom"
import '../../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css'
import './Product.css'
import ProductReviews from './ProductReviews';
import { useAlert } from "react-alert";
import Loader from '../Loader/Loader';
import Navbar from '../Navbar/Navbar';
import { addToCart } from "../../actions/productAction"

const ProductDetailsContainer = () => {

    const alert = useAlert();
    const [quantity, setQuantity] = useState(1);
    const [quantityInCart, setquantityInCart] = useState(0)

    let { id } = useParams();
    const dispatch = useDispatch();

    const { loading, error, product } = useSelector(
        (state) => state.productDetails
    )

    const cart = useSelector(
        (state) => state.cart
    )

    useEffect(() => {
        dispatch(getProductDetails(id))
        cart?.cartItems?.map((item) => {
            if (item.product === id) {
                setQuantity(item.quantity)
                setquantityInCart(item.quantity)
            }
        })
    }, [])

    useEffect(() => {
        if (error) {
            return alert.error(error);
        }
        dispatch(getProductDetails(id))
        cart?.cartItems?.map((item) => {
            if (item.product === id) {
                setQuantity(item.quantity)
                setquantityInCart(item.quantity)
            }
        })
    }, [dispatch, id, error, alert, cart])

    const options = {
        edit: false,
        color: "yellow",
        activeColor: "orange",
        size: window.innerWidth < 600 ? 20 : 25,
        value: Number(product.ratings),
        isHalf: true
    }

    const increaseItems = () => {
        if (product.stock <= quantity) return
        let qty = quantity + 1
        setQuantity(qty)
    }

    const decreaseItems = () => {
        if (quantity <= 1) return
        let qty = quantity - 1
        setQuantity(qty)
    }

    const addToCartSubmit = async () => {
        console.log(quantity, product);
        await dispatch(addToCart(quantity, product))
        alert.success("Items added to the cart successfully")
    }

    return (
        <>
            <Navbar showFilter={false} />

            {loading ? <Loader /> : <div>
                <div className='productDetails'>
                    <div className="left-details">
                        <Carousel>
                            {product.images && product.images.map((item, i) => (
                                <img className="Carousel-image" key={item.url} src={`${item.url}`} alt={`${i} Slide`} />
                                // <img className="Carousel-image" key={item.url} src={require(`${item.url}`)} alt={`${i} Slide`} />
                            ))}
                        </Carousel>
                    </div>
                    <div className="right-details">
                        <div className="detailsblock-1">
                            <h2>{product.name}</h2>
                            <p>Product # {product._id}</p>
                        </div>
                        <div className="detailsblock-2">
                            <ReactStars {...options} />
                            <span>{product.noOfReviews} Reviews</span>
                        </div>
                        <div className="detailsblock-3">
                            <h1>{`${product.price} Rs`}</h1>
                            <div className="detailsblock-3-1">
                                <div className="detailsblock-3-1-1">
                                    <button className='btn btn-primary m-2' disabled={quantity <= 1 ? true : false} onClick={decreaseItems}>-</button>
                                    <input type="number" className='form-control m-2' readOnly value={quantity} />
                                    <button className='btn btn-primary m-2' disabled={product.stock <= quantity ? true : false} onClick={increaseItems}>+</button>
                                </div>
                                {quantityInCart !== 0 && <p>You already have {quantityInCart} {product.name} in your cart</p>}
                                <button className='btn btn-primary' onClick={addToCartSubmit}>Add to Cart</button>
                            </div>
                            <p>
                                Status:
                                <b className={product.stock < 1 ? 'redcolor' : 'greencolor'}>
                                    {product.stock < 1 ? "Out of Stock" : "In Stock"}
                                </b>
                            </p>
                        </div>
                        <div className="detailsblock-4">
                            Description: <p>{product.description}</p>
                        </div>

                        <div><button className='submitreview btn btn-primary'>Submit Review</button></div>
                    </div>
                </div>
                <section className='reviewsSection'>
                    <h1 className='reviewHeading text-center'>Reviews</h1>
                    <div className="reviewsContainer">
                        {product.reviews && product.reviews[0] ? product.reviews.map((item, i) => (
                            <ProductReviews key={item.id} review={item} />
                        )) : (<div className='noReviews'>No reviews yet</div>)}
                    </div>
                </section>
            </div>}
        </>
    )
}

export default ProductDetailsContainer;

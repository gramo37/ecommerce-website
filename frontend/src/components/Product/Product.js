import React from 'react'
import {
    Link
} from "react-router-dom";
import ReactStars from 'react-stars';
import './Product.css'

const Product = (props) => {

    const product = props.product;

    const options = {
        edit: false,
        color: "yellow",
        activeColor: "orange",
        size: window.innerWidth < 600 ? 20 : 25,
        value: Number(product.ratings)/2,
        isHalf: true
    }

    return (
        <div className='product-card-holder'>
            <div className="card m-2" style={{width: "18rem"}}>
                {/* {product?.images[0]?.url && <img src={require(`${product?.images[0]?.url}`)} className="card-img-top" alt={product.name} />} */}
                {product?.images[0]?.url && <img src={`${product.images[0].url}`} className="card-img-top" alt={product.name} />}
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <div className="reviewBox"><ReactStars {...options}/> <span>{`${product.noOfReviews} Reviews`}</span></div>
                    <p className="card-text">{product.price} Rs</p>
                    <Link to={`/product/${product._id}`} className="btn btn-primary">Buy Now</Link>
                </div>
            </div>
        </div>
    )
}

export default Product

import React, { useEffect, useState } from 'react';
import './Home.css'
import { Link } from "react-router-dom";
import { getBestSellers } from '../../actions/productAction'
import { useDispatch, useSelector } from "react-redux"
import Product from '../Product/Product';
import { useAlert } from "react-alert";
import Loader from '../Loader/Loader';
import Navbar from '../Navbar/Navbar';

const Home = (props) => {

    const { price } = useSelector(
        (state) => state.price
    )
    const { category } = useSelector(
        (state) => state.categoryFilter
    )
    const { loading, error, products, productsCount } = useSelector(
        (state) => state.products
    )
    const {ratings} = useSelector(
        (state) => state.ratings
    )

    const alert = useAlert()
    const dispatch = useDispatch();
    let [currentPage, setcurrentPage] = useState(1)
    const productPerPage = 2
    const pageLimit = Math.ceil(productsCount / productPerPage)

    useEffect(() => {
        if (error) {
            return alert.error(error);
        }
        dispatch(getBestSellers("best sellers", currentPage, productPerPage, price, category, ratings))
    }, [dispatch, error, alert, currentPage, price, category, ratings])

    const prevPage = () => {
        if (currentPage > 1) {
            setcurrentPage(currentPage - 1)
            dispatch(getBestSellers("best sellers", currentPage, productPerPage, price, category, ratings))
        }
    }

    const nextPage = () => {
        setcurrentPage(currentPage + 1)
        dispatch(getBestSellers("best sellers", currentPage, productPerPage, price, category, ratings))
    }

    return (
        <>
            <Navbar />
            {loading ? <Loader /> : <div className="d-flex h-100 text-center text-white bg-dark homeContainer">
                <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column homeContent">
                    <main className="px-3">
                        <h1>Welcome to Gramokart</h1>
                        <p className="lead">Find Amazing products Below</p>
                        <p className="lead">
                            <Link to="/products" className="btn btn-lg btn-secondary fw-bold border-white bg-white" style={{ color: "black" }}>Shop Now</Link>
                        </p>
                    </main>
                </div>
            </div>}
            <div className="featuredCollection">
                <h1 className='text-center m-4'>BEST SELLERS</h1>

                <div className='container-fluid productContainer mt-2'>
                    {products && products.map((product) => {
                        return (<Product key={product._id} product={product} />)
                    })}
                </div>

                <div className="pageButton container">
                    <button className="btn btn-primary" disabled={currentPage === 1 ? true : false} onClick={prevPage}>Prev</button>
                    <button className="btn btn-primary" disabled={currentPage < pageLimit ? true : false} onClick={nextPage}>Next</button>
                </div>
                {props.navbar}
            {props.about}

            </div>
        </>
    )
}

export default Home

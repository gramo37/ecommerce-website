import React, { useEffect, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { getPriceFilter, getCategoryFilter, getRatingFilter } from '../../actions/productAction'
import { useDispatch, useSelector } from "react-redux"
import { getCategoryList } from '../../actions/productAction';
import FilterListSharpIcon from '@mui/icons-material/FilterListSharp';
import './filter.css'

const Filters = () => {

    const dispatch = useDispatch()
    const ref = useRef()

    const { price } = useSelector(
        (state) => state.price
    )
    const key = useSelector(
        (state) => state.category
    )
    const { category } = useSelector(
        (state) => state.categoryFilter
    )
    const { ratings } = useSelector(
        (state) => state.ratings
    )

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [isMenuOpen])

    useEffect(() => {
        if (key.error) {
            return alert.error(key.error);
        }
        dispatch(getCategoryList())
    }, [dispatch, key.error])

    const priceHandler = (event, newPrice) => {
        dispatch(getPriceFilter(newPrice))
    }

    const ratingHandler = (event, newRating) => {
        dispatch(getRatingFilter(newRating))
    }

    const categoryHandler = (event) => {
        console.log(event.target.value)
        dispatch(getCategoryFilter(event.target.value))
    };

    const capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    const showFilters = () => {
        setIsMenuOpen(oldstate => !oldstate)
    }
    return (
        <>
            <div ref={ref}>
                <div className="nav-item dropdown HeaderOptionContainer">
                    <a className="nav-link dropdown-toggle p-0 iconHolder" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => showFilters()}>
                        <FilterListSharpIcon />
                        <h6>Filters</h6>
                    </a>
                    <div className={isMenuOpen ? `filterContainer showFilter` : `filterContainer hideFilter`} >
                        <div>
                            <div className="filterBox">
                                <Typography>Price</Typography>
                                <Slider
                                    value={price}
                                    onChange={priceHandler}
                                    valueLabelDisplay='auto'
                                    aria-labelledby="range-slider"
                                    min={0}
                                    max={25000}
                                />
                            </div>
                            <div className="filterBox">
                                <Typography>Ratings</Typography>
                                <Slider
                                    value={ratings}
                                    onChange={ratingHandler}
                                    valueLabelDisplay='auto'
                                    aria-labelledby="range-slider"
                                    min={0}
                                    max={10}
                                />
                            </div>
                            <div className='m-3'>
                                <a className="nav-link dropdown-toggle p-0 mx-3" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => showFilters()}>
                                    <h6>Category</h6>
                                </a>
                                <select value={category} onChange={categoryHandler}>
                                    {key.category.category && key.category.category.map((item) => (
                                        <option key={item.id} value={item.category !== undefined ? item.category : "Food"}>{capitalize(item.category !== undefined ? item.category : "food")}</option>
                                    ))}

                                </select>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Filters

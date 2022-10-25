import React from 'react'
import ReactStars from 'react-stars';

const ProductReviews = (props) => {
    const options = {
        edit: false,
        color: "yellow",
        activeColor: "orange",
        size: window.innerWidth < 600 ? 20 : 25,
        value: Number(props.review.rating),
        isHalf: true
    }

    return (
        <div>

            <div className="card m-2">
                <div className="card-header">
                    <ReactStars {...options} />

                </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                        <p>{props.review.comment}</p>
                        <footer className="blockquote-footer">{props.review.name}</footer>
                    </blockquote>
                </div>
            </div>



        </div>
    )
}

export default ProductReviews

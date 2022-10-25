import React from 'react'
import loading from './loading.gif'

const Loader = () => {

    const loadStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // minHeight: "79vh",
        backgroundColor: "white",
        zIndex: 10
    }

    return (
        <div style={loadStyle}>
            <img src={loading} alt="Loading" />
        </div>
    )
}

export default Loader

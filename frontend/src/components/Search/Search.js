import React, {useState} from 'react'
import { useNavigate  } from "react-router-dom";

const Search = () => {
    
    let navigate = useNavigate ();
    const [keyword, setkeyword] = useState("")
    const onSearchClicked = (event) => {
        event.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/?keyword=${keyword}`)
            // navigate(`/products/${keyword}`)
        }
        else {
            navigate("/products")
        }
    }

    return (
        <div>
            <form className="d-flex">
                <input 
                type="search" 
                placeholder="Search a Product ..." 
                aria-label="Search"
                value = {keyword} 
                onChange={(event)=>setkeyword(event.target.value)}/>
                <button style={{display: "none"}} className="btn btn-outline-success" type="submit" onClick={(event)=>onSearchClicked(event)}>Search</button>
            </form>
        </div>
    )
}

export default Search

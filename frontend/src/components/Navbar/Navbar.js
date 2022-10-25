import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import UserInfo from './UserInfo';
import SearchIcon from '@mui/icons-material/Search'
import HeaderOption from './HeaderOption';
import logo from './linkedin.png'
import { Home } from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import Search from "../Search/Search"
import Filters from "../Filters/Filters"
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = (props) => {

    // Variables
    const dispatch = useDispatch();

    // useSelectors
    const key = useSelector(
        (state) => state.category
    )
    const userDetails = useSelector(
        (state) => state.user
    )

    // useEffect
    useEffect(() => {
        if (key.error) {
            return alert.error(key.error);
        }
    }, [dispatch, userDetails, key.error])

    // Functions

    return (
        <>
            <>
                <div className="header">
                    <div className="headerLeft">
                        <img src={logo} alt="linkedIn" />
                        <div className="headerSearch">
                            <SearchIcon />
                            <Search />
                            
                        </div>
                    </div>
                    <div className="headerRight">

                        <HeaderOption title="Home" Icon={Home} linkTo="/" />
                        <HeaderOption title="Products" Icon={ShoppingCartIcon} linkTo="/products" />
                        <HeaderOption title="About" Icon={InfoIcon} linkTo="/about" />
                        <HeaderOption title="Contact" Icon={PermContactCalendarIcon} linkTo="/contact" />
                        {userDetails.isAuthenticated && <UserInfo user={userDetails} />}
                        {!userDetails.isAuthenticated && <div className="nav-item">
                            <HeaderOption title="Login" linkTo="/login" avatar={true} />
                        </div>}
                        <HeaderOption title="Cart" Icon={ShoppingCartIcon} linkTo="/cart" />
                        
                        {props.showFilter && <Filters />}
                    </div>
                </div>

            </>
        </>
    )
}

export default Navbar;











{/* <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="\">GramoKart</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/products">Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/contact">Contact</Link>
                            </li>
                            
                            {!userDetails.isAuthenticated && <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/login">Login/SignUp</Link>
                            </li>} */}
{/* <li className="nav-item dropdown"> */ }
{/* {userDetails.isAuthenticated && <UserInfo user={userDetails} />} */ }
{/* <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#">Dashboard</a></li>
                                    <li><a className="dropdown-item" href="#">Account info</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/login">Logout</Link></li>
                                </ul> */}
{/* </li> */ }
// {userDetails.isAuthenticated && <UserInfo user={userDetails} />}
{/* <li className="nav-item">
                                {isAuthenticatedUser ? <Link className="nav-link active" aria-current="page" to="/login" onClick={() => logout()}>Logout</Link> : <Link className="nav-link active" aria-current="page" to="/login">Login</Link>}
                            </li> */}
        //                 </ul>
        //                 <Search />

        //             </div>
        //         </div>
        //     </nav>
        // </>
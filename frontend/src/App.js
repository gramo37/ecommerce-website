import './App.css';
import Footer from './components/Footer/Footer';
import About from './components/About/About'
import ProductContainer from './components/Product/ProductContainer';
import Contact from './components/Contact/Contact'
import Home from './components/Home/Home'
import WebFont from 'webfontloader';
import store from './store'
import { useSelector } from "react-redux";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import React from 'react';
import ProductDetailsContainer from './components/Product/ProductDetailsContainer';
import LoginSignup from './components/Login/LoginSignup';
import { loadUser } from './actions/userAction';
import Profile from './components/Profile/Profile';
import Dashboard from './components/Profile/Dashboard';
import Orders from './components/Orders/Orders';
import EditProfile from "./components/Profile/EditProfile"
import UpdatePassword from './components/Profile/UpdatePassword';
import ForgotPassword from './components/Login/ForgotPassword';
import ResetPassword from './components/Login/ResetPassword';
import Cart from './components/Product/Cart';
import Checkout from './components/Product/Checkout';
import ConfirmOrder from './components/Product/ConfirmOrder';
import Payment from './components/Product/Payment';
import OrderInfo from './components/Orders/OrderInfo';
import axios from 'axios';

function App() {

  const { user, isAuthenticated } = useSelector(state => state.user)

  const [stripeApiKey, setStripeApiKey] = React.useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v4/sendApiKey");

    setStripeApiKey(data.stripeApiKey)
  }

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
    // Get the user after refresh - very imp line
    store.dispatch(loadUser())
    
    getStripeApiKey();
  }, []);

  return (
    <Router>
      {/* {isAuthenticated && <UserInfo user={user}/>} */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/checkout" element={<Checkout />} />
        <Route exact path="/confirmOrder" element={<ConfirmOrder />} />
        {stripeApiKey && <Route exact path="/payment" element={
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Payment />
        </Elements>
        } />}
        <Route exact path="cart" element={<Cart />} />
        <Route path="api/v2/password/reset/:token" element={<ResetPassword />} />
        <Route exact path="/forgotPassword" element={<ForgotPassword />} />
        <Route exact path="editProfile" element={<EditProfile />} />
        <Route exact path="updatePassword" element={<UpdatePassword />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/orders" element={<Orders />} />
        <Route exact path="/orders/:id" element={<OrderInfo />} />
        <Route exact path="about" element={<About />} />
        <Route exact path="products" element={<ProductContainer />} />
        <Route exact path="product/:id/" element={<ProductDetailsContainer />} />
        <Route path="products/:keyword" element={<ProductContainer />} />
        <Route exact path="contact" element={<Contact />} />
        <Route exact path="login" element={<LoginSignup />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import Container from '../../../components/shared/Container';
import './Cart.css';
import CartItem from './CartItem';
import { fetchAndSetCartItems, fetchCartItemsStart, fetchCartItemsError, fetchCartItemsSuccess } from '../../actions/CartActions';
import Loader from '../../../components/shared/Loader';

const Cart = () => {
    const cartState = useSelector(state => state.cartItems.cart);
    const cartCount = useSelector(state => state.cartItems.cartCount);
    const cartTotal = useSelector(state => state.cartItems.totalAmount);
    const isCartItemLoading = useSelector(state => state.cartItems.isCartItemLoading);
    const dispatch = useDispatch();
    
    const fetchAndSetCardItems = () => {
        dispatch(fetchCartItemsStart());
        return (dispatch) => {
            axios.get('http://localhost:8000/cart').then(resp => {
                if (resp.data.length) {
                    dispatch(fetchAndSetCartItems(resp.data));
                    dispatch(fetchCartItemsSuccess());
                } else {
                    dispatch(fetchCartItemsError());
                }
            }).catch(error => {
                dispatch(fetchCartItemsError());
            })
        }
    }

    useEffect(() => {
        dispatch(fetchAndSetCardItems());
    }, []);
    return (
        <Container>
            <div className='shopping-cart'>
                <div className="row mt-3">
                    <div className="col-md-8 cart">
                        <div className="title">
                            <div className="row">
                                <div className="col">
                                    <h4><b>Shopping Cart</b></h4>
                                </div>
                                <div className="col align-self-center text-right text-muted">{cartCount} item(s)</div>
                            </div>
                        </div>
                        <div className="cart-item-list-wrapper">
                            {cartState.length === 0 && !isCartItemLoading && 
                            <div className="d-flex align-items-center justify-content-center">
                                <img className="empty-cart-img" src='image/empty-cart.png' alt="Empty cart" />
                            </div>}
                            { cartState.length === 0 && isCartItemLoading && <Loader height="100%"/>}
                            {cartState.length > 0 && !isCartItemLoading ? (
                                cartState.map(item => (
                                    <CartItem key={item.id} cartItem={item} />
                                ))
                            ) : ""}
                        </div>
                        <div className="back-to-shop">
                            <NavLink to="/products" className="mr-2">
                                <i className="fas fa-arrow-left"></i>
                            </NavLink><span className="text-muted">Back to shop</span></div>
                    </div>
                    <div className="col-md-4 summary">
                        <div>
                            <h5><b>Summary</b></h5>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col" style={{ paddingLeft: '0' }}>ITEMS </div>
                            <div className="col text-right">{cartCount}</div>
                        </div>
                        <form>
                            <p>SHIPPING</p> <select>
                                <option className="text-muted">Standard-Delivery- &euro;5.00</option>
                            </select>
                            <p>GIVE CODE</p> <input id="code" placeholder="Enter your code" />
                        </form>
                        <div className="row" style={{ borderTop: '1px solid rgba(0,0,0,.1)', padding: '2vh 0' }}>
                            <div className="col">TOTAL PRICE</div>
                            <div className="col text-right">$ {cartTotal}</div>
                        </div> <button className="btn">CHECKOUT</button>
                    </div>
                </div>

            </div>
        </Container>
    )
}
export default Cart;

import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { removeItemFromCart, increaseQuantity, decreaseQuantity } from '../../actions/CartActions';
import { toast } from 'react-toastify';

const CartItem = (props) => {
    const dispatch = useDispatch();
    const { cartItem } = props;

    // Method to remove card
    const handleRemoveItemFromCart = (item) => {
        return (dispatch) => {
            axios.delete(`http://localhost:8000/cart/${item.id}`).then(resp => {
                if (resp.status === 200) {
                    dispatch(removeItemFromCart(item));
                    toast.success("Item deleted successfully from cart !!", {
                        autoClose: 2000,
                        pauseOnHover: true,
                    });
                }
            }).catch(error => {
                toast.error("Error while deleting cart item", {
                    autoClose: 2000,
                    pauseOnHover: true,
                  });
            });
        }
    }
    return (
        <div className="row main align-items-center border-top border-bottom cart-image">
            <div className="col-2"><img className="img-fluid" src={cartItem.image} alt={cartItem.image} /></div>
            <div className="col">
                <div className="row text-muted">{cartItem.category}</div>
                <div className="row">{cartItem.title}</div>
            </div>
            <div className="col">
                <span className="fa fa-minus-circle pr-1 cursor-pointer" onClick={() => dispatch(decreaseQuantity(cartItem))}></span>
                <span className="border card-count">{cartItem.quantity}</span>
                <span className="fa fa-plus-circle pl-1 cursor-pointer" onClick={() => dispatch(increaseQuantity(cartItem))}></span>
            </div>
            <div className="col d-flex align-items-center justify-content-between">
                <div>$ {cartItem.price}</div>
                <span className="fa fa-times-circle cursor-pointer" onClick={() => dispatch(handleRemoveItemFromCart(cartItem))}></span>
            </div>
        </div>
    )
}
export default CartItem;
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Ratings from './Ratings';
import { Store } from '../Store';
import axios from 'axios';

export default function Product(props) {
   const { product } = props;

   const { state, dispatch: ctxDispatch } = useContext(Store);
   const {
      cart: { cartItems },
   } = state;

   const addToCartHandler = async (item) => {
      const existingCartItem = cartItems.find((x) => x._id === product._id);
      const quantity = existingCartItem ? existingCartItem.quantity + 1 : 1;
      const { data } = await axios.get(`/api/products/${item._id}`);
      if (data.countInStock < quantity) {
         window.alert('Sorry the product is out of stuck');
      } else {
         ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...item, quantity },
         });
      }
   };

   return (
      <Card>
         <Link to={`product/${product.slug}`}>
            <Card.Img variant="top" src={product.image} alt={product.name} />
         </Link>
         <Card.Body>
            <Link to={`product/${product.slug}`}>
               <Card.Title>{product.name}</Card.Title>
            </Link>
            <Ratings rating={product.rating} numReviews={product.numReviews} />
            <Card.Text>${product.price}</Card.Text>
            {product.countInStock === 0 ? (
               <Button variant="light" disabled>
                  Out of stock
               </Button>
            ) : (
               <Button
                  onClick={() => addToCartHandler(product)}
                  className="btn-primary"
               >
                  Add to cart
               </Button>
            )}
         </Card.Body>
      </Card>
   );
}

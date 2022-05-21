import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Ratings from './Ratings';

export default function Product(props) {
   const { product } = props;

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
            <Button className="btn-primary">Add to cart</Button>
         </Card.Body>
      </Card>
   );
}

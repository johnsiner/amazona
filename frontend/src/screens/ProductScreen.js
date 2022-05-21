import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useParams } from 'react-router-dom';
import Ratings from '../components/Ratings';
import { Helmet } from 'react-helmet-async';

const reducer = (state, action) => {
   switch (action.type) {
      case 'FETCH_REQUEST':
         return { ...state, loading: true };
      case 'FETCH_SUCCESS':
         return { ...state, product: action.payload, loading: false };
      case 'FETCH_FAILED':
         return { ...state, loading: false, error: action.payload };
      default:
         return state;
   }
};

export default function ProductScreen() {
   const params = useParams();
   const { slug } = params;

   const [{ loading, error, product }, dispatch] = useReducer(reducer, {
      loading: true,
      error: '',
      product: [],
   });

   useEffect(() => {
      const fetchData = async () => {
         dispatch({ type: 'FETCH_REQUEST' });
         try {
            const result = await axios.get(`/api/products/product/${slug}`);
            dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
         } catch (err) {
            dispatch({ type: 'FETCH_FAILED', payload: err.message });
         }
         // setProducts(result.data);
      };
      fetchData();
   }, [slug]);

   return loading ? (
      <div>...loading</div>
   ) : error ? (
      <div>{error}</div>
   ) : (
      <div>
         <Row>
            <Col md={6}>
               <img
                  className="img-large"
                  src={product.image}
                  alt={product.name}
               />
            </Col>
            <Col md={3}>
               <ListGroup variant="flush">
                  <ListGroup.Item>
                     <Helmet>
                        <title>{product.name}</title>
                     </Helmet>
                     <h1>{product.name}</h1>
                  </ListGroup.Item>
                  <ListGroup.Item>
                     <Ratings
                        rating={product.rating}
                        numReviews={product.numReviews}
                     />
                  </ListGroup.Item>
                  <ListGroup.Item>
                     Description:
                     <p>{product.description}</p>
                  </ListGroup.Item>
               </ListGroup>
            </Col>
            <Col md={3}>
               <Card>
                  <Card.Body>
                     <ListGroup variant="flush">
                        <ListGroup.Item>
                           <Row>
                              <Col>Price:</Col>
                              <Col>${product.price}</Col>
                           </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                           <Row>
                              <Col>Status:</Col>
                              <Col>
                                 {product.countInStock > 0 ? (
                                    <Badge bg="success">In Stock</Badge>
                                 ) : (
                                    <Badge bg="danger">Unavailable</Badge>
                                 )}
                              </Col>
                           </Row>
                        </ListGroup.Item>
                        {product.countInStock > 0 && (
                           <ListGroup.Item>
                              <div className="d-grid">
                                 <Button variant="primary">Add to cart</Button>
                              </div>
                           </ListGroup.Item>
                        )}
                     </ListGroup>
                  </Card.Body>
               </Card>
            </Col>
         </Row>
      </div>
   );
}

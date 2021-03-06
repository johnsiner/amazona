import React, { useState, useContext, useEffect } from 'react';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

export default function ShippingAddressScreen() {
   const navigate = useNavigate();

   const { state, dispatch: ctxDispatch } = useContext(Store);
   const {
      userInfo,
      cart: { shippingInfo },
   } = state;

   useEffect(() => {
      if (!userInfo) {
         navigate('/signin?redirect=/shipping');
      }
   }, [userInfo, navigate]);

   const [fullName, setFullname] = useState(shippingInfo.fullName || '');
   const [address, setAddress] = useState(shippingInfo.address || '');
   const [city, setCity] = useState(shippingInfo.city || '');
   const [postalCode, setPostalCode] = useState(shippingInfo.postalCode || '');
   const [country, setCountry] = useState(shippingInfo.country || '');

   const submitHandler = (event) => {
      event.preventDefault();
      ctxDispatch({
         type: 'SAVE_SHIPPING_ADDRESS',
         payload: {
            fullName,
            address,
            city,
            postalCode,
            country,
         },
      });
      localStorage.setItem(
         'shippingInfo',
         JSON.stringify({
            fullName,
            address,
            city,
            postalCode,
            country,
         })
      );
      navigate('/payment');
   };

   return (
      <div>
         <Helmet>
            <title>Shippping Address</title>
         </Helmet>
         <CheckoutSteps step1 step2 />
         <Container className="small-container">
            <h1 className="my-3">Shippping Address</h1>
            <Form onSubmit={submitHandler}>
               <Form.Group className="mb-3" controlId="fullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                     value={fullName}
                     onChange={(e) => setFullname(e.target.value)}
                     required
                  />
               </Form.Group>
               <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                     value={address}
                     onChange={(e) => setAddress(e.target.value)}
                     required
                  />
               </Form.Group>
               <Form.Group className="mb-3" controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                     value={city}
                     onChange={(e) => setCity(e.target.value)}
                     required
                  />
               </Form.Group>
               <Form.Group className="mb-3" controlId="postalCode">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                     value={postalCode}
                     onChange={(e) => setPostalCode(e.target.value)}
                     required
                  />
               </Form.Group>
               <Form.Group className="mb-3" controlId="country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                     value={country}
                     onChange={(e) => setCountry(e.target.value)}
                     required
                  />
               </Form.Group>
               <div className="mb-3">
                  <Button variant="primary" type="submit">
                     Continue
                  </Button>
               </div>
            </Form>
         </Container>
      </div>
   );
}

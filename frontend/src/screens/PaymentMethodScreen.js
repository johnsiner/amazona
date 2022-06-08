import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CheckoutSteps from '../components/CheckoutSteps';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';

export default function PaymentMethodScreen() {
   const navigate = useNavigate();

   const [paymentMethodName, setPaymentMethodName] = useState();
   const { state, dispatch: ctxDispatch } = useContext(Store);
   const {
      cart: { shippingInfo, paymentMethod },
   } = state;

   useEffect(() => {
      if (!shippingInfo.address) {
         navigate('/shipping');
      }
      if (paymentMethod) {
         setPaymentMethodName(paymentMethod);
      }
   }, [shippingInfo, navigate, paymentMethod]);

   const submitHandler = (e) => {
      e.preventDefault();
      ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
      localStorage.setItem('paymentMethod', paymentMethodName);
      navigate('/placeorder');
   };

   return (
      <div>
         <CheckoutSteps step1 step2 step3 />
         <div className="container small-container">
            <Helmet>
               <title>Payment Method</title>
            </Helmet>
            <h1 className="my-3">Payment Method</h1>
            <Form onSubmit={submitHandler}>
               <div className="mb-3">
                  <Form.Check
                     type="radio"
                     id="PayPal"
                     label="PayPal"
                     value="PayPal"
                     checked={paymentMethodName === 'PayPal'}
                     onChange={(e) => setPaymentMethodName(e.target.value)}
                  />
               </div>
               <div className="mb-3">
                  <Form.Check
                     type="radio"
                     id="Stripe"
                     label="Stripe"
                     value="Stripe"
                     checked={paymentMethodName === 'Stripe'}
                     onChange={(e) => setPaymentMethodName(e.target.value)}
                  />
               </div>
               <div className="mb-3">
                  <Button type="submit">Submit</Button>
               </div>
            </Form>
         </div>
      </div>
   );
}

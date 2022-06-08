import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getError } from '../util';
import { Store } from '../Store';
import { toast } from 'react-toastify';

export default function SigninScreen() {
   const navigate = useNavigate();

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const { state, dispatch: ctxDispatch } = useContext(Store);
   const { userInfo } = state;

   const { search } = useLocation();
   const redirectInUrl = new URLSearchParams(search).get('redirect');
   const redirect = redirectInUrl ? redirectInUrl : '/';

   useEffect(() => {
      if (userInfo) {
         navigate(redirect);
      }
   }, [userInfo, navigate, redirect]);

   const submitHandler = async (event) => {
      event.preventDefault();
      try {
         const { data } = await axios.post('/api/users/signin', {
            email,
            password,
         });
         ctxDispatch({ type: 'USER_SIGNIN', payload: data });
         localStorage.setItem('userInfo', JSON.stringify(data));
         navigate(redirect || '/');
      } catch (err) {
         toast(getError(err));
      }
   };

   return (
      <Container className="small-container">
         <Helmet>
            <title>Sign In</title>
         </Helmet>
         <h1 className="mt-3">Sign In</h1>
         <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
               <Form.Label>Email</Form.Label>
               <Form.Control
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
               />
            </Form.Group>
            <Form.Group className="mb-3">
               <Form.Label>Password</Form.Label>
               <Form.Control
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
               />
            </Form.Group>
            <div className="mb-3">
               <Button type="submit">Sign In</Button>
            </div>
            <div className="mb-3">
               New customer?{' '}
               <Link to={`/signup?redirect=${redirect}`}>Create Account</Link>
            </div>
         </Form>
      </Container>
   );
}

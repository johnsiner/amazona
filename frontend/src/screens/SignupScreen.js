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

export default function SignupScreen() {
   const navigate = useNavigate();

   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');

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
      if (password !== confirmPassword) {
         toast('Password does not match');
         return;
      }
      try {
         const { data } = await axios.post('/api/users/signup', {
            name,
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
            <title>Sign Up</title>
         </Helmet>
         <h1 className="mt-3">Sign Up</h1>
         <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
               type="name"
               required
               onChange={(e) => setName(e.target.value)}
            />
         </Form.Group>
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
            <Form.Group className="mb-3">
               <Form.Label>Confirm Password</Form.Label>
               <Form.Control
                  type="password"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
               />
            </Form.Group>
            <div className="mb-3">
               <Button type="submit">Sign Up</Button>
            </div>
            <div className="mb-3">
               Already have an account?{' '}
               <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
            </div>
         </Form>
      </Container>
   );
}

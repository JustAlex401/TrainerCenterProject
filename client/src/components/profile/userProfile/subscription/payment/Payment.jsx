import React, { useEffect, useState } from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const Payment = ({setClose, item}) => {

    
  const stripePublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

  const stripeTestPromise = loadStripe(stripePublicKey);


  return ( 
    <div className="col container center" style={{marginTop: '50px', marginBottom: '50px', height: '100px'}}>
      <Elements stripe={stripeTestPromise}>
        <PaymentForm setClose={setClose} item={item}/>  
      </Elements>
    </div>
  )
}

export default Payment;
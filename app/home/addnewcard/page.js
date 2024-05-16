'use client'
import React from 'react';
import Addnewcard2 from '@/public/ui/addnewcard2';
// import ReactDOM from 'react-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';



const page = () => {

  //pk_test_51JfmvpC2y2Wr4BecD5qeIqkwOaNCMScIgL6TdhNQNoFdNkMbqKhSn3xjrC5K9X483QuMApm7h8uAnjcDW7XMqHmy00vHYLByuW
  let stripePublickKey = process.env.NEXT_PUBLIC_REACT_APP_ENVIRONMENT === "Production" ? process.env.NEXT_PUBLIC_REACT_APP_STRIPE_PUBLISHABLE_KEY_LIVE : process.env.NEXT_PUBLIC_REACT_APP_STRIPE_PUBLISHABLE_KEY
  const stripePromise = loadStripe(stripePublickKey);
  console.log("Key is ", stripePublickKey)
  const options = {
    // passing the client secret obtained from the server
    clientSecret: 'SecretClientBraver0349',
  };
  return (
    <Elements stripe={stripePromise}>
      <Addnewcard2 style={{ height: '100vh', width: '100vw'}} />
    </Elements>
  )
}

export default page

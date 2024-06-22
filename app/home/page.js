'use client'
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import Slide from '@mui/material/Slide';
import CircularProgress from '@mui/material/CircularProgress';

const Page = () => {
  const router = useRouter();

  // State variables
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Select a plan");
  const [loading, setLoading] = useState(false);
  const [selectPlan, setSelectPlan] = useState(false);
  const [selectPlan2, setSelectPlan2] = useState(false);
  const [selectPlan3, setSelectPlan3] = useState(false);

  // Functions
  const handleBackClick = () => {
    router.back();
  };

  //test code
  
  // if(user.user.payment_source_added){
  // //   router.push(`/home/cards`);
  // }
  // else{
  //   router.push(`/home/addnewcard`);
  // }

  const handleContinueClick = () => {
    setLoading(true);
    let selectedPlanIndex = -1;

    if (selectPlan) {
      selectedPlanIndex = 0;
    } else if (selectPlan2) {
      selectedPlanIndex = 1;
    } else if (selectPlan3) {
      selectedPlanIndex = 2;
    }

    if (selectedPlanIndex !== -1) {
      console.log('Selected plan index is:', selectedPlanIndex);

      try {
        localStorage.setItem('plan', JSON.stringify({ planIndex: selectedPlanIndex }));
        const d = localStorage.getItem('user');
        const user = JSON.parse(d);
        console.log("User is ", user);
        if (user.user.payment_source_added) {
          router.push(`/home/cards`);
        } else {
          router.push(`/home/cards`);
          console.log('No payment souce added');
        }
      } catch (error) {
        setErrorMessage(error.message);
        setError(true);
        console.log('Error occurred:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setErrorMessage("Select a plan");
      setError(true);
      setLoading(false);
      console.log('Select a plan');
    }
  };

  const handleSelectClick = () => {
    setSelectPlan(!selectPlan);
    setSelectPlan2(false);
    setSelectPlan3(false);
  };

  const handleSelectClick2 = () => {
    setSelectPlan2(!selectPlan2);
    setSelectPlan(false);
    setSelectPlan3(false);
  };

  const handleSelectClick3 = () => {
    setSelectPlan3(!selectPlan3);
    setSelectPlan(false);
    setSelectPlan2(false);
  };

  const handleClose = () => {
    setError(false);
  };

  return (
    <div className="container">
      <div className="inner-container" style={{ backgroundColor: '', width: '100vw' }}>
        <div className="header">
          <div style={{ fontWeight: '500', fontSize: 30, color: 'white' }}>
            Subscribe to a Plan
          </div>
          <Snackbar
            open={error}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            TransitionComponent={Slide}
            TransitionProps={{
              direction: 'left',
            }}
          >
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              {errorMessage}
            </Alert>
          </Snackbar>
        </div>
        <div className="content" style={{ backgroundColor: '', width: '100vw' }}>
          <button onClick={handleSelectClick}>
            <div className={`plan ${selectPlan ? 'selected' : ''}`} style={{ backgroundColor: '' }}>
              <div className="plan-header">
                <div className="plan-title">
                  <img src='/assets/subscriptionicon.png' alt='Subscriptionicon' className="plan-icon" />
                  <div className='flex flex-row justify-center items-center gap-2'>
                    <label>Monthly</label>
                    <label style={{ fontSize: 10 }}>( 7 day free trial )</label>
                  </div>
                </div>
                <div className="plan-price">
                  $19.99 <span className="plan-price-subtext">/ Month</span>
                </div>
              </div>
              <div className="plan-details">
                <div>Enjoy unlimited Coaching for a full 30 days</div>
              </div>
            </div>
          </button>
          <button onClick={handleSelectClick2}>
            <div className={`plan ${selectPlan2 ? 'selected' : ''}`}>
              <div className="plan-header items-center">
                <div className="plan-title justify-center items-center">
                  <img src='/assets/subscriptionicon.png' alt='Subscriptionicon' className="plan-icon" />
                  <div className='plan-text flex flex-col'>
                    <div className='flex flex-row justify-center items-center gap-2'>
                      <label>6 Months</label>
                      <label style={{ fontSize: 10 }}>( 7 day free trial )</label>
                    </div>
                    <label className='text-xs p-1 capsule rounded' style={{ backgroundColor: 'red' }}>21% Discount</label>
                  </div>
                </div>
                <div className="plan-price">
                  $99.99 <span className="plan-price-subtext">/ 6 Months</span>
                </div>
              </div>
              <div className="plan-details">
                <div>Enjoy unlimited Coaching for a full 6 Months at a discounted cost of $16.50 per month</div>
              </div>
            </div>
          </button>
          <button onClick={handleSelectClick3}>
            <div className={`plan ${selectPlan3 ? 'selected' : ''} `}>
              <div className="flex flex-row justify-between items-center">
                <div className="flex justify-center items-center" >
                  <img src='/assets/subscriptionicon.png' alt='Subscriptionicon' className="plan-icon" />
                  <div className=' flex flex-col'>
                    <div className='flex flex-row justify-center items-center gap-1'>
                      <label>12 Months</label>
                      <label style={{ fontSize: 10 }}>( 7 day free trial )</label>
                    </div>
                    <label className='text-xs p-1 capsule rounded' style={{ backgroundColor: 'red' }}>25% Discount</label>
                  </div>
                </div>
                <div className="plan-price">
                  $179.99 <span className="plan-price-subtext">/ 12 Months</span>
                </div>
              </div>
              <div className="plan-details">
                <div>Enjoy unlimited Coaching for a full 12 months at a discounted cost of $15 per month</div>
              </div>
            </div>
          </button>
          <div className="footer">
            {loading ? <CircularProgress style={{ color: 'white' }} /> : <Button onClick={handleContinueClick} sx={{color: '#ffffff', backgroundColor: ' #007bff '}} className="continue-button">
              Continue
            </Button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

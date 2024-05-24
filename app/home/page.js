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
  const [loading, setLoading] = useState(false);
  const [selectPlan, setSelectPlan] = useState(false);
  const [selectPlan2, setSelectPlan2] = useState(false);
  const [selectPlan3, setSelectPlan3] = useState(false);

  // Functions
  const handlebackClick = () => {
    router.back();
  };

  const handleContinueClick = () => {
    try {
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
        localStorage.setItem('plan', JSON.stringify({ planIndex: selectedPlanIndex }));
        const d = localStorage.getItem('user');
        const user = JSON.parse(d);
        console.log("User is ", user);
        if (user.user.payment_source_added) {
          router.push(`/home/cards`);
        } else {
          router.push(`/home/cards`);
        }
      } else {
        setError(true);
        console.log('Select a plan');
      }
    } catch (error) {
      console.log('Error occurred:', error);
    } finally {
      setLoading(false);
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
      <div className="inner-container">
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
              Select a Plan
            </Alert>
          </Snackbar>
        </div>
        <div className="content">
          <button onClick={handleSelectClick}>
            <div className={`plan ${selectPlan ? 'selected' : ''}`}>
              <div className="plan-header">
                <div className="plan-title">
                  <img src='/assets/subscriptionicon.png' alt='Subscriptionicon' className="plan-icon" />
                  <div className='plan-text'>Monthly</div>
                </div>
                <div className="plan-price">
                  $20 <span className="plan-price-subtext">/ Month</span>
                </div>
              </div>
              <div className="plan-details">
                <div>Enjoy unlimited Journaling for a full month for only $20</div>
              </div>
            </div>
          </button>
          <button onClick={handleSelectClick2}>
            <div className={`plan ${selectPlan2 ? 'selected' : ''}`}>
              <div className="plan-header">
                <div className="plan-title">
                  <img src='/assets/subscriptionicon.png' alt='Subscriptionicon' className="plan-icon" />
                  <div className='plan-text'>6 Months</div>
                </div>
                <div className="plan-price">
                  $99.99 <span className="plan-price-subtext">/ Half Year</span>
                </div>
              </div>
              <div className="plan-details">
                <div>Enjoy unlimited Journaling for 6 Months for only $99.99</div>
              </div>
            </div>
          </button>
          <button onClick={handleSelectClick3}>
            <div className={`plan ${selectPlan3 ? 'selected' : ''}`}>
              <div className="plan-header">
                <div className="plan-title">
                  <img src='/assets/subscriptionicon.png' alt='Subscriptionicon' className="plan-icon" />
                  <div className='plan-text'>Yearly</div>
                </div>
                <div className="plan-price">
                  $179.99 <span className="plan-price-subtext">/ Year</span>
                </div>
              </div>
              <div className="plan-details">
                <div>Enjoy unlimited Journaling for a full Year for only $179.99</div>
              </div>
            </div>
          </button>
          <div className="footer">
            {loading ? <CircularProgress style={{ color: 'white' }} /> : <Button onClick={handleContinueClick} className="continue-button">
              Continue
            </Button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

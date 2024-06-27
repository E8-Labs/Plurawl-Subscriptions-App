'use client'
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import Slide from '@mui/material/Slide';
import CircularProgress from '@mui/material/CircularProgress';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  //test code for slider

  const [selectedSlideIndex, setselectedSlideIndex] = useState(0);

  const handleImageClick = (index) => {
    setselectedSlideIndex(index);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToShow: 1,
    vertical: false,
    slidesToScroll: 1,
    afterChange: (index) => setselectedSlideIndex(index),
    swipe: true,  // enable swipe
  };

  const images = [
    {
      id: 1,
      userImage: "/assets/download3.png",
      plan: 'Monthly',
      amount: '$19.99 / Month',
      service: 'Enjoy unlimited Coaching fora full 30 days'
    },
    {
      id: 2,
      userImage: "/assets/download3.png",
      plan: '6 Months',
      amount: '$99.99/ 6 Months',
      service: 'Enjoy unlimited Coaching for a full 6 Months at a discounted cost of $16.50 per month'
    },
    {
      id: 3,
      userImage: "/assets/download3.png",
      plan: 'Yearly',
      amount: '$179.99/ 12 Months',
      service: 'Enjoy unlimited Coaching for a full 12 Months at a discounted cost of $15 per month'
    }
  ];

  //test code ends here

  const handleContinueClick = () => {
    setLoading(true);
    // let selectedPlanIndex = -1;

    // if (selectPlan) {
    //   selectedPlanIndex = 0;
    // } else if (selectPlan2) {
    //   selectedPlanIndex = 1;
    // } else if (selectPlan3) {
    //   selectedPlanIndex = 2;
    // }
    let PlanIndex = selectedSlideIndex;

    if (PlanIndex !== null) {
      console.log('Selected plan index is:', PlanIndex);

      //can replace selected plan index with index of the slider screen

      try {
        localStorage.setItem('plan', JSON.stringify({ planIndex: PlanIndex }));
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
  //logic can be deleted
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
  //still here

  const handleClose = () => {
    setError(false);
  };

  return (
    <div className="container">
      <div className="inner-container" style={{ backgroundColor: '', width: '100vw' }}>
        <div className="header">
          <div style={{ fontWeight: 'bold', fontSize: 30, color: '' }}>
            Subscribe to a Plan
          </div>

          {/* Code for slider */}

          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', height: '85vh', alignItems: 'center' }}>
            <Slider {...settings} style={{ width: '80%', height: '80vh', display: 'flex', alignItems: 'center' }}>
              {images.map((src, index) => (
                <div key={index} onClick={handleContinueClick}>
                  <div style={{ width: '95%', borderRadius: 15, padding: 20, textAlign: 'start', backgroundColor: 'white', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)' }}>
                    <button onClick={() => console.log('Working')}>
                      <div className='flex flex-row justify-center mt-10'>
                        <img src={src.userImage} alt={`Image ${index + 1}`} style={{ resize: 'cover', height: 'auto', width: '50%', borderRadius: '50%' }} />
                      </div>
                      <div className='mt-8'>
                        <p style={{ fontWeight: 'bolder', fontSize: '22px', textAlign: '' }}>
                          {src.plan}
                        </p>
                        <p style={{ fontWeight: 'bold', fontSize: '14px', marginLeft: 4, marginTop: 3 }}>
                          (7 Days free trial)
                        </p>
                        <p style={{ fontWeight: 'bold', fontSize: '24px', textAlign: 'center',marginTop: 13 }}>
                          {src.amount}
                        </p>
                        {/*<p style={{ fontWeight: 'bold', fontSize: '20px', textAlign: 'start' }}>
                          Discount : <span style={{ fontSize: '18px' }}>Discount price is </span>
              </p>*/}
                        <p style={{ fontWeight: '500', fontSize: '16px', textAlign: 'center', marginTop: 15 }}>
                          {src.service}
                        </p>
                      </div>
                    </button>
                    <div className="footer">
                      {loading ? <CircularProgress color='inherit' style={{ color: '' }} /> : <Button onClick={handleContinueClick} sx={{ color: '#ffffff', backgroundColor: '#D44740', width: '100%', height: '60px', borderRadius: 3, fontSize: 'large' }} className="continue-button">
                        Select Plan
                      </Button>}
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
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
        {/* 
      <div className="content" style={{ backgroundColor: '', width: '100vw' }}>
          <button onClick={handleSelectClick} style={{ width: '100%' }}>
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
            {loading ? <CircularProgress style={{ color: '' }} /> : <Button onClick={handleContinueClick} sx={{ color: '#ffffff', backgroundColor: ' #007bff ' }} className="continue-button">
              Continue
            </Button>}
          </div>
        </div>
      */}
      </div>
    </div>
  );
};

export default Page;

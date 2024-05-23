'use client'
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import Slide from '@mui/material/Slide';
import CircularProgress from '@mui/material/CircularProgress';

const Page = () => {
  const router = useRouter();

  //functions
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handlebackClick = () => {
    router.back()
  }

  const handleContinueClick = () => {
    try {
      setLoading(true)
      let selectedPlanIndex = -1;

      if (selectPlan) {
        selectedPlanIndex = 0;
      } else if (selectPlan2) {
        selectedPlanIndex = 1;
      } else if (selectPlan3) {
        selectedPlanIndex = 2;
      }

      if (selectedPlanIndex !== -1) {
        // Router.push(`/home/cards?selectedPlanIndex=${selectedPlanIndex}`);
        // Router.push(`/home/cards?selectedPlanIndex=${selectedPlanIndex}`)
        console.log('Selected plan index is:', selectedPlanIndex);
        setLoading(true)
        // const newParams = new URLSearchParams(searchParams);
        // newParams.set('data', JSON.stringify({ key: 'value' })); // Example data
        // setSearchParams(newParams, { replace: true });
        // Router.push(`/home/cards?selectedPlanIndex=${selectedPlanIndex}`);
        localStorage.setItem('plan', JSON.stringify({ planIndex: selectedPlanIndex }));
        router.push(`/home/cards`);
      } else {
        setError(true)
        console.log('Select a plan');
      }
    } catch (error) {
      console.log('Error occured is', error)
    }
    finally {
      setLoading(false)
    }
  }
  const [selectPlan, setSelectPlan] = useState(false)

  const handleSelectClick = () => {
    setSelectPlan(!selectPlan)
    setSelectPlan2(false)
    setSelectPlan3(false)
  }

  const [selectPlan2, setSelectPlan2] = useState(false)

  const handleSelectClick2 = () => {
    setSelectPlan2(!selectPlan2)
    setSelectPlan(false)
    setSelectPlan3(false)
  }

  const [selectPlan3, setSelectPlan3] = useState(false)

  const handleSelectClick3 = () => {
    setSelectPlan3(!selectPlan3)
    setSelectPlan(false)
    setSelectPlan2(false)
  }

  //code to close snackbar
  const handleClose = () => {
    setError(false)
  }

  
  return (
    <div className="w-full" style={{ backgroundColor: 'black', height: '100vh', display: 'flex', justifyContent: 'center' }}>

      <div style={{ width: '350px', color: 'white' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40 }}>
          {/*<div style={{ fontWeight: '500', fontSize: 30, color: 'white' }}>
            Subscription
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button style={{ width: '42px' }} onClick={() => { console.log('Btn work') }}>
              <div style={{ height: '42px', width: '42px', border: '2px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 50, backgroundColor: '#ffffff45' }}>
                <img src='/assets/crossicon.png' style={{ height: 'auto', width: '100%', maxWidth: '12px' }} alt='crossicon' />
              </div>
            </button>
  </div>*/}
          <div style={{ fontWeight: '500', fontSize: 30, color: 'white' }}>
            Subscribe a Plan
          </div>
          <Snackbar
            open={error}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            TransitionComponent={Slide}
            TransitionProps={{
              direction: 'left'
            }}
          >
            <Alert onClose={handleClose} severity="success" sx={{ width: '50%' }}>
              Select a Plan
            </Alert>
          </Snackbar>
        </div>

        <div style={{ width: '100%', height: '630px', borderRadius: 25, backgroundColor: '#ffffff20', padding: 20, marginTop: 50 }}>

          <div style={{ display: 'flex', alignItems: 'center' }}>

            <div className='w-1/6' style={{ display: 'flex', alignItems: 'center' }}>
              <button onClick={handlebackClick} style={{ display: 'flex', alignItems: 'center' }}>
                {/*<img src='/assets/backicon.png' style={{ height: '20px', width: '13px' }} alt='backicon' />*/}
              </button>
            </div>

            <div className='w-4/6' style={{ display: 'flex', justifyContent: 'center', gap: 8 }} >
              <div>
                <button style={{ height: '20px', width: '24px' }}>
                  <img src='/assets/cardicon.png' style={{ height: '20px', width: '24px' }} alt='cardicon' />
                </button>
              </div>
              <div style={{ color: '#F8EDDA', fontWeight: '500', marginLeft: '2px' }}>
                Subscriptions
              </div>
            </div>

            <div className='w-1/6'></div>
          </div>

          <div style={{ overflow: 'auto', maxHeight: '470px', marginTop: 40, paddingBottom: '20px' }} >
            <button onClick={handleSelectClick}>
              <div style={{ borderWidth: 1, borderColor: selectPlan ? '#D44740' : '#ffffff70', padding: 22, borderRadius: 15 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <img src='/assets/subscriptionicon.png' style={{ height: '23px', width: '23px' }} alt='Sucriptionicon' />
                    <div className='font-semibold	' style={{ fontSize: 17, color: 'white' }}>
                      Monthly
                    </div>
                  </div>
                  <div style={{ fontSize: 17, fontWeight: '600' }}>
                    $20 <span style={{ fontSize: 13, color: '#F8EDDA50' }}>/ Month</span>
                  </div>
                </div>

                {/* Package details */}

                <div style={{ padding: 20 }}>
                  <div>Enjoy unlimited Journaling for full month in only 20 Dollars</div>
                </div>

              </div>
            </button>
            <button onClick={handleSelectClick2}>
              <div style={{ borderWidth: 1, borderColor: selectPlan2 ? '#D44740' : '#ffffff70', padding: 22, borderRadius: 15, marginTop: 40 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <img src='/assets/subscriptionicon.png' style={{ height: '23px', width: '23px' }} alt='Sucriptionicon' />
                    <div className='font-semibold	' style={{ fontSize: 17, color: 'white' }}>
                      6Months
                    </div>
                  </div>
                  <div style={{ fontSize: 17, fontWeight: '600' }}>
                    $99.99 <span style={{ fontSize: 13, color: '#F8EDDA50' }}>/ HalfYear</span>
                  </div>
                </div>

                {/* Package details */}

                <div style={{ padding: 20 }}>
                  <div>Enjoy unlimited Journaling for Six Months in only 50 Dollars</div>
                </div>

              </div>
            </button>
            <button onClick={handleSelectClick3}>
              <div style={{ borderWidth: 1, borderColor: selectPlan3 ? '#D44740' : '#ffffff70', padding: 22, borderRadius: 15, marginTop: 40 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <img src='/assets/subscriptionicon.png' style={{ height: '23px', width: '23px' }} alt='Sucriptionicon' />
                    <div className='font-semibold	' style={{ fontSize: 17, color: 'white' }}>
                      Yearly
                    </div>
                  </div>
                  <div style={{ fontSize: 17, fontWeight: '600' }}>
                    $179.99 <span style={{ fontSize: 13, color: '#F8EDDA50' }}>/ Year</span>
                  </div>
                </div>

                {/* Package details */}

                <div style={{ padding: 20 }}>
                  <div>Enjoy unlimited Journaling for full Year in only 100 Dollars</div>
                </div>

              </div>
            </button>
          </div>


          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            {loading ? 'Loading' : <Button onClick={handleContinueClick} className='' style={{ color: 'white', }}>
              Continue
            </Button>}
          </div>

        </div>

      </div>

    </div>
  )
}

export default Page

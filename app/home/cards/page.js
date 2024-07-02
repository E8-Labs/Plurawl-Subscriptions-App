'use client'
import { React, useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Slide from '@mui/material/Slide';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Addnewcard2 from '@/public/ui/addnewcard2';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '@/public/ui/PaymentForm';

const Page = () => {

    const [plan, setPlan] = useState(null);
    const [NoCards, setNoCards] = useState(false);
    const [addCardLoading, setAddCardLoading] = useState(false);

    //code to close snackbar
    const handleClose = () => {
        setError(false)
    }

    const router = useRouter();
    const handleBackIcon = () => {
        router.back('')
    }
    const handleAddcard = () => {
        try {
            setAddCardLoading(true)
            router.push('/home/addnewcard')
        } catch (error) {
            console.log('Some error')
        } finally {
            setCardLoading(false)
        }

    }

    // const [isSelected, setIsselected] = useState([])

    // const handleSelect = (itemId) => {
    //     setIsselected(itemId)
    //     // if (isSelected.includes(itemId)) {
    //     //     setIsselected(isSelected.filter(id => id !== itemId));
    //     // } else {
    //     //     setIsselected([...isSelected, itemId]);
    //     // }
    // }

    const [selectedItemId, setSelectedItemId] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [CardLoading, setCardLoading] = useState(false);

    const handleSelect = (itemId) => {
        // Toggle selection for the clicked item
        setSelectedItemId(itemId === selectedItemId ? null : itemId);
    };

    const [cardDetail, setCarddetail] = useState([]);
    useEffect(() => {
        const getCards = async () => {
            try {
                setCardLoading(true)

                let api = process.env.NEXT_PUBLIC_REACT_APP_ENVIRONMENT === "Development2" ? "https://bf59-119-156-82-235.ngrok-free.app" : "https://plurawlapp.com/plurawl";
                const apiUrl = api + '/api/users/load_cards';
                const data = localStorage.getItem('user')
                const d = JSON.parse(data);
                const response = await fetch(apiUrl, {
                    method: 'get',
                    headers: {
                        Authorization: 'Bearer ' + d.token
                    }
                })
                console.log('Token recieved is', d.token)
                console.log("Load Cards Api ", apiUrl)
                if (response.ok) {
                    console.log("Load Cards Response is ", response)
                    const cards = await response.json();
                    if (cards.status === true) {
                        const i = cards;
                        setCarddetail(i.data || [])
                        console.log('Data of api is', i)
                        if (cards.data.length === 0) {
                            setNoCards(true)
                        }
                    } else {
                        setNoCards(true)
                    }
                } else {
                    console.log('Error')
                }
            } catch (error) {
                console.log('Error occured is', error)
            } finally {
                setCardLoading(false);
            }
        }
        getCards();
    }, [])

    // const router = useRouter();
    // const selectedPlanIndex = router.query;
    // console.log('Router query console:', selectedPlanIndex);

    //Code for API to load_cards
    useEffect(() => {
        let data = localStorage.getItem('plan')

        if (data) {
            let p = JSON.parse(data);
            console.log("Plan data is ", p)
            setPlan(p);
        }
        else {
            console.log("No data found")
        }

        // localStorage.setItem('plan', JSON.stringify({ planIndex: selectedPlanIndex }));
        const d = localStorage.getItem('user');
        const user = JSON.parse(d)
        console.log("User is ", user)
        if (user.user.payment_source_added) {
            console.log('Card is added');
        }
        else {
            setOpen(true);
            console.log('Card is notadded');
        }
    }, []);


    //code for promo click
    const handleNextClick = () => {
        if (selectedItemId === null) {
            //add snack message
            setError(true);
            console.log('Select card');
        } else {
            setLoading(true)
            let p = plan;
            p.selectedCard = selectedItemId;
            localStorage.setItem('plan', JSON.stringify(p));
            router.push('/home/cards/Promo')
        }
    }

    //Code for Modal
    const [open, setOpen] = useState(false);
    const handleOpenModal = () => {
        setOpen(true);
    };
    const handleCloseModal = () => {
        setOpen(false);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        bgcolor: 'background.paper',
        // border: '2px solid red',
        boxShadow: 24,
        // pt: 2,
        // px: 4,
        // pb: 3,
        borderRadius: 5,
        border: 'none'
    };

    let stripePublickKey = process.env.NEXT_PUBLIC_REACT_APP_ENVIRONMENT === "Production" ? process.env.NEXT_PUBLIC_REACT_APP_STRIPE_PUBLISHABLE_KEY_LIVE : process.env.NEXT_PUBLIC_REACT_APP_STRIPE_PUBLISHABLE_KEY;
    const stripePromise = loadStripe(stripePublickKey);

    const options = {
        clientSecret: 'SecretClientBraver0349',
    };

    return (
        // <Suspense>
        <div className="w-full overflow-y-none" style={{ backgroundColor: '#00000030', height: '100vh', display: 'flex', justifyContent: 'center' }}>

            <div style={{ width: '350px', }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 50 }}>
                    <div style={{ height: '40px', width: '40px', backgroundColor: '#00000000', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <button onClick={handleBackIcon}>
                            <img src='/assets/backicon2.png' alt='backicon' />
                        </button>
                    </div>
                    <div className='font-semibold' style={{ fontSize: 24 }}>
                        Select Card
                    </div>
                    <div>
                        {
                            // CardLoading ?
                            //     <div style={{ height: '20px', width: '20px' }}>
                            //         <CircularProgress />
                            //     </div> :
                            <button onClick={handleOpenModal}>
                                <div style={{ height: '40px', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {/* <img src='/assets/plusicon.png' style={{ height: 'auto', width: '100%', maxWidth: '30px' }} alt='Plusicon' /> */}
                                    <label className='font-medium'>Add Card</label>
                                </div>
                            </button>
                        }
                    </div>
                </div>

                {/* Add code for no cards selected */}

                <Snackbar
                    open={error}
                    autoHideDuration={1000}
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
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        Add Card for further processing
                    </Alert>
                </Snackbar>

                {NoCards ?
                    <div style={{ fontWeight: '500', fontSize: 22, marginTop: 20, textAlign: 'center' }}>
                        No Card Available
                    </div> :
                    <div>
                        {CardLoading ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: 70 }}><CircularProgress /></div> :
                            <div style={{ overflow: 'auto', maxHeight: '600px', marginTop: 70 }}>
                                {cardDetail.map((item) => (
                                    <button key={item.id} onClick={() => handleSelect(item.id)} style={{ width: '100%', marginTop: 30, borderRadius: 20, backgroundColor: 'white' }}>
                                        <div style={{ color: '', height: '140px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: '#ffffff50' }}>
                                            <div className='w-11/12' style={{ display: 'flex', alignItems: 'center', gap: 15, justifyContent: 'space-between' }}>
                                                <div style={{ gap: 15, flexDirection: 'column', display: 'flex', }}>
                                                    <div style={{ display: 'flex', gap: 7 }}>
                                                        <div style={{ fontWeight: '900', fontSize: 20 }}>
                                                            .....
                                                        </div>
                                                        <div style={{ fontWeight: '500', fontSize: 20, marginTop: 10 }}>
                                                            {item.last4}
                                                        </div>
                                                    </div>
                                                    <div style={{ fontWeight: '500', fontSize: 20 }}>
                                                        Expiry {item.exp_month}/{item.exp_year}
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
                                                    <div style={{ fontWeight: '600', fontSize: 22 }}>
                                                        {item.brand}
                                                    </div>
                                                    <Image alt='Image' src={selectedItemId === item.id ? '/assets/RadioActive.png' : '/assets/RadioInactive.png'} height={40} width={40} />
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        }
                    </div>
                }

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 27 }}>
                    {loading ? <CircularProgress color='inherit' /> :
                        <button onClick={handleNextClick} className='w-4/6 text-xl' style={{ fontWeight: '500', padding: 15, borderRadius: 10, height: '60px', backgroundColor: '#D44740', color: 'white' }}>
                            Promo Code
                        </button>
                    }
                </div>
                <Modal
                    open={open}
                    onClose={handleCloseModal}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Box sx={{ ...style, width: '90%', padding: 3, backgroundColor: 'white' }}>
                        <Elements stripe={stripePromise}>
                            <div style={{ backgroundColor: '#f1f1fe', width: '100%', height: '35vh', paddingTop: 6, paddingBottom: 100, paddingRight: 10, paddingLeft: 10, borderRadius: '20px' }}>{/* borderTopLeftRadius: '25px', borderTopRightRadius: '25px', borderBottomLeftRadius: '50px', borderBottomRightRadius: '50px' */}
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                                    <div style={{ width: '16.66%', display: 'flex', alignItems: 'center' }}>
                                        <button onClick={handleCloseModal} style={{ display: 'flex', alignItems: 'center' }}>
                                            <img src='/assets/cross.png' alt='backicon' />
                                        </button>
                                    </div>
                                    <div style={{ width: '66.66%', display: 'flex', justifyContent: 'center', gap: '8px', fontSize: '24px', fontWeight: '600' }}>
                                        Add New Card
                                    </div>
                                    <div style={{ width: '16.66%' }}></div>
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <img style={{height: '130'}} src='/assets/card.webp' />
                                </div>
                            </div>
                            <Addnewcard2 close={handleCloseModal} />
                            {/* <PaymentForm /> */}
                        </Elements>
                    </Box>
                </Modal>
            </div>
        </div>
        // </Suspense>
    )
}

export default Page

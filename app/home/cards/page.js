'use client'
import { React, useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Slide from '@mui/material/Slide';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

const Page = () => {

    const [plan, setPlan] = useState(null);
    const [NoCards, setNoCards] = useState(false);

    //code to close snackbar
    const handleClose = () => {
        setError(false)
    }

    const router = useRouter();
    const handleBackIcon = () => {
        router.back('')
    }
    const handleAddcard = () => {
        router.push('/home/addnewcard')
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
                    } else {
                        NoCards(true)
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

    // // Code for API to load_cards
    useEffect(() => {
        let data = localStorage.getItem('plan')

        if (data) {
            let p = JSON.parse(data);
            console.log("Plan data is ", p)
            setPlan(p)
        }
        else {
            console.log("No data found")
        }
    }, []);

    //rough code
    // const selectedIndex = useSearchParams()
    // const SI = selectedIndex.get("selectedPlanIndex")

    // let selectedPlanIndex2 = JSON.parse(SI)
    // console.log('Data recieved from previous screen is', selectedPlanIndex2)
    // const [searchParams] = useSearchParams();
    // const dataFromPage1 = searchParams.get('data');
    // const parsedData = dataFromPage1 ? JSON.parse(dataFromPage1) : null;
    // console.log("Data from prev screen is ", parsedData)

    //code for subscribing a plan
    // const handleSubscriptionClick = async (event) => {
    //     try {
    //         setLoading(true);
    //         if (selectedItemId === null) {
    //             setError(true)
    //             console.log('Select card');
    //         } else {
    //             event.preventDefault();
    //             const apiUrl = 'https://plurawlapp.com/plurawl/api/users/subscribe';
    //             const userDeatils2 = localStorage.getItem('user');
    //             const S = JSON.parse(userDeatils2)
    //             const response = await fetch(apiUrl, {
    //                 method: 'post',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     Authorization: 'Bearer ' + S.token
    //                 },
    //                 body: JSON.stringify({ 'sub_type': plan.planIndex })
    //             });
    //             console.log('Data sending in api is', plan.planIndex);
    //             if (response.ok) {
    //                 const subscription = await response.json();
    //                 const DATA = subscription;
    //                 console.log('Data of subscribe api is', DATA.data.data[0].plan)
    //                 if (DATA.data.data[0].plan.active === true) {
    //                     console.log('Plan is true')
    //                     router.push('/home/cards/subscriptioncompleted')
    //                     // Router.push(`/home/subscriptioncompleted?selectedPlanIndex=${selectedPlanIndex2}`)
    //                     // console.log('Data sent to finalscreen is', selectedPlanIndex2)
    //                 } else {
    //                     console.log('Caannot console error')
    //                 }
    //             } else {
    //                 console.log('Unknown error occured')
    //             }
    //         }
    //     } catch (error) {
    //         console.log('Error is', error)
    //     } finally {
    //         setLoading(false);
    //     }
    // }


    //code for promo click
    const handleNextClick = () => {
        if (selectedItemId === null) {
            //add snack message
            console.log('Select card')
        } else {
            let p = plan;
            p.selectedCard = selectedItemId;
            localStorage.setItem('plan', JSON.stringify(p));
            router.push('/home/cards/Promo')
        }
    }


    return (
        // <Suspense>
        <div className="w-full" style={{ backgroundColor: 'black', height: '100vh', display: 'flex', justifyContent: 'center' }}>

            <div style={{ width: '350px', color: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 50 }}>
                    <div style={{ height: '40px', width: '40px', backgroundColor: '#ffffff80', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <button onClick={handleBackIcon}>
                            <img src='/assets/backicon2.png' style={{ height: '25px', width: '30px' }} alt='backicon' />
                        </button>
                    </div>
                    <div style={{ fontSize: 24 }}>
                        Select Card
                    </div>
                    <div>
                        <button onClick={handleAddcard}>
                            <div style={{ height: '40px', width: '40px', backgroundColor: '#ffffff80', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src='/assets/plusicon.png' style={{ height: 'auto', width: '100%', maxWidth: '30px' }} alt='Plusicon' />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Add code for no cards selected */}

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

                {NoCards ?
                    <div style={{ fontWeight: '500', fontSize: 22, marginTop: 20 }}>
                        No Card Available
                    </div> :
                    <div>
                        {CardLoading ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: 70 }}><CircularProgress /></div> :
                            <div style={{ overflow: 'auto', maxHeight: '400px', marginTop: 70 }}>
                                {cardDetail.map((item) => (
                                    <button key={item.id} onClick={() => handleSelect(item.id)} style={{ width: '100%', marginTop: 30 }}>
                                        <div style={{ color: 'white', height: '140px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: '#ffffff50' }}>
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

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
                    <button onClick={handleNextClick} className='w-4/6 bg-green-500' style={{ fontWeight: '500', fontSize: 17, padding: 15, borderRadius: 10, height: '60px' }}>
                        Promo Code
                    </button>
                </div>
            </div>
        </div>
        // </Suspense>
    )
}

export default Page

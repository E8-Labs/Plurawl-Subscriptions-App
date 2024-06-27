'use client'
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import Slide from '@mui/material/Slide';
import { comment } from 'postcss';

const Page = () => {

    const [EmailValue, setEmailValue] = useState('');
    const [NameValue, setNameValue] = useState('');
    const [DescriptionValue, setDescriptionValue] = useState('');
    const [error, setError] = useState(false);
    const [ShowResponse, setShowResponse] = useState(false);
    const [Data, setData] = useState('')
    const [Loading, setLoading] = useState(false)

    console.log('Value of email is', EmailValue)

    //api link
    //https://plurawlapp.com/plurawl/api/users/contact_us

    const Label = {
        fontWeight: '600',
        // fontFamily: customFonts.medium,
        fontSize: 18,
        color: '#ffffff',
        marginTop: 30
    }

    // if (EmailValue.length === 0) {
    //     setError(true)
    //     console.log('Enter email')
    // } else if (NameValue.length === 0) {
    //     setError(true)
    //     console.log('Enter name value')
    // }

    const handleContactUs = async () => {
        if (EmailValue.length === 0) {
            setError(true)
            console.log('Enter email')
        } else if (NameValue.length === 0) {
            setError(true)
            console.log('Enter name value')
        } else if (DescriptionValue.length === 0) {
            setError(true)
        } else {
            try {
                setLoading(true);
                const apiUrl = "https://plurawlapp.com/plurawl/api/users/contact_us";
                const data = localStorage.getItem('user')
                const d = JSON.parse(data);
                const response = await fetch(apiUrl, {
                    'method': 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': 'Bearer ' + d.token
                    },
                    body: JSON.stringify({
                        email: EmailValue,
                        name: NameValue,
                        comment: DescriptionValue
                    })
                });


                if (response.ok) {
                    const Result = await response.json();
                    console.log('Response is', Result)
                    setData(Result);
                }


            } catch (error) {
                console.log('Error is', error)
            } finally {
                setShowResponse(true)
                setLoading(false)
            }
        }
    }

    const handleClose = () => {
        setError(false);
        setShowResponse(false);
    }

    return (
        <div className="w-full" style={{ backgroundColor: 'black', height: '100vh', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '350px', display: 'flex', flexDirection: 'column', color: 'white', marginTop: 50 }}>
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
                        Enter all credentials
                    </Alert>
                </Snackbar>

                <Snackbar
                    open={ShowResponse}
                    autoHideDuration={2500}
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
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        {Data.message}
                    </Alert>
                </Snackbar>

                <p style={Label}>
                    Email
                </p>

                <div>
                    <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        value={EmailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                        sx={{
                            '& .MuiInputBase-root': {
                                color: '#ffffff',  // Text color
                                width: '350px', // Field width
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#ffffff', // Outline color
                                borderRadius: 3
                            },
                            '& .MuiInputLabel-root': {
                                color: '#ffffff', // Label color
                            },
                            marginTop: 2
                        }}
                    />
                </div>

                <p style={Label}>
                    Name
                </p>

                <div>
                    <TextField
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        value={NameValue}
                        onChange={(e) => setNameValue(e.target.value)}
                        sx={{
                            '& .MuiInputBase-root': {
                                color: '#ffffff',  // Text color
                                width: '350px', // Field width
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#ffffff', // Outline color
                                borderRadius: 3
                            },
                            '& .MuiInputLabel-root': {
                                color: '#ffffff', // Label color
                            },
                            marginTop: 2
                        }}
                    />
                </div>

                <p style={Label}>
                    Description
                </p>

                <div>
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        value={DescriptionValue}
                        onChange={(e) => setDescriptionValue(e.target.value)}
                        // defaultValue="Add Description"
                        sx={{
                            '& .MuiInputBase-root': {
                                color: '#ffffff',  // Text color
                                width: '350px', // Field width
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#ffffff', // Outline color
                                borderRadius: 3
                            },
                            '& .MuiInputLabel-root': {
                                color: '#ffffff', // Label color
                            },
                            marginTop: 2
                        }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {Loading ?
                        <div style={{ marginTop: 50, }}>
                            <CircularProgress color='inherit' sx={{ height: '30px' }} />
                        </div> :
                        <div>
                            <Button onClick={handleContactUs} className='font-semibold' variant='contained' style={{ marginTop: 50, height: 50, fontSize: 20 }}>
                                Contact us
                            </Button>
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}

export default Page

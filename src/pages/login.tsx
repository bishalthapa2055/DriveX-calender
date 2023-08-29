import { Box, Button, TextField } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'

import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('')

    const navigate = useNavigate();


    const handleOtp = async () => {
        if (!phoneNumber) {
            window.alert("Enter Phone Number")
        }

        const res = await axios.post("http://localhost:5050/api/v1/auth/instructor/sendotp", {
            phone_number: phoneNumber
        })

        window.alert(`Your Otp code is ${res.data.otp}`)

        navigate('/instructor/verify', {
            replace: true,
        });
        localStorage.setItem("PhoneNumber", phoneNumber)


        // to remove the localStorage data after certain period 
        setTimeout(() => {
            localStorage.removeItem("PhoneNumber");

        }, 1 * 60 * 1000)


    }
    return (
        <Box sx={{
            alignContent: 'center',
            width: '100vw',
            height: "100vh",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Box sx={{
                width: 400,
                height: 300,
                textAlign: 'center',
                border: "1px solid grey",
                borderRadius: "80px",
                display: 'flex',
                flexDirection: 'column',
                alignItems: "center",
                padding: '20px'

            }}>



                <h2>
                    Enter Phone Number to login
                </h2>
                <TextField id="outlined-basic" label="Phone Number" variant="outlined" type='number' sx={{ width: "400px", mt: "20px" }}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />


                <Button variant="contained" sx={{ width: "200px", mt: '30px', height: '50px', mb: 0 }}
                    onClick={handleOtp}
                >Send Otp</Button>

            </Box>
        </Box>
    )
}

export default Login
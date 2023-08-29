import { Box, Button, TextField } from '@mui/material'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const Verify = () => {
    const [verifyOtp, setVerifyOtp] = useState('');
    const navigate = useNavigate()

    const handleVerify = async () => {

        try {

            if (!verifyOtp) {
                window.alert("Otp code is required")
            }
            const phone_number = localStorage.getItem("PhoneNumber")
            console.log(phone_number)

            const res = await axios.post("http://localhost:5050/api/v1/auth/instructor/verifyotp", {
                phone_number: phone_number,
                otp_code: verifyOtp
            })

            setTimeout(() => {
                localStorage.removeItem("PhoneNumber");

            }, 1 * 60 * 1000)

            if (res.data.accessToken) {

                localStorage.setItem("accessToken", res.data.accessToken)
                navigate("/instructor/profile", {
                    replace: true

                })
            }

        } catch (err) {
            window.alert("Invalid Otp Click Resend Otp")

        }



    }


    const handleResend = async () => {
        const res = await axios.post("http://localhost:5050/api/v1/auth/instructor/resendotp", {
            phone_number: localStorage.getItem("PhoneNumber")
        })


        window.alert(`Your Otp code is ${res.data.otp_code}`)


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
                    Enter OTP code to verify
                </h2>
                <TextField id="outlined-basic" label="OTP Code" variant="outlined" type='number' sx={{ width: "400px", mt: "20px" }}
                    onChange={(e) => setVerifyOtp(e.target.value)}
                />

                <Box sx={{ display: 'flex', gap: 2 }}>

                    <Button variant="contained" sx={{ width: "200px", mt: '30px', height: '50px', mb: 0 }} onClick={handleVerify}>Verify Otp</Button>
                    <Button variant="contained" sx={{ width: "200px", mt: '30px', height: '50px', mb: 0 }} onClick={handleResend}>Resend Otp</Button>
                </Box>

            </Box>
        </Box>
    )
}

export default Verify
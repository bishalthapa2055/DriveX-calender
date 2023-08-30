import React, { useEffect, useState } from 'react'
import { Box, TextField, Button } from "@mui/material"
import axios from 'axios'
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from "react-router-dom"
import { api } from '../../http/api';
const Index = () => {
    const [selectedImage, setSelectedImage] = useState('');
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')



    const navigate = useNavigate()


    useEffect(() => {
        const fetchData = async () => {
            const res = await api.get("http://localhost:5050/api/v1/instructor/profile/me")
            console.log(res)
            setFirstName(res.data.first_name)
            setLastName(res.data.last_name)
            setEmail(res.data.email)
            setSelectedImage(res.data.photo_url)

            const requiredFields = [
                'first_name',
                'last_name',
                'email',
                'photo_url'
            ]


            const allFields = requiredFields.every(field => !!res.data[field])

            if (allFields) {
                navigate("/instructor", {
                    replace: true
                })
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (firstName && lastName && email && selectedImage) {
            navigate("/instructor", {
                replace: true
            })
            console.log("hit")

            console.log(firstName, lastName, email, selectedImage)
        }
        console.log(firstName, lastName, email, selectedImage)
    }, [])

    const handleImageUpload = async (event: any) => {
        const imageFile = event.target.files[0];


        const formData = new FormData();
        formData.append('profile', imageFile);
        const imageUrl = await axios.post("http://localhost:5050/api/v1/common/upload-profile", formData)
        setSelectedImage(imageUrl.data.data)
    };

    const handleSubmit = async () => {

        if (!selectedImage && !firstName && lastName && !email) {
            window.alert("Fill all fields")
        }

        const res = await api.patch("http://localhost:5050/api/v1/instructor/profile", {
            first_name: firstName,
            last_name: lastName,
            email: email,
            photo_url: selectedImage
        })

        if (res) {
            navigate("/instructor", {
                replace: true
            })
        } else {
            window.alert("Error Occured")
        }

    }

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                // justifyContent: 'center',
                minHeight: '100vh',
                gap: 2,
                textAlign: 'center',
                padding: '20px'
            }}>
                <h1>Please Fill Out the Form</h1>
                <TextField id="outlined-basic" label="First Name" variant="outlined" sx={{ width: '500px' }} onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                <TextField id="outlined-basic" label="Last Name" variant="outlined" sx={{ width: '500px' }} onChange={(e) => setLastName(e.target.value)} value={lastName} />
                <TextField id="outlined-basic" label="Email" variant="outlined" sx={{ width: '500px' }} onChange={(e) => setEmail(e.target.value)} value={email} />


                <Box title="Profile Image" sx={{
                    background: selectedImage ? "green" : "red"
                }}>

                    <input type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ marginBottom: '10px' }}
                    // value={selectedImage}
                    />

                    {selectedImage && (
                        <>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}>

                                <CancelIcon onClick={() => setSelectedImage('')} sx={{
                                    float: 'top'
                                }}

                                />
                                <img
                                    src={selectedImage}
                                    alt="Uploaded"
                                    style={{ maxWidth: '100%', maxHeight: '200px' }}
                                />
                            </Box>
                        </>
                    )}


                </Box>
                <Button variant="contained" sx={{ width: "200px", mt: '30px', height: '50px', mb: 0 }} onClick={handleSubmit}>Create Profile</Button>
            </Box>

        </>
    )
}

export default Index
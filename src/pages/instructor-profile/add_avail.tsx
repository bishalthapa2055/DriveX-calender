import Grid from '@mui/material/Grid';
import { Button, TextField, Typography, Dialog } from '@mui/material';



import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { api } from '../../http/api';
const AddAvailability = ({ setOpen }) => {

    const [date, setDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')

    const navigate = useNavigate()



    const handleSubmit = async () => {
        if (!date && !startTime && !endTime) {
            window.alert("All fields are required")
        }

        const data = {
            "availability": {
                "day": `${date}`,
                "slots": [
                    {
                        "startTime": `${startTime}`,
                        "endTime": `${endTime}`
                    }
                ]
            }
        }

        const res = await api.post("http://localhost:5050/api/v1/instructor/calender/create", data)
        console.log(res)

        if (res) {
            setOpen(prev => !prev)
        } else {
            window.alert("Error occured")
        }
    }
    return (
        <>
            <Dialog
                open={true}
                maxWidth="xs"
                fullWidth
                // TransitionComponent={Transition}
                keepMounted
            // onClose={closeConfirmDelete}
            >
                <Typography variant='h4' sx={{ textAlign: 'center', margin: "10px" }}>Create Availability</Typography>

                <Grid container columnSpacing={4} rowSpacing={2}>
                    <Grid item xs={12} sx={{ mb: 1, display: "column", gap: 1 }}>



                        <Grid item xs={12}>
                            <TextField
                                size="small"
                                required
                                label="Date format YYYY-MM-DD"
                                name="date"
                                variant="outlined"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                sx={{
                                    width: "90%",
                                    mb: 1
                                }}


                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                size="small"
                                required
                                label="StartTime"
                                name="starttime"
                                variant="outlined"
                                sx={{
                                    width: "90%",
                                    mb: 1
                                }}
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}



                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                size="small"
                                fullWidth
                                required
                                label="EndTime"
                                name="endtime"
                                variant="outlined"
                                sx={{
                                    width: "90%"
                                }}
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}



                            />
                        </Grid>

                        <Button
                            variant='contained'

                            onClick={() => setOpen(prev => !prev)}
                            // disabled={!consent}
                            sx={{
                                mt: 2, mr: 5, backgroundColor: "red",
                                '&:hover': {
                                    backgroundColor: 'red', // Change this color for the hover effect
                                },
                            }}


                        >
                            GO BACK
                        </Button>


                        <Button
                            variant='contained'

                            onClick={handleSubmit}
                            // disabled={!consent}
                            sx={{
                                mt: 2, mr: 5, backgroundColor: "green",
                                '&:hover': {
                                    backgroundColor: 'green', // Change this color for the hover effect
                                },
                            }}


                        >
                            SUBMIT
                        </Button>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default AddAvailability
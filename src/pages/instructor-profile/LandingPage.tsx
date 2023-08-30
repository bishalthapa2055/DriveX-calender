import React, { useEffect, useState } from 'react'
import { api } from '../../http/api'
import { Box, Button } from "@mui/material"
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddAvailability from './add_avail';


interface AvailabilityDetails {
  _id: string;
  slots: [],
  day: string;
}



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const LandingPage = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [fullName, setFullName] = useState('')
  const [availability, setAvailability] = useState<AvailabilityDetails[]>([])
  const [open, setOpen] = useState(false)

  const [photo_url, setPhoto] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("http://localhost:5050/api/v1/instructor/profile/me")
      console.log(res.data)
      setFirstName(res.data.first_name)
      setLastName(res.data.last_name)
      setPhoto(res.data.photo_url)
      setFullName(`${res.data.first_name}` + " " + `${res.data.last_name}`)
      setAvailability(res.data.availability)
    }
    fetchData()
  }, [])

  console.log(availability)

  const handleCreateAvailability = () => {
    // window.alert("Hit")
    setOpen(!open)
  }

  return (
    <>
      {
        availability ?
          <>

            <Box sx={{
              display: 'flex',
              justifyContent: "center",
              textAlign: 'center'
            }}>

              <img src={photo_url} alt='profile' width="100" height="100" style={{
                borderRadius: '100px',
                border: "2px solid red"
              }} />
            </Box>

            <h3 style={{ textAlign: 'center' }}>Name  : {fullName}
            </h3>
            <Box sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2
            }}>
              <Button variant="contained" sx={{ width: "200px", mt: '30px', height: '50px', mb: 0 }} onClick={handleCreateAvailability}>Create Availability</Button>
            </Box>
            <TableContainer component={Paper} sx={{ mt: 0 }}>
              <Table sx={{ minWidth: 100 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>DATE \ DAY</StyledTableCell>
                    {
                      availability.map((item) => (
                        <>
                          <StyledTableCell align="right">{item.day}</StyledTableCell>
                          {/* <StyledTableCell align="right">Monday</StyledTableCell>
                          <StyledTableCell align="right">Tuesday</StyledTableCell>
                          <StyledTableCell align="right">Wednesday</StyledTableCell>
                          <StyledTableCell align="right">Thursday</StyledTableCell>
                        <StyledTableCell align="right">Saturday</StyledTableCell> */}
                        </>

                      ))
                    }
                    <StyledTableCell align="right">Operation</StyledTableCell>
                  </TableRow>
                </TableHead>


                <TableBody>
                  {/* {availability.map((data) => ( */}
                    <>
                      <StyledTableRow 
                      // key={data._id}
                      >
                        {/* <StyledTableCell component="th" scope="row">
                          {data.day}
                        </StyledTableCell> */}
                        <StyledTableCell align="right">Sunday</StyledTableCell>
                        <StyledTableCell align="right">Monday</StyledTableCell>
                        <StyledTableCell align="right">Tuesday</StyledTableCell>
                        <StyledTableCell align="right">Wednesday</StyledTableCell>
                        <StyledTableCell align="right">Thursday</StyledTableCell>

                      </StyledTableRow >
                    </>
                  {/* ))} */}
                </TableBody>
              </Table>
            </TableContainer>
          </>
          :
          "Availability Unavailable"
      }
      {
        open && (
          <AddAvailability setOpen={setOpen} />
        )
      }
    </>
  )
}

export default LandingPage
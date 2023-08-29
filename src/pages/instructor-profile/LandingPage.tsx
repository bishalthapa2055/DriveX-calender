import React, { useEffect, useState } from 'react'
import { api } from '../../http/api'
import { Box } from "@mui/material"
const LandingPage = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [fullName , setFullName] = useState('')

  const [photo_url, setPhoto] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("http://localhost:5050/api/v1/instructor/profile/me")
      console.log(res.data)
      setFirstName(res.data.first_name)
      setLastName(res.data.last_name)
      setPhoto(res.data.photo_url)
      setFullName(`${res.data.first_name}`+" " +`${res.data.last_name}`)
    }
    fetchData()
  })


  return (
    <>
      <Box sx={{
        display: 'flex',
        justifyContent: "center",
        textAlign: 'center'
      }}>

        <img src={photo_url} alt='profile' width="200" height="200" style={{
          borderRadius: '100px',
          border: "2px solid red"
        }} />
      </Box>
      <h3 style={{ textAlign: 'center' }}>Name  : {fullName}
      </h3>
    </>
  )
}

export default LandingPage
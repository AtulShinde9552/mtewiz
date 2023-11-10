import { Grid, IconButton, Typography, Box, Button } from '@mui/material'
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import  CloseIcon  from '@mui/icons-material/Close'
import React from 'react'
import { getCookie } from "../../../utils/auth";
import axios from "axios";
import { baseURL } from "../../../utils/constant";
import { toast } from "react-toastify";


const Adduser = ({closeEvent}) => {

  const [firstName, setfirstName] = useState()
  const [lastName, setlastName] = useState()
  const [companyName, setcompanyName] = useState()
  const [jobTitle, setjobTitle] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [rows, setRows] = useState([]);

const handleFirstName = (e) =>{
setfirstName(e.target.value)
}

const handleLastName = (e) =>{
setlastName(e.target.value)
}

const handleCompany = (e) =>{
setcompanyName(e.target.value)
}

const handleJob = (e) =>{
setjobTitle(e.target.value)
}

const handleEmail = (e) =>{
setEmail(e.target.value)
}

const handlePassword = (e) =>{
setPassword(e.target.value)
}

  const createUser =()=>{
  console.log(createUser);
  }




  const bearerToken = getCookie("bearerToken");
  const headers = {
    Authorization: `Bearer ${bearerToken}`,
  };

//   const payload = {
//     "firstName":"Bilal",
//     "lastName":"Khan",
//     "companyName":"Alltake",
//     "jobTitle":"IT",
//     "email":"bilalkhan@edgelinking.com",
//     "password":"abcdef"
// }

const payload ={
  handleFirstName,
  handleLastName,
  handleCompany,
  handleEmail,
  handleJob,
  handlePassword
}

  const fetchData = () => {
    axios
      .post(`${baseURL}user/createUser`, payload, {
        headers: { ...headers },
      })
      .then((response) => {
        console.log("Response received:", response);
        // const Response = response.data;
        // console.log("Mapped data:",Response.data.map((item) => ({ ...item, firstName: item.firstName }))
        // );
        // setRows(Response.data.map((item) => ({ ...item })));
        // console.log("Rows state:", rows);
      })
      .catch((err) => {
        console.error("Error:", err);

        toast.error(err?.response?.data?.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <>
     <Box sx={{m:2}} />
<Typography variant='h5' align='center'>
  Add User
</Typography>
<IconButton
style={{position:"absolute", top:"0", right:"0"}}
onClick={closeEvent}
>
  <CloseIcon/>
</IconButton>
<Box height={20} />
<Grid container spacing={2}>
  <Grid item xs={12}>
  <TextField id="outlined-basic" label="FirstName" variant="outlined" size='small' sx={{minWidth: "100%"}} value={firstName} onChange={handleFirstName}/>
  </Grid>

  <Grid item xs={12}>
  <TextField id="outlined-basic" label="LastName" variant="outlined" size='small' sx={{minWidth: "100%"}} value={lastName} onChange={handleLastName}/>
  </Grid>

  <Grid item xs={12}>
  <TextField id="outlined-basic" label="Company Name" variant="outlined" size='small' sx={{minWidth: "100%"}} value={companyName} onChange={handleCompany}/>
  </Grid>

  <Grid item xs={12}>
  <TextField id="outlined-basic" label="Job Title" variant="outlined" size='small' sx={{minWidth: "100%"}} value={jobTitle} onChange={handleJob}/>
  </Grid>

  <Grid item xs={12}>
  <TextField type='email' id="outlined-basic" label="Email" variant="outlined" size='small' sx={{minWidth: "100%"}} value={email} onChange={handleEmail}/>
  </Grid>

  <Grid item xs={12}>
  <TextField  id="outlined-basic" label="Password" variant="outlined" size='small' sx={{minWidth: "100%"}} value={password} onChange={handlePassword}/>
  </Grid>
  <Grid item xs={12}>
    <Typography variant='h5' align='center'>
      <Button variant="contained" type='submit'>
          Submit
      </Button>
    </Typography>
  </Grid>
</Grid>
<Box sx={{m:4}} />
    </>
  )
}

export default Adduser
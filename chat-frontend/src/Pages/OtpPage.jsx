import React, {useState} from 'react'
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Grid,
    Typography,
    Container,
    Alert,
    AlertTitle
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useOtpVerifyMutation } from '../Services/User/UserApi';

const OtpPage = () => {
    const theme = createTheme()
    const navigate = useNavigate()
    const [serverMsg, setServerMsg] = useState({})
    const [otpVerify, {isLoading}] = useOtpVerifyMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
            email: data.get('email'),
            otp: data.get('otp')
        }
        try {
            const res = await otpVerify(actualData);
            if (res.error){
                setServerMsg({ msg: "There are some errors, Please try again!" });
            }else if(res.data){
                navigate('/signin')
            }
        }catch (error) {
            setServerMsg({ msg: "There are some errors, Please try again!" });
        }
    }
  return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">

    <CssBaseline />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '50px',
        }}
      >
        <Typography component="h1" variant="h5">
          Verify Otp
        </Typography>
        {serverMsg.msg ? <Alert severity='error'>{serverMsg.msg}</Alert> : ''}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}  sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="otp"
                label="Otp"
                type="otp"
                id="otp"
            />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: '16px 0' }}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  </ThemeProvider>
  )
}

export default OtpPage

import React, {useState, useEffect} from 'react';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Grid,
    Typography,
    Container,
    Alert,
  } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material';
import { Link } from 'react-router-dom';
import { setUserToken } from '../Features/User/AuthSlice';
import { useLoginUserMutation } from '../Services/User/UserApi';
import { storeToken, getToken } from '../Services/localStorageToken';
const SigninPage = () => {
    const theme = createTheme();
    const [serverMsg, setServerMsg] = useState({})
    const navigate = useNavigate();
    const [loginUser, { isLoading }] = useLoginUserMutation();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
            email: data.get('email'),
            password: data.get('password')
        }

        try {
            const res = await loginUser(actualData);
            if (res.error) {
                setServerMsg({ msg: "Mismatch in Email or Password" });
            }else if(res.data){
                storeToken(res.data)
                const {token} = getToken();
                dispatch(setUserToken({ token: token }));
                navigate('/');
            }
        } catch (error) {
            setServerMsg({ msg: "Mismatch in Email or Password" });
        }
        document.querySelector('form').reset();
    }
    let { token } = getToken();
    useEffect(() => {
        dispatch(setUserToken({token: token }));
    }, [token, dispatch]);

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
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
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
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
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




            <Grid container >
              <Grid item className='ms-5'>
                <Link className='bg-white text-dark ms-3 text-center text-decoration-none' to="/signup" >
                  Don't you have an account? Sign up
                </Link>
                <br/>
                <Link className='bg-white text-dark ms-2 text-decoration-none' to="/send_password_reset_email" >
                  Forgot Password?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </ThemeProvider>
  )
}

export default SigninPage

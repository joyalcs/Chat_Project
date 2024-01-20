import './App.css'
import { Navigate, Route, Routes} from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import SigninPage from './Pages/SigninPage'
import OtpPage from './Pages/OtpPage'
import ResetPasswordPage from './Pages/ResetPasswordPage'
import PasswordResetEmailPage from './Pages/PasswordResetEmailPage'
import HomePage from './Pages/HomePage'

function App() {

  return (
    <>
      <Routes>
        <Route path='signup' element={<RegisterPage/>}/>
        <Route path='signin' element={<SigninPage/>}/>
        <Route path='otp-verify' element={<OtpPage/>}/>
        <Route path="/send_password_reset_email" element={<PasswordResetEmailPage/>}/>
        <Route path="api/users/reset/:uid/:token" element={<ResetPasswordPage/>}/>
        <Route path="/" element={<HomePage/>}/>
      </Routes>

    </>
  )
}

export default App

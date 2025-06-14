import { Login, SignUp, VerifyEmail,  Home, ForgotPassword } from './pages';
import { Navigate, Routes, Route } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import { useAuthStore } from '../store/authStore';
import { useEffect } from 'react';
import LoadingSpinner from './components/LoadingSpinner';
import ResetPassword from './pages/ResetPassword';


//protect routes that require auth
const ProtectedRoute = ({ children }) => {
  const {isAuthenticated, user} = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />
  }

  return children;
}

//redirecting authenticated users to home page
const RedirectVerifiedUser = ({children}) => {
  const {isAuthenticated, user} = useAuthStore();

  if(isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />
  }
  return children;
}

function App() { 
  const {isCheckingAuth, checkAuth} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  if (isCheckingAuth) return <LoadingSpinner/>

  return (
    <div className="min-h-screen relative">
        <video 
        autoPlay 
        loop 
        muted 
        className="absolute top-0 left-0 w-full h-full object-cover z-0" src="/background.mp4">
        </video>
        <div className="relative z-10">
            <Routes>
                <Route path="/" element={
                  <ProtectedRoute>
                    <Home/>
                  </ProtectedRoute>
                }/>
                <Route path="/signup" element={
                  <RedirectVerifiedUser>
                    <SignUp/>
                  </RedirectVerifiedUser>
                }/>
                <Route path="/login" element={
                  <RedirectVerifiedUser>
                    <Login/>
                  </RedirectVerifiedUser>
                }/>
                <Route path="/verify-email" element={<VerifyEmail/>}/>
                <Route path="/forgot-password" element={
                  <RedirectVerifiedUser>
                    <ForgotPassword/>
                  </RedirectVerifiedUser>
                }/>
                <Route path="/reset-password/:token" element={
                  <RedirectVerifiedUser>
                    <ResetPassword/>
                  </RedirectVerifiedUser>
                }/>

                {/* catching all routes */}
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
            <Toaster/>
        </div>
    </div>
  )
}

export default App

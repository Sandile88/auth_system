import { Login, SignUp, VerifyEmail } from './pages';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from "react-hot-toast";



function App() {

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
                <Route path="/" element={"Home"}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/verify-email" element={<VerifyEmail/>}/>
            </Routes>
            <Toaster/>
        </div>
    </div>
  )
}

export default App

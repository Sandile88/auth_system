import { useState } from 'react';
import { Input } from '../components/input';
import { motion } from 'motion/react';
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from '../../store/authStore';
import { Button } from '../components/button';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error} = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  }

  return (
    <div className="min-h-screen flex items-center justify-center">

    <motion.div initial={{ opacity: 0, y:20 }}
    animate={{ opacity: 1, y:0 }}
    transition={{ duration: 0.5 }}
    className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
    <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-white to-sky-300 text-transparent bg-clip-text">
          Welcome Back
        </h2>
      <form onSubmit={handleLogin}>

      <Input icon={Mail}
      type ="email"
      placeholder="Email Address"
      value={email}
      onChange={(e) => setEmail(e.target.value)}/>

      <Input icon={Lock}
      type ="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}/>

      <div className="flex items-center mb-6">
        <Link to={"/forgot-password"} className="text-sm text-blue-400 hover:underline">
          Forgot password?
          </Link>
      </div>
      {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}

        <Button type="submit" isLoading={isLoading}>
          Login
				</Button>
      </form>
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center"> 
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-blue-400 hover:underline">
            Sign up</Link>
          </p>
        </div>
    </motion.div>
    </div>
  )
}

export default Login
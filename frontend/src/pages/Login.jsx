import React, { useState } from 'react'
import { Input } from '../components/input'
import { motion } from 'motion/react'
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
  }

  return (
    <motion.div initial={{ opacity: 0, y:20 }}
    animate={{ opacity: 1, y:0 }}
    transition={{ duration: 0.5 }}
    className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
    <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-white to-sky-300 text-transparent bg-clip-text">
          Welcome Back
        </h2>
      </div>
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
      </form>
      
    </motion.div>
  )
}

export default Login
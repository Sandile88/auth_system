import { motion } from 'motion/react'
import React, { useState } from 'react'
import { Input } from '../components/input'
import { User, Mail, Lock } from 'lucide-react'
import { Link } from 'react-router-dom';
import PwdEvaluator from '../components/pwdEvaluator'


const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y:20 }}
        animate={{ opacity: 1, y:0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-white to-sky-300 text-transparent bg-clip-text">
              Create An Account
            </h2>

            <form onSubmit={handleSignUp}>
              <Input icon={User}
              type ="name"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}/>

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
              <PwdEvaluator password={password}/>

              <motion.button className="mt-5 w-full py-3 px-4  bg-gradient-to-r from-blue-500 to-sky-600 text-white font-bold full rounded-lg shadow-lg hover:from-blue-600
              hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit">
                Sign Up
              </motion.button>
            </form>
        </div>
        <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center"> 
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-400 hover:underline">Login</Link>
          </p>

        </div>
      </motion.div>
    </div>
  )
}

export default SignUp
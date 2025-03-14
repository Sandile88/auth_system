import { motion } from 'motion/react'
import React from 'react'

const SignUp = () => {

  const handleSignUp = () => {

  }
  return (
    <motion.div 
    initial={{ opacity: 0, y:20 }}
    animate={{ opacity: 1, y:0 }}
    transition={{ duration: 0.5 }}
    className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-white to-sky-300 text-transparent bg-clip-text">
            Create An Account
          </h2>

          <form onSubmit={handleSignUp}></form>
      </div>
    </motion.div>
  )
}

export default SignUp
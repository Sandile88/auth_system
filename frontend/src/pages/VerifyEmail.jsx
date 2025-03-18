import React, { useState } from 'react'
import { motion } from 'motion/react'
import { Input } from '../components/input'


const VerifyEmail = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  handleChange = () => {

  }
  handleKeyDown = () => {
    
  }

  return (
    <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <motion.div initial={{ opacity: 0, y:-50 }}
    animate={{ opacity: 1, y:0 }}
    transition={{ duration: 0.5 }}
    className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden p-8 w-full">
       <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-white to-sky-300 text-transparent bg-clip-text">
          Verify Email
        </h2>
         <p className="text-sm text-gray-300 m-6">
          Enter the 6-digit code sent to your email address
        </p>

        <form className="space-y-6">
          <div className="flex justify-between">
            {code.map((num, index)) => (
              <Input
              key={index} />
            )}

          </div>
        </form>

      </motion.div>
    </div>
  )
}
 
export default VerifyEmail
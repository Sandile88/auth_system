import { useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { motion } from 'motion/react'
import { Input } from '../components/input'


const VerifyEmail = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const isLoading = false;

  const  handleChange = ( index, value) => {
    const newCode = [...code];

    // handling pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
			for (let i = 0; i < 6; i++) {
				newCode[i] = pastedCode[i] || "";
			}
			setCode(newCode);

      
			// Focus on the last non-empty input or the first empty one
			const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
			const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
			inputRefs.current[focusIndex].focus();

    } else {
      newCode[index] = value;
			setCode(newCode);

			// Move focus to the next input field if value is entered
			if (value && index < 5) {
				inputRefs.current[index + 1].focus();
			}
    }

  }

  // handling number deletion, focuses on previous digit space
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
			inputRefs.current[index - 1].focus();
		}
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    console.log(`Verification code submitted: ${verificationCode}`)
  }

  // auto submit when all fields are filled
  useEffect(() => {
    if(code.every(digit => digit !== '')) {
      handleSubmit(new Event('submit'));
    }
  }, [code])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y:-50 }}
      animate={{ opacity: 1, y:0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden p-8 w-full max-w-md ">
       <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-white to-sky-300 text-transparent bg-clip-text">
          Verify Your Email
        </h2>
         <p className="text-sm text-gray-300 m-6">
          Enter the 6-digit code sent to your email address
        </p>

         <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type='text'
              maxLength='6' //pasting code longer than 6 digits will not work
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className='w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none'
              />
            ))}
          </div>
          <motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						type='submit'
						disabled={isLoading || code.some((digit) => !digit)}
						className='w-full bg-gradient-to-r from-blue-500 to-sky-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50'
					>
						{isLoading ? "Verifying..." : "Verify Email"}
					</motion.button>
        </form> 

      </motion.div>
    </div>
  )
}
 
export default VerifyEmail
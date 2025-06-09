import { motion } from "framer-motion";
import { Loader } from "lucide-react";

export function Button({ children, type = "button", onClick, isLoading = false, disabled = false, className = "", loader = <Loader className="w-6 h-6 animate-spin mx-auto" /> , ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-sky-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 disabled:opacity-50 ${className}`}
      {...props}
    >
      {isLoading ? loader : children}
    </motion.button>
  );
}

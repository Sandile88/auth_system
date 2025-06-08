import {create} from  "zustand"; //state management library
import axios from "axios";
// import { verify } from "crypto";

const API_URL = "http://localhost:5000/api/auth";
axios.defaults.withCredentials = true;
export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,

    signup: async (email, password, name) => {
        set({ isLoading: true, error: null});
        try {
            const response = await axios.post(`${API_URL}/signup`, { email, password, name });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false});
        } catch (error) {
            set({ user: error.response.data.message || "Error signing up", isLoading: false});
            throw error;  
        }
    },

    verifyEmail: async (verificationCode) => {
        set({ isLoading: true, error: null});
        try {
            const response = await axios.post(`${API_URL}/verify-email`, { verificationCode });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false});
            return response.data;
        } catch (error) {
            set({ user: error.response.data.message || "Error  verifying email", isLoading: false});
            throw error;  
        }
    }
}))
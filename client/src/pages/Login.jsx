import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from 'react-hot-toast';
import api from "../api";
import LoadingBar from "../components/LoadingBar";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const validateForm = () => {
        if (!formData.email) {
            toast.error("Email is required");
            return false;
        }
        if (!formData.password) {
            toast.error("Password is required");
            return false;
        }
        if (!formData.email.includes('@')) {
            toast.error("Please enter a valid email");
            return false;
        }
        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        try {
            const res = await api.post("/api/token/", {
                username: formData.email.split("@")[0],
                password: formData.password
            });

            const { access, refresh } = res.data;
            localStorage.setItem("access", access);
            localStorage.setItem("refresh", refresh);

            if (formData.rememberMe) {
                localStorage.setItem("rememberMe", "true");
            }

            toast.success("Login successful! Redirecting...");
            
            // Small delay for toast to be visible
            setTimeout(() => {
                navigate("/");
            }, 1000);

        } catch (error) {
            let errorMessage = 'Login failed';
            if (error.response?.data?.detail) {
                errorMessage = error.response.data.detail;
            } else if (error.message) {
                errorMessage = error.message;
            }
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            {loading && (
                <LoadingBar />
            )}
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md transform transition-all duration-200 hover:scale-[1.01]">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h1>
                
                <p className="text-center mb-6">
                    <Link to="/register" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                        Don't have an account?
                    </Link>
                </p>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <input
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 
                            focus:border-transparent transition-all duration-200"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                        />
                        <input
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 
                            focus:border-transparent transition-all duration-200"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                        />
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    id="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 
                                    border-gray-300 rounded"
                                />
                                <label htmlFor="rememberMe" className="text-gray-700">
                                    Remember me
                                </label>
                            </div>
                            <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                                Forgot password?
                            </Link>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 
                        disabled:opacity-50 font-semibold transition-all duration-200"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Logging in...
                            </span>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>
            </div>
            
            <Toaster 
                position="bottom-center"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                    success: {
                        duration: 2000,
                        style: {
                            background: '#059669',
                        },
                    },
                    error: {
                        duration: 4000,
                        style: {
                            background: '#DC2626',
                        },
                    },
                }}
            />
        </div>
    );
};

export default Login;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { toast, Toaster } from 'react-hot-toast';
import LoadingIndicator from "../components/LoadingIndicator";

function Login() {
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

            toast.success("Login successful!");
            navigate("/");
        } catch (error) {
            const errorMessage = error.response?.data?.detail || error.message;
            toast.error(`Login failed: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md transform transition-all hover:scale-[1.01]">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 tracking-wide">Login</h1>
                <p className="text-center mb-6">
                    <Link to="/register" className="text-blue-600 hover:text-blue-800 transition-colors duration-200 underline">
                        Don't have an account?
                    </Link>
                </p>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <input
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                        />
                        <input
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                        />
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                id="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <label htmlFor="rememberMe" className="text-gray-700">Remember me</label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 font-semibold shadow-md hover:shadow-lg disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
            <Toaster position="bottom-center" />
        </div>
    );
}


export default Login;
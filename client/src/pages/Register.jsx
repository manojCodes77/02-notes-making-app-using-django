import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from 'react-hot-toast';
import api from "../api";
import LoadingIndicator from "../components/LoadingIndicator";

function Register() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        acceptTerms: false
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
        if (!formData.acceptTerms) {
            toast.error("Please accept the terms and conditions");
            return false;
        }
        return true;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setLoading(true);
        try {
            await api.post("/api/user/register/", {
                email: formData.email,
                password: formData.password,
                username: formData.email.split("@")[0],
                first_name: formData.firstName,
                last_name: formData.lastName
            });
            toast.success("Registration successful!");
            navigate("/login");
        } catch (error) {
            const errorMessage = error.response?.data?.detail || error.message;
            toast.error(`Registration failed: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md transform transition-all hover:scale-[1.01]">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 tracking-wide">Register</h1>
                <p className="text-center mb-6">
                    <Link to="/login" className="text-blue-600 hover:text-blue-800 transition-colors duration-200 underline">
                        Already have an account?
                    </Link>
                </p>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                        <input
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                        />
                        <input
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                        />
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
                                name="acceptTerms"
                                id="acceptTerms"
                                checked={formData.acceptTerms}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <label htmlFor="acceptTerms" className="text-gray-700">
                                I accept the terms and conditions
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 font-semibold shadow-md hover:shadow-lg disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
            </div>
            <Toaster position="bottom-center" />
        </div>
    );
}

export default Register;
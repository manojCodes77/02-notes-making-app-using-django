import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { useState, useEffect } from "react";
import LoadingIndicator from "./LoadingIndicator";

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem("refresh");
        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem('access', res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        const token = localStorage.getItem('access');
        if (!token) {
            setIsAuthorized(false);
            return;
        }

        try {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            
            if (decoded.exp < currentTime) {
                await refreshToken();
            } else {
                setIsAuthorized(true);
            }
        } catch (error) {
            console.error('Token verification failed:', error);
            setIsAuthorized(false);
        }
    };

    if (isAuthorized === null) {
        return (
            <div className="loading-container flex flex-col items-center justify-center h-screen">
            <LoadingIndicator />
            <LoadingIndicator />
            <LoadingIndicator />
            </div>
        );
    }

    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
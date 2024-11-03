import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from "../App";
import Login from "../Pages/Login/login";
import Register from "../Pages/Register/Register";
import { useEffect } from "react";
import Header from "../components/Header/Header";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter
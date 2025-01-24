import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import App from '../App';
import LoginPage from '../pages/LoginPage';
import Page404 from '../pages/BasePage/Page404';





//I put AppRoutes and MenuItems together in a file because they are related.
export const AppRoutes = () => {
    console.log('AppRoutes');
    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/home" element={<Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<Page404 />} />
            </Route>
        </Routes>
    );
};

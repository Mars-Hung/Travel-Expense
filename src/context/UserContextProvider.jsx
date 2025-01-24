import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
const secretKey = 'TravelExpense5678';//use this to crypto userData which is stored in localStorage.
export const Login_Expiration_Time = 30 * 60;//(30*60 = 30mins)
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const [loginUser, setLoginUser] = useState('');

    const login = (userData) => {
        //console.log(userData);
        setLoginUser(userData);
        const newUserData = { ...userData, loginTime: new Date() };
        //console.log('login()', newUserData);
        const encryptedUserData = CryptoJS.AES.encrypt(JSON.stringify(newUserData), secretKey).toString();
        localStorage.setItem('userData', encryptedUserData);
        localStorage.setItem('userExpirationTime', Date.now() + (Login_Expiration_Time * 1000));
    };
    const logout = () => {
        console.log('UserProvider.logout()');
        localStorage.removeItem("userData");
        localStorage.removeItem("userExpirationTime");
        setLoginUser(null);
        navigate('/logout');
    };
    const isAuthenticated = () => {
        const encryptedUserData = localStorage.getItem('userData');
        const expirationTime = localStorage.getItem('userExpirationTime');
        //console.log(expirationTime, '-', Date.now(), '=', expirationTime - Date.now());
        if (expirationTime && Date.now() > parseInt(expirationTime, 10) + 3000) {
            return false;
        }
        if (!encryptedUserData) {
            return false;
        } else {
            try {
                const decryptedUserData = JSON.parse(CryptoJS.AES.decrypt(encryptedUserData, secretKey).toString(CryptoJS.enc.Utf8));
                if (decryptedUserData && decryptedUserData.IsActived) {
                    return true;
                } else {
                    return false;
                }
            } catch (e) {
                localStorage.clear();
                console.log(e)
                return false;
            }
        }
    };
    const resetUserExpirationTime = () => {
        localStorage.setItem('userExpirationTime', Date.now() + (Login_Expiration_Time * 1000));
    }
    return (
        <UserContext.Provider value={{ ...loginUser, setLoginUser, logout, login, isAuthenticated, resetUserExpirationTime }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

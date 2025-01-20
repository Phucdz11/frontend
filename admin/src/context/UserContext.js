import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState(''); // Thêm fullname
    const [password, setPassword] = useState(''); // Thêm password

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedFullname = localStorage.getItem('fullname'); // Lấy fullname từ localStorage
        const storedPassword = localStorage.getItem('password'); // Lấy password từ localStorage

        if (storedUsername) {
            setUsername(storedUsername);
        }
        if (storedFullname) {
            setFullname(storedFullname);
        }
        if (storedPassword) {
            setPassword(storedPassword);
        }
    }, []); 

    useEffect(() => {
        if (username) {
            localStorage.setItem('username', username);
        }
        if (fullname) {
            localStorage.setItem('fullname', fullname); // Lưu fullname vào localStorage
        }
        if (password) {
            localStorage.setItem('password', password); // Lưu password vào localStorage
        }
    }, [username, fullname, password]);

    return (
        <UserContext.Provider value={{ username, fullname, password, setUsername, setFullname, setPassword }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
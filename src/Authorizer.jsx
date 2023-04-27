import React, {useState, useEffect} from 'react';
import {Auth} from "./Firebase.jsx";

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() =>{
        Auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });
    }, []);
    if (loading) {
        console.log("loading");
    }
    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    );
};
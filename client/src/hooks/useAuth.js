import React, { useState, useEffect, useContext, createContext } from "react";
import { firebase_auth } from "../cloud/firebase_init";

const authContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useState(null);

    // Wrap any Firebase methods we want to use making sure ...
    // ... to save the user to state.
    const signin = (email, password) => {
        return firebase_auth
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                setUser(response.user);

                return response.user;
            });
    };

    const signup = (email, password) => {
        return firebase_auth
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                setUser(response.user);
                return response.user;
            });
    };

    const signout = () => {
        return firebase_auth.signOut().then(() => {
            setUser(false);
        });
    };

    const sendPasswordResetEmail = (email) => {
        return firebase_auth.sendPasswordResetEmail(email).then(() => {
            return true;
        });
    };

    const confirmPasswordReset = (code, password) => {
        return firebase_auth.confirmPasswordReset(code, password).then(() => {
            return true;
        });
    };

    useEffect(() => {
        const unsubscribe = firebase_auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(false);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    // Return the user object and auth methods
    return {
        user,
        signin,
        signup,
        signout,
        sendPasswordResetEmail,
        confirmPasswordReset,
    };
}

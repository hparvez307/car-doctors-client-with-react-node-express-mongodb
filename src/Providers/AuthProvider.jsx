import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../firebase/firebase.config';


export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
     const [user, setUser] = useState(null);
     const [loading, setLoading] = useState(true);
     const googleProvider = new GoogleAuthProvider();

    const googleSignIn = () =>{
        return signInWithPopup(auth, googleProvider);
    } 


    const createUser = (email, password) => {
     
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const login = (email, password) => {
       
        return signInWithEmailAndPassword(auth, email, password);
    }


    const logOut = () => {
        
        return signOut(auth)
    }


            useEffect(()=> {
                
                const unsubscribe = onAuthStateChanged(auth, loggedUser => {
                   
                    setUser(loggedUser);
                    setLoading(false)
                    if(loggedUser && loggedUser.email ){
                        const user = {
                            email: loggedUser.email
                        }
                    //    jwt token
                        fetch('https://car-doctor-server-mu-teal.vercel.app/jwt',{
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(user)
                        })
                        .then(res => res.json())
                        .then(data => {
                            console.log('jwt response',data);
                            // local storage is not the best place (its the 2nd best) to store the jwt token
                           localStorage.setItem('car-token', data.token);
                           
                        })
                    }else{
                        localStorage.removeItem('car-token');
                    }
                    
                })
                return () => {
                    
                    return unsubscribe();
                    
                }
            },[])

    const authInfo = {
        user,
        loading,
        createUser,
        login,
        logOut,
        googleSignIn
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
import { createContext, useEffect, useState } from "react";
import {  createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiosOpen from "../Hooks/useAxiosOpen";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosOpen = useAxiosOpen();

    const createUser = (email,password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const updateUserProfile = (name, photo)=>{
        return updateProfile(auth.currentUser, {
            displayName: name,photoURL: photo
          })
    }


    const signIn = (email,password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut = ()=>{
        setLoading(true);
        return signOut(auth)
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
            if(currentUser){
                // get token and store client
                const userInfo = {email:currentUser.email};
                axiosOpen.post('/jwt',userInfo)
                .then(res =>{
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token);
                    }
                })

            }else{
                // tode: remove token(if token in the client side:)
                localStorage.removeItem('access-token')
            }
            setLoading(false);
        });
        return () => {
            return unSubscribe();
        }
    },[])

    const authInfo = {user, loading, createUser, signIn, logOut, updateUserProfile, }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
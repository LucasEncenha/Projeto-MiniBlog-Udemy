import {db} from "../firebase/config";

import{
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth"

import { useState,useEffect } from "react"

export const useAuthentication = () => {
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(null);

    //cleanup
    //deal with memory leak
    const [cancelled,setCancelled] = useState();

    const auth = getAuth();

    function checkIfIsCancelled(){
        if(cancelled){
            return;
        }
    }

    //register
    const createUser = async (data) => {
        checkIfIsCancelled();

        setLoading(true);
        setError(null);

        try{

            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user,{
                displayName: data.displayName
            })

            return user;
        }
        catch(error){
            console.log(error.message);
            console.log(typeof error.message);

            let systemErrorMessege

            if(error.message.includes("Password")){
                systemErrorMessege = "A senha precisa conter pelo menos 6 caracteres."
            }else if(error.message.includes("email-already")){
                systemErrorMessege = "E-mail já cadastrado."
            }else{
                systemErrorMessege = "Ocorreu um erro, por favor tente mais tarde."
            }
            setLoading(false);
            setError(systemErrorMessege);
        }
    }
    
    //logout - sign out
    const logout = () => {
        checkIfIsCancelled();

        signOut(auth);
    };

    //login - sign in
    const login = async(data) =>{
        checkIfIsCancelled();

        setLoading(true);
        setError(false);

        try {
            
            await signInWithEmailAndPassword(auth,data.email,data.password);

            setLoading(false);

        } catch (error) {
            let systemErrorMessege;

            if(error.message.includes("auth/invalid-credential")){
                systemErrorMessege = "E-mail ou senha"
            }else{
                systemErrorMessege = "Ocorreu um erro, por favor tente mais tarde."
            }
            console.log(error.message);
            setError(systemErrorMessege);
            setLoading(false);

        }
    }

    useEffect(() => {
        return () => setCancelled(true);
    },[])

    return{
        auth,
        createUser,
        error,
        loading,
        logout,
        login,
    };
};
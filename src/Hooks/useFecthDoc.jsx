import { useState,useEffect } from "react";
import {db} from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export const useFetchDoc = (docCollection,id) => {
    const [docm,setDocm] = useState(null);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(null);

    //deal with memory leak
    const [cancelled,setCancelled] = useState(false);

    useEffect(() => {

        const loadDocument = async() => {

            setLoading(true);

            try {
                const docRef = await doc(db,docCollection,id);
                const docSnap = await getDoc(docRef);

                setDocm(docSnap.data());

                setLoading(false);

            } catch (error) {
                console.log(error);
                setError(error.message);

                setLoading(false);
            }
        }
        loadDocument();
    },[docCollection,id,cancelled]);

    useEffect(() => {
        return () => setCancelled(true);
    },[]);
    console.log(docm);
    return {docm,loading,error};
};

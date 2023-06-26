// @ts-nocheck
import { auth } from "$lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";



export const authHandlers = {
    signup: async (email,pass) =>{
        await createUserWithEmailAndPassword(auth,email,pass)
    },
    login: async (email,pass) =>{
        await signInWithEmailAndPassword(auth,email,pass)
    },
    logout: async () =>{
        await signOut(auth)
    }
}
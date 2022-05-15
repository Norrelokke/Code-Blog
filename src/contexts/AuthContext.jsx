import React, { createContext, useContext, useEffect, useState } from 'react'
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    updateEmail,
    updatePassword,
    updateProfile,
} from 'firebase/auth'
import { auth } from '../firebase'
import { HashLoader } from 'react-spinners'

const AuthContext = createContext()

const useAuthContext = () => {
    return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signout = (email, password) => {
        return signOut(auth)
    }

    const resetPassword = (email) => {
		return sendPasswordResetEmail(auth, email)
	}

	const setEmail = (newEmail) => {
		return updateEmail(currentUser, newEmail)
	}

	const setPassword = (newPassword) => {
		return updatePassword(currentUser, newPassword)
	}

	const setDisplayName = (name) => {
		return updateProfile(currentUser, {
			displayName: name,
		})
	}
    

    useEffect(() => {
        // för att behålla oss inloggade
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        })
    }, [])

    const contextValues = {
        signup,
        signin,
        signout,
        currentUser,
        loading,
        resetPassword,
		setDisplayName,
		setEmail,
		setPassword,
    }


    return (
        <AuthContext.Provider value={contextValues}>
            {loading && (<div className="d-flex justify-content-center vh-100 my-5 align-items-center"><HashLoader color={"#222"} size={40} /></div>)}
            {!loading && children}
        </AuthContext.Provider>
    )
}

export { useAuthContext, AuthContextProvider as default }
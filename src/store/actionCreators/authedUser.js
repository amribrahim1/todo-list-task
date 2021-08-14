import { showLoading, hideLoading } from 'react-redux-loading-bar';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { signIn, signUp, logout } from '../utils/firebase';

const db = firebase.firestore();
db.settings({ ignoreUndefinedProperties: true })

export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const NEW_USER = 'NEW_USER';

function setAuthedUser (user, error=null) {
    return {
        type: SET_AUTHED_USER,
        user,
        error
    }
}

export function handleSetAuthedUser () {
    return (dispatch) => {
        dispatch(showLoading())
        return firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                dispatch(setAuthedUser(user))
                dispatch(hideLoading())
            } else {
                dispatch(setAuthedUser(null))
                dispatch(hideLoading())
            }
        })
    }
}

export function handleSignIn (email,password) {
    return async (dispatch) => {
        dispatch(showLoading())
        try {
            const userCredential = await signIn(email, password);
            dispatch(hideLoading())
            return dispatch(setAuthedUser(userCredential.user));
        } catch (error) {
            dispatch(hideLoading())
            return dispatch(setAuthedUser(null, error));
        }
        
    }
}

export function handleNewUser (email,password) {
    return async (dispatch) => {
        try {
            const userCredential = await signUp(email, password);
            // console.log(userCredential);
            return dispatch(setAuthedUser(userCredential.user));
        } catch (error) {
            return dispatch(setAuthedUser(null, error));
        }
    }
}

export function handleLogout () {
    return async (dispatch) => {
        await logout();
        return dispatch(setAuthedUser(null));
    }
}
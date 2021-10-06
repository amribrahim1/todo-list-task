import { Dispatch } from 'redux'; 
import firebase from "firebase/app";
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { auth, signIn, signUp, logout } from '../utils/firebase';
import { ActionType } from "../actionTypes";
import { AuthedUserAction, LoadingAction } from "../actions";

// function setAuthedUser (user, error=null) {
//     return {
//         type: ActionType.SET_AUTHED_USER,
//         user,
//         error
//     }
// }

export function handleSetAuthedUser () {
    return (dispatch:Dispatch<AuthedUserAction | LoadingAction>) => {
        dispatch(showLoading())
        return auth().onAuthStateChanged((user:firebase.User | null) => {
            if (user) {
                dispatch(hideLoading())
                return dispatch({
                    type: ActionType.SET_AUTHED_USER,
                    user: {uid: user.uid, email: user.email, displayName: user.displayName},
                    error: null
                })
            } else {
                dispatch(hideLoading())
                return dispatch({
                    type: ActionType.SET_AUTHED_USER,
                    user,
                    error: null
                })
            }
        })
    }
}

export function handleSignIn (email:string,password:string) {
    return async (dispatch:Dispatch<AuthedUserAction>) => {
        try {
            const userCredential: firebase.User | null = (await signIn(email, password)).user;
            return dispatch({
                type: ActionType.SET_AUTHED_USER,
                user: {uid: userCredential?.uid, email: userCredential?.email, displayName: userCredential?.displayName},
                error: null
            });
        } catch (error: any) {
            return dispatch({
                type: ActionType.SET_AUTHED_USER,
                user: null,
                error
            });
        }
        
    }
}

export function handleNewUser (email:string,password:string) {
    return async (dispatch:Dispatch<AuthedUserAction>) => {
        try {
            const userCredential = (await signUp(email, password)).user;
            // console.log(userCredential);
            return dispatch({
                type: ActionType.SET_AUTHED_USER,
                user: {uid: userCredential?.uid, email: userCredential?.email, displayName: userCredential?.displayName},
                error: null
            });
        } catch (error: any) {
            return dispatch({
                type: ActionType.SET_AUTHED_USER,
                user: null,
                error
            });
        }
    }
}

export function handleLogout () {
    return async (dispatch:Dispatch<AuthedUserAction>) => {
        await logout();
        return dispatch({
            type: ActionType.SET_AUTHED_USER,
            user: null,
            error: null
        });
    }
}
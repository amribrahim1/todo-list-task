import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";


export const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: "todo-list-task-ca922.firebaseapp.com",
    projectId: "todo-list-task-ca922",
    storageBucket: "todo-list-task-ca922.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
db.settings({
    ignoreUndefinedProperties: true,
    merge: true
})

export function signIn (email,password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
}  

export function signUp (email,password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
}

export function logout() {
    return firebase.auth().signOut()
}

export function getTodos() {
    const user = firebase.auth().currentUser
    return db.collection("todos").where("user","==",  user.uid).orderBy('timestamp', 'asc').get()
}

export function addTodo(todo) {
    const user = firebase.auth().currentUser
    return db.collection("todos").add({      
        user: user.uid,
        todo,
        done: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
}

export function editTodo(id, todo) {
    return db.collection("todos").doc(id).update({ 
        todo,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
}

export function deleteTodo(id) {
    return db.collection("todos").doc(id).delete();
}
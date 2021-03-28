import { auth } from "../services/firebase";

export function signup(email, pass, displayName) {
    return auth().createUserWithEmailAndPassword(email, pass)
}

export function signin(email, pass) {
    return auth().signInWithEmailAndPassword(email, pass)
}

export function signout() {
    return auth().signOut();
}
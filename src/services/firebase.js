import firebase from "firebase";

const config = {
    apiKey: "AIzaSyDe_z8GLJN-jFRZI9TT1yq9qiO_9NM4xIk",
    authDomain: "chat-wat-27777.firebaseapp.com",
    databaseURL: "https://chat-wat-27777.firebaseio.com"
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();
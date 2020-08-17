import * as firebase from "firebase";

export function getFirebaseConfig() {
  return {
    apiKey: "AIzaSyD9vwbGlOcEFbhlh7hvdVxhr-BuUys8asc",
    authDomain: "vote-app-classting.firebaseapp.com",
    databaseURL: "https://vote-app-classting.firebaseio.com",
    projectId: "vote-app-classting",
  }
}

export const firebaseApp = firebase.initializeApp(getFirebaseConfig());
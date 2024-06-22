import { app, db } from "/firebase.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

const userIcon = document.getElementById("user-icon");

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    userIcon.setAttribute("href", "/logout");
  } else {
    // User is signed out
    userIcon.setAttribute("href", "/login");
  }
});

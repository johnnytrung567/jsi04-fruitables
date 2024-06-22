import { app, db } from "/firebase.js";
import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

const auth = getAuth();
signOut(auth)
  .then(() => {
    // Sign-out successful.
    alert("Dang xuat thanh cong");
    window.location.href = "/login";
  })
  .catch((error) => {
    // An error happened.
  });

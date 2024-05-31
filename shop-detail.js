import { app, db } from "/firebase.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-storage.js";
import {
  collection,
  setDoc,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const params = new URLSearchParams(document.location.search);
const productId = params.get("id");

const name = document.getElementById("name");
const price = document.getElementById("price");
const description = document.getElementById("description");
const image = document.getElementById("image");
const category = document.getElementById("category");

let docSnap;
if (productId) {
  const docRef = doc(db, "products", productId);
  docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    name.innerHTML = docSnap.data().name;
    price.innerHTML = "$" + docSnap.data().price;
    description.innerHTML = docSnap.data().description;
    category.innerHTML = "Category: " + docSnap.data().category;
    image.setAttribute("src", docSnap.data().image);
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}

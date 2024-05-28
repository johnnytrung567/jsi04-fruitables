import { app, db } from "/firebase.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-storage.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const addForm = document.getElementById("add-form");

addForm.onsubmit = function (event) {
  event.preventDefault();

  const name = document.getElementById("name");
  const price = document.getElementById("price");
  const description = document.getElementById("description");
  const image = document.getElementById("image");
  const category = document.getElementById("category");

  // Upload image to Firebase storage
  const storage = getStorage();
  const imagePath = "products/" + new Date().valueOf();
  const storageRef = ref(storage, imagePath);

  // 'file' comes from the Blob or File API
  uploadBytes(storageRef, image.files[0]).then(async (snapshot) => {
    console.log("Uploaded a blob or file!");
    const url = await getDownloadURL(storageRef);

    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "products"), {
      name: name.value,
      price: Number(price.value),
      description: description.value,
      category: category.value,
      image: url,
    });

    alert("Added " + name.value);
    window.location.href = "/admin/products";
  });
};

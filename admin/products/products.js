import { app, db } from "/firebase.js";
import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const querySnapshot = await getDocs(collection(db, "products"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  // console.log(doc.id, " => ", doc.data());
  const product = { ...doc.data(), id: doc.id };
  renderProduct(product);
});

function renderProduct(product) {
  const tbody = document.getElementById("tbody");
  const tr = document.createElement("tr");
  tbody.appendChild(tr);

  tr.innerHTML = `
    <tr>
    <th scope="row">1</th>
    <td>
      <img width="100" height="100" style="object-fit: cover;" src="${product.image}" alt="">
    </td>
    <td>${product.name}</td>
    <td>$${product.price}</td>
    <td>${product.description}</td>
    <td>${product.category}</td>
    <td>
      <a href="./edit.html" class="btn btn-sm btn-secondary me-2">Edit</a>
      <button class="btn btn-sm btn-danger">Delete</button>
    </td>
  </tr>
  `;
}

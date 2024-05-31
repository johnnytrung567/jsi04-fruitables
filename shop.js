import { app, db } from "/firebase.js";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const productList = document.getElementById("product-list");

async function fetchProducts() {
  productList.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "products"));
  let i = 1;
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    const product = { ...doc.data(), id: doc.id, order: i };
    renderProduct(product);
    i++;
  });
}
fetchProducts();

function renderProduct(product) {
  const productCard = document.createElement("div");
  productList.appendChild(productCard);
  productCard.classList.add("col-md-6", "col-lg-6", "col-xl-4");

  productCard.innerHTML = `
  <div class="rounded position-relative fruite-item">
  <div class="fruite-img">
    <a href="./shop-detail.html?id=${product.id}">
      <img
        src="${product.image}"
        class="img-fluid w-100 rounded-top"
        style="height: 260px; object-fit: cover;"
        alt=""
      />
    </a>
  </div>
  <div
    class="text-white bg-secondary px-3 py-1 rounded position-absolute"
    style="top: 10px; left: 10px"
  >
  ${product.category}
  </div>
  <div
    class="p-4 border border-secondary border-top-0 rounded-bottom"
  >
    <h4>${product.name}</h4>
    <p>
    ${product.description}
    </p>
    <div
      class="d-flex justify-content-between flex-lg-wrap"
    >
      <p class="text-dark fs-5 fw-bold mb-0">$${product.price} / kg</p>
      <a
        href="#"
        class="btn border border-secondary rounded-pill px-3 text-primary"
        ><i
          class="fa fa-shopping-bag me-2 text-primary"
        ></i>
        Add to cart</a
      >
    </div>
  </div>
</div>
  `;
}

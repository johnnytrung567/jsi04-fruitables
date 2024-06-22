import { app, db } from "/firebase.js";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

const auth = getAuth();
let userId;
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    userId = user.uid;
    fetchProducts();
  } else {
    // User is signed out
    return;
  }
});

const tbody = document.getElementById("tbody");
const SHIPPING_FEE = 3;
let subtotal = 0;

async function fetchProducts() {
  if (!userId) return;
  tbody.innerHTML = "";

  const q = query(collection(db, "cart"), where("userId", "==", userId));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (cartDoc) => {
    // doc.data() is never undefined for query doc snapshots
    let data = { ...cartDoc.data() };
    data.id = cartDoc.id;

    const docRef = doc(db, "products", data.productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      data.product = { ...docSnap.data() };
      // console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }

    renderProduct(data);

    const subtotalEl = document.getElementById("subtotal");
    const shippingEl = document.getElementById("shipping");
    const totalEl = document.getElementById("total");

    subtotalEl.innerHTML = `$${subtotal}`;
    shippingEl.innerHTML = `Flat rate: $${SHIPPING_FEE}`;
    totalEl.innerHTML = `$${subtotal + SHIPPING_FEE}`;
  });
}
fetchProducts();

function renderProduct(item) {
  const singleTotal = Number(item.product.price) * Number(item.quantity);
  subtotal += singleTotal;

  const tr = document.createElement("tr");
  tbody.appendChild(tr);

  tr.innerHTML = `
    <th scope="row">
        <div class="d-flex align-items-center">
        <img
            src="${item.product.image}"
            class="img-fluid me-5 rounded-circle"
            style="width: 80px; height: 80px"
            alt=""
        />
        </div>
    </th>
    <td>
        <p class="mb-0 mt-4">${item.product.name}</p>
    </td>
    <td>
        <p class="mb-0 mt-4">${item.product.price} $</p>
    </td>
    <td>
        <div class="input-group quantity mt-4" style="width: 100px">
        <div class="input-group-btn">
            <button
            class="btn btn-sm btn-minus rounded-circle bg-light border"
            >
            <i class="fa fa-minus"></i>
            </button>
        </div>
        <input
            type="text"
            class="form-control form-control-sm text-center border-0"
            value="${item.quantity}"
        />
        <div class="input-group-btn">
            <button
            class="btn btn-sm btn-plus rounded-circle bg-light border"
            >
            <i class="fa fa-plus"></i>
            </button>
        </div>
        </div>
    </td>
    <td>
        <p class="mb-0 mt-4">${
          Number(item.product.price) * Number(item.quantity)
        } $</p>
    </td>
    <td>
        <button
        class="btn btn-md rounded-circle bg-light border mt-4"
        >
        <i class="fa fa-times text-danger"></i>
        </button>
    </td>
  `;

  //   const deleteBtn =
  //     document.getElementsByClassName("delete-btn")[product.order - 1];
  //   deleteBtn.onclick = function () {
  //     deleteProduct(product);
  //   };
}

async function deleteProduct(product) {
  const isConfirm = confirm("Are you sure you want to delete " + product.name);
  if (!isConfirm) {
    return;
  }

  // Delete product
  await deleteDoc(doc(db, "products", product.id));
  fetchProducts();
}

import { app, db } from "/firebase.js";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
  addDoc,
  updateDoc,
  increment,
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
  } else {
    // User is signed out
    return;
  }
});

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
        class="add-btn btn border border-secondary rounded-pill px-3 text-primary"
        ><i
          class="fa fa-shopping-bag me-2 text-primary"
        ></i>
        Add to cart</a
      >
    </div>
  </div>
</div>
  `;

  const addBtn = document.getElementsByClassName("add-btn")[product.order - 1];
  addBtn.onclick = function () {
    addToCart(product);
  };
}

async function addToCart(product) {
  // Kiểm tra trạng thái đăng nhập của người dùng
  if (!userId) {
    alert("You need login to Add to cart");
    window.location.href = "/login";
  }

  // Kiểm tra sản phẩm đã có trong giỏ hay chưa
  let existId = null;

  const q = query(collection(db, "cart"), where("userId", "==", userId));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (cartDoc) => {
    // doc.data() is never undefined for query doc snapshots
    let data = { ...cartDoc.data() };
    data.id = cartDoc.id;

    if (data.productId === product.id) {
      existId = data.id;
    }
  });

  if (!existId) {
    // Chưa có trong giỏ hàng
    // Thêm mới
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "cart"), {
      userId,
      productId: product.id,
      quantity: 1,
    });
    console.log("Document written with ID: ", docRef.id);
  } else {
    // Đã có trong giỏ
    const cartRef = doc(db, "cart", existId);

    // Atomically increment the population of the city by 50.
    await updateDoc(cartRef, {
      quantity: increment(1),
    });
  }
  alert("Product added to cart");
}

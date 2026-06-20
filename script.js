/* ===========================
   MITARBEITER
   =========================== */

/*
  WICHTIG:
  Diese Passwörter sind nur für eine Demo geeignet.
  Jeder, der die Website-Dateien sieht, kann diese Passwörter finden.
  Für echtes Login brauchst du ein Backend.
*/

const employees = [
  {
    name: "Drogon",
    password: "1234",
    role: "admin"
  },
  {
    name: "Mia",
    password: "pizza2025",
    role: "mitarbeiter"
  },
  {
    name: "Luca",
    password: "nonno2025",
    role: "mitarbeiter"
  },
  {
    name: "Admin",
    password: "admin123",
    role: "admin"
  }
];

let currentEmployee = null;


/* ===========================
   PRODUKTE
   =========================== */

let products = [
  {
    id: 1,
    category: "🍷 Bevande",
    name: "Vino della Casa",
    icon: "🍷",
    price: 350,
    stock: 1525
  },
  {
    id: 2,
    category: "🍷 Bevande",
    name: "Tè Freddo al Limone",
    icon: "🥤",
    price: 195,
    stock: 2073
  },
  {
    id: 3,
    category: "🍷 Bevande",
    name: "Cola",
    icon: "🥃",
    price: 130,
    stock: 2046
  },
  {
    id: 4,
    category: "🍷 Bevande",
    name: "Energy Drink",
    icon: "⚡",
    price: 200,
    stock: 2197
  },
  {
    id: 5,
    category: "🍷 Bevande",
    name: "Kaffee",
    icon: "☕",
    price: 190,
    stock: 1804
  },
  {
    id: 6,
    category: "🍷 Bevande",
    name: "Espresso",
    icon: "☕",
    price: 190,
    stock: 818
  },

  {
    id: 7,
    category: "🍕 Pizza",
    name: "Pizza Margherita",
    icon: "🍕",
    price: 330,
    stock: 2008
  },
  {
    id: 8,
    category: "🍕 Pizza",
    name: "Pizza Salame Piccante",
    icon: "🍕",
    price: 330,
    stock: 1950
  },
  {
    id: 9,
    category: "🍕 Pizza",
    name: "Pizza Tonno e Cipolla",
    icon: "🍕",
    price: 330,
    stock: 1249
  },

  {
    id: 10,
    category: "🥗 Antipasti",
    name: "Antipasto Italiano della Casa",
    icon: "🥗",
    price: 110,
    stock: 1701
  },
  {
    id: 11,
    category: "🥗 Antipasti",
    name: "Bruschetta Classica",
    icon: "🍅",
    price: 165,
    stock: 1648
  },

  {
    id: 12,
    category: "🍝 Secondi Piatti",
    name: "Lasagna Napoletana della Casa",
    icon: "🍝",
    price: 550,
    stock: 147
  },
  {
    id: 13,
    category: "🍝 Secondi Piatti",
    name: "Grigliata Mista di Pesce",
    icon: "🦐",
    price: 410,
    stock: 1548
  },

  {
    id: 14,
    category: "🍝 Pasta",
    name: "Spaghetti alla Carbonara",
    icon: "🍝",
    price: 300,
    stock: 1081
  },
  {
    id: 15,
    category: "🍝 Pasta",
    name: "Spaghetti alla Bolognese",
    icon: "🍝",
    price: 300,
    stock: 4165
  },

  {
    id: 16,
    category: "🍮 Dessert",
    name: "Coppa Gelato della Casa",
    icon: "🍨",
    price: 400,
    stock: 66
  },
  {
    id: 17,
    category: "🍮 Dessert",
    name: "Tiramisu",
    icon: "🍰",
    price: 275,
    stock: 1302
  },
  {
    id: 18,
    category: "🍮 Dessert",
    name: "Panna Cotta ai Lamponi Caldi",
    icon: "🍮",
    price: 110,
    stock: 999
  },

  {
    id: 19,
    category: "⭐ Menü 1",
    name: "Menü 1: Fiste + Pizza nach Wahl + Panna Cotta",
    icon: "🍽️",
    price: 540,
    stock: 999
  },
  {
    id: 20,
    category: "⭐ Menü 2",
    name: "Menü 2: Cola + Pasta nach Wahl + Tiramisu",
    icon: "🍽️",
    price: 540,
    stock: 999
  },
  {
    id: 21,
    category: "⭐ Menü 3",
    name: "Menü 3: Energy Drink + Grigliata Mista di Pesce + Coppa Gelato",
    icon: "🍽️",
    price: 860,
    stock: 999
  }
];

let cart = {};
let selectedDiscount = 0;


/* ===========================
   START
   =========================== */

loadProductsFromStorage();
fillEmployeeSelect();
checkSavedLogin();


/* ===========================
   LOGIN
   =========================== */

function fillEmployeeSelect() {
  const select = document.getElementById("employeeSelect");
  select.innerHTML = "";

  employees.forEach((employee, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = employee.name;
    select.appendChild(option);
  });
}

function login() {
  const selectedIndex = document.getElementById("employeeSelect").value;
  const password = document.getElementById("passwordInput").value;
  const error = document.getElementById("loginError");

  const employee = employees[selectedIndex];

  if (!employee || employee.password !== password) {
    error.textContent = "Falsches Passwort.";
    return;
  }

  currentEmployee = employee;
  localStorage.setItem("currentEmployee", JSON.stringify(employee));

  openApp();
}

function checkSavedLogin() {
  const savedEmployee = localStorage.getItem("currentEmployee");

  if (savedEmployee) {
    currentEmployee = JSON.parse(savedEmployee);
    openApp();
  }
}

function openApp() {
  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
  document.getElementById("currentEmployeeName").textContent = currentEmployee.name;

  renderProducts();
  renderCart();
  renderStockEditor();
}

function logout() {
  localStorage.removeItem("currentEmployee");
  currentEmployee = null;
  cart = {};
  selectedDiscount = 0;

  document.getElementById("app").classList.add("hidden");
  document.getElementById("loginScreen").classList.remove("hidden");
  document.getElementById("passwordInput").value = "";
}


/* ===========================
   SEITENWECHSEL
   =========================== */

function showPage(pageId) {
  document.getElementById("orderPage").classList.add("hidden");
  document.getElementById("stockPage").classList.add("hidden");

  document.getElementById(pageId).classList.remove("hidden");

  if (pageId === "stockPage") {
    renderStockEditor();
  }
}


/* ===========================
   PRODUKTE ANZEIGEN
   =========================== */

function renderProducts() {
  const productGrid = document.getElementById("productGrid");
  productGrid.innerHTML = "";

  const categories = [...new Set(products.map(product => product.category))];

  categories.forEach(category => {
    const categoryCard = document.createElement("section");
    categoryCard.className = "category-card";

    const title = document.createElement("h2");
    title.className = "category-title";
    title.textContent = category;

    categoryCard.appendChild(title);

    const categoryProducts = products.filter(product => product.category === category);

    categoryProducts.forEach(product => {
      const quantity = cart[product.id] || 0;

      const row = document.createElement("div");
      row.className = "product-row";

      row.innerHTML = `
        <div class="product-icon">${product.icon}</div>

        <div class="product-info">
          <h3>${product.name}</h3>
          <p>${formatEuro(product.price)}</p>
          <p>Lager: ${product.stock}</p>

          <div class="controls">
            <button onclick="changeQuantity(${product.id}, -1)">−</button>
            <span class="quantity">${quantity}</span>
            <button onclick="changeQuantity(${product.id}, 1)">+</button>
            <button onclick="changeQuantity(${product.id}, 5)">+5</button>
            <button onclick="changeQuantity(${product.id}, 10)">+10</button>
            <button class="add-button" onclick="addItemToCart(${product.id})">Hinzufügen</button>
          </div>
        </div>
      `;

      categoryCard.appendChild(row);
    });

    productGrid.appendChild(categoryCard);
  });
}


/* ===========================
   WARENKORB
   =========================== */

function changeQuantity(productId, amount) {
  const product = findProduct(productId);
  const oldQuantity = cart[productId] || 0;
  const newQuantity = oldQuantity + amount;

  if (newQuantity < 0) {
    return;
  }

  if (newQuantity > product.stock) {
    alert("Nicht genug Lagerbestand vorhanden.");
    return;
  }

  cart[productId] = newQuantity;

  if (cart[productId] === 0) {
    delete cart[productId];
  }

  renderProducts();
  renderCart();
}

function addItemToCart(productId) {
  const quantity = cart[productId] || 0;

  if (quantity <= 0) {
    alert("Bitte zuerst eine Menge auswählen.");
    return;
  }

  renderCart();
}

function removeFromCart(productId) {
  delete cart[productId];
  renderProducts();
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";

  const ids = Object.keys(cart);

  if (ids.length === 0) {
    cartItems.textContent = "Keine Artikel ausgewählt";
  }

  ids.forEach(id => {
    const product = findProduct(Number(id));
    const quantity = cart[id];
    const sum = product.price * quantity;

    const line = document.createElement("div");
    line.className = "cart-line";

    line.innerHTML = `
      <span>${quantity} × ${product.name}</span>
      <strong>${formatEuro(sum)}</strong>
      <button onclick="removeFromCart(${product.id})">X</button>
    `;

    cartItems.appendChild(line);
  });

  updateTotal();
}

function updateTotal() {
  let subtotal = 0;

  Object.keys(cart).forEach(id => {
    const product = findProduct(Number(id));
    subtotal += product.price * cart[id];
  });

  const discountValue = subtotal * (selectedDiscount / 100);
  const total = subtotal - discountValue;

  document.getElementById("subtotal").textContent = formatEuro(subtotal);
  document.getElementById("discountText").textContent = selectedDiscount + "%";
  document.getElementById("total").textContent = formatEuro(total);
}

function setDiscount(percent) {
  selectedDiscount = percent;
  updateTotal();
}

function finishOrder() {
  const ids = Object.keys(cart);

  if (ids.length === 0) {
    alert("Es wurde noch nichts ausgewählt.");
    return;
  }

  let orderText = "Bestellung abgeschlossen von " + currentEmployee.name + "\n\n";

  ids.forEach(id => {
    const product = findProduct(Number(id));
    const quantity = cart[id];

    product.stock -= quantity;

    orderText += quantity + " × " + product.name + "\n";
  });

  orderText += "\nGesamt: " + document.getElementById("total").textContent;

  saveProductsToStorage();

  alert(orderText);

  cart = {};
  selectedDiscount = 0;

  renderProducts();
  renderCart();
  renderStockEditor();
}


/* ===========================
   LAGER BEARBEITEN
   =========================== */

function renderStockEditor() {
  const stockEditor = document.getElementById("stockEditor");
  stockEditor.innerHTML = "";

  products.forEach(product => {
    const row = document.createElement("div");
    row.className = "stock-row";

    row.innerHTML = `
      <div class="stock-icon">${product.icon}</div>

      <div>
        <strong>${product.name}</strong><br>
        <small>${product.category} | Preis: ${formatEuro(product.price)}</small>
      </div>

      <input 
        type="number" 
        min="0" 
        value="${product.stock}" 
        id="stock-${product.id}"
      />
    `;

    stockEditor.appendChild(row);
  });
}

function saveStockFromEditor() {
  products.forEach(product => {
    const input = document.getElementById("stock-" + product.id);
    const newStock = Number(input.value);

    if (!isNaN(newStock) && newStock >= 0) {
      product.stock = newStock;
    }
  });

  saveProductsToStorage();
  renderProducts();
  renderStockEditor();

  alert("Lagerbestand wurde gespeichert.");
}


/* ===========================
   LOCAL STORAGE
   =========================== */

function saveProductsToStorage() {
  localStorage.setItem("products", JSON.stringify(products));
}

function loadProductsFromStorage() {
  const savedProducts = localStorage.getItem("products");

  if (savedProducts) {
    products = JSON.parse(savedProducts);
  }
}


/* ===========================
   HILFSFUNKTIONEN
   =========================== */

function findProduct(productId) {
  return products.find(product => product.id === productId);
}

function formatEuro(value) {
  return value.toFixed(2).replace(".", ",") + " €";
}
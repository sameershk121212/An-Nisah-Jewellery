/* ==========================================
   AN-NISAH JEWELLERY
   ADMIN PANEL - FINAL
========================================== */


/* ==========================================
   ADMIN LOGIN
========================================== */

const ADMIN_EMAIL = "admin@annisah.com";
const ADMIN_PASSWORD = "admin123";


/* ==========================================
   ELEMENTS
========================================== */

const loginPage = document.getElementById("loginPage");
const adminApp = document.getElementById("adminApp");
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");
const logoutBtn = document.getElementById("logoutBtn");
const pageTitle = document.getElementById("pageTitle");


/* ==========================================
   DEFAULT PRODUCTS
========================================== */

const defaultProducts = [
    {
        name: "Elegant Necklace",
        price: 299,
        category: "necklaces",
        image: "../product1.jpg"
    },
    {
        name: "Golden Necklace",
        price: 299,
        category: "necklaces",
        image: "../product2.jpg"
    },
    {
        name: "Elegant Ring",
        price: 299,
        category: "rings",
        image: "../product3.jpg"
    },
    {
        name: "Premium Jewellery",
        price: 299,
        category: "necklaces",
        image: "../product4.jpg"
    },
    {
        name: "Classic Necklace",
        price: 299,
        category: "necklaces",
        image: "../product5.jpg"
    },
    {
        name: "Fashion Jewellery",
        price: 299,
        category: "necklaces",
        image: "../product6.jpg"
    },
    {
        name: "Golden Collection",
        price: 299,
        category: "necklaces",
        image: "../product7.jpg"
    },
    {
        name: "Elegant Collection",
        price: 299,
        category: "necklaces",
        image: "../product8.jpg"
    }
];


/* ==========================================
   PRODUCTS
========================================== */

let adminProducts = loadProducts();


function loadProducts() {

    const saved = localStorage.getItem("annisahAdminProducts");

    if (!saved) {
        return [...defaultProducts];
    }

    try {

        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
        }

    } catch (error) {

        console.log("Could not load products.", error);

    }

    return [...defaultProducts];
}


function saveProducts() {

    localStorage.setItem(
        "annisahAdminProducts",
        JSON.stringify(adminProducts)
    );

}


/* ==========================================
   ORDERS
========================================== */

let orders = [];


function loadOrders() {

    const saved = localStorage.getItem("annisahOrders");

    if (!saved) {
        orders = [];
        return;
    }

    try {

        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
            orders = parsed;
        } else {
            orders = [];
        }

    } catch (error) {

        console.log("Could not load orders.", error);
        orders = [];

    }

}


/* ==========================================
   LOGIN
========================================== */

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email =
            document.getElementById("adminEmail").value.trim();

        const password =
            document.getElementById("adminPassword").value;

        if (
            email === ADMIN_EMAIL &&
            password === ADMIN_PASSWORD
        ) {

            if (loginMessage) {
                loginMessage.textContent = "";
            }

            if (loginPage) {
                loginPage.style.display = "none";
            }

            if (adminApp) {
                adminApp.classList.add("active");
            }

            loadOrders();
            renderProducts();
            renderOrders();
            updateDashboard();

        } else {

            if (loginMessage) {
                loginMessage.textContent =
                    "Incorrect email or password.";
            }

        }

    });

}


/* ==========================================
   LOGOUT
========================================== */

if (logoutBtn) {

    logoutBtn.addEventListener("click", function() {

        if (adminApp) {
            adminApp.classList.remove("active");
        }

        if (loginPage) {
            loginPage.style.display = "flex";
        }

        if (loginForm) {
            loginForm.reset();
        }

    });

}


/* ==========================================
   NAVIGATION
========================================== */

const navItems =
    document.querySelectorAll(".nav-item");


const sections = {

    dashboard:
        document.getElementById("dashboardSection"),

    products:
        document.getElementById("productsSection"),

    orders:
        document.getElementById("ordersSection")

};


navItems.forEach(function(button) {

    button.addEventListener("click", function() {

        const section = button.dataset.section;

        openSection(section);

        if (section === "orders") {

            loadOrders();
            renderOrders();
            updateDashboard();

        }

    });

});


/* ==========================================
   OPEN SECTION
========================================== */

function openSection(section) {

    navItems.forEach(function(button) {

        button.classList.remove("active");

    });


    const activeButton =
        document.querySelector(
            `.nav-item[data-section="${section}"]`
        );


    if (activeButton) {
        activeButton.classList.add("active");
    }


    Object.values(sections).forEach(function(element) {

        if (element) {
            element.classList.remove("active");
        }

    });


    if (sections[section]) {
        sections[section].classList.add("active");
    }


    const titles = {

        dashboard: "Dashboard",
        products: "Products",
        orders: "Orders"

    };


    if (pageTitle) {
        pageTitle.textContent =
            titles[section] || "Dashboard";
    }

}


/* ==========================================
   QUICK ACTIONS
========================================== */

document
    .querySelectorAll("[data-open]")
    .forEach(function(button) {

        button.addEventListener("click", function() {

            const section = button.dataset.open;

            openSection(section);

            if (section === "orders") {

                loadOrders();
                renderOrders();
                updateDashboard();

            }

        });

    });


/* ==========================================
   PRODUCT MODAL
========================================== */

const productModal =
    document.getElementById("productModal");

const addProductBtn =
    document.getElementById("addProductBtn");

const closeProductModal =
    document.getElementById("closeProductModal");

const productForm =
    document.getElementById("productForm");


if (addProductBtn) {

    addProductBtn.addEventListener("click", function() {

        if (productForm) {
            productForm.reset();
        }

        if (productModal) {
            productModal.classList.add("active");
        }

    });

}


if (closeProductModal) {

    closeProductModal.addEventListener("click", function() {

        if (productModal) {
            productModal.classList.remove("active");
        }

    });

}


if (productModal) {

    productModal.addEventListener("click", function(event) {

        if (event.target === productModal) {
            productModal.classList.remove("active");
        }

    });

}


/* ==========================================
   ADD PRODUCT
========================================== */

if (productForm) {

    productForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.getElementById("productName").value.trim();

        const price =
            Number(
                document.getElementById("productPrice").value
            );

        const category =
            document.getElementById("productCategory").value;

        const image =
            document.getElementById("productImage").value.trim();


        if (
            !name ||
            !price ||
            !category ||
            !image
        ) {

            alert("Please fill all product details.");
            return;

        }


        adminProducts.push({

            name: name,
            price: price,
            category: category,
            image: image

        });


        saveProducts();
        renderProducts();
        updateDashboard();

        productForm.reset();

        if (productModal) {
            productModal.classList.remove("active");
        }

    });

}


/* ==========================================
   RENDER PRODUCTS
========================================== */

function renderProducts() {

    const container =
        document.getElementById("adminProducts");

    if (!container) {
        return;
    }

    container.innerHTML = "";


    if (adminProducts.length === 0) {

        container.innerHTML = `

            <div class="empty-orders">

                <div>◇</div>

                <h2>No Products</h2>

                <p>
                    Add your first product.
                </p>

            </div>

        `;

        return;

    }


    adminProducts.forEach(function(product, index) {

        const card =
            document.createElement("div");

        card.className =
            "admin-product-card";


        card.innerHTML = `

            <div class="admin-product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    onerror="this.onerror=null;this.src='../product1.jpg';"
                >

            </div>


            <div class="admin-product-info">

                <h3>
                    ${product.name}
                </h3>

                <div class="price">
                    ₹${product.price}
                </div>

                <span class="category">
                    ${formatCategory(product.category)}
                </span>


                <div class="product-actions">

                    <button
                        class="edit-product"
                        onclick="editProduct(${index})"
                    >
                        Edit
                    </button>

                    <button
                        class="delete-product"
                        onclick="deleteProduct(${index})"
                    >
                        Delete
                    </button>

                </div>

            </div>

        `;


        container.appendChild(card);

    });

}


/* ==========================================
   CATEGORY
========================================== */

function formatCategory(category) {

    const names = {

        necklaces: "Necklaces",
        rings: "Rings",
        bangles: "Bangles",
        gift: "Gift Hampers"

    };

    return names[category] || category;

}


/* ==========================================
   DELETE PRODUCT
========================================== */

function deleteProduct(index) {

    const product =
        adminProducts[index];

    if (!product) {
        return;
    }


    const confirmed =
        confirm(`Delete "${product.name}"?`);


    if (!confirmed) {
        return;
    }


    adminProducts.splice(index, 1);

    saveProducts();
    renderProducts();
    updateDashboard();

}


/* ==========================================
   EDIT PRODUCT
========================================== */

function editProduct(index) {

    const product =
        adminProducts[index];

    if (!product) {
        return;
    }


    const newName =
        prompt(
            "Product name:",
            product.name
        );


    if (newName === null) {
        return;
    }


    const newPrice =
        prompt(
            "Product price:",
            product.price
        );


    if (newPrice === null) {
        return;
    }


    const newImage =
        prompt(
            "Image path:",
            product.image
        );


    if (newImage === null) {
        return;
    }


    product.name =
        newName.trim() || product.name;

    product.price =
        Number(newPrice) || product.price;

    product.image =
        newImage.trim() || product.image;


    saveProducts();
    renderProducts();
    updateDashboard();

}


/* ==========================================
   GET ORDER PRODUCT IMAGE
========================================== */

function getOrderProductImage(product) {

    let image = product.image || "";


    if (!image && product.name) {

        const matchingProduct =
            adminProducts.find(function(item) {

                return item.name === product.name;

            });


        if (matchingProduct) {

            image =
                matchingProduct.image || "";

        }

    }


    if (!image) {

        return "../product1.jpg";

    }


    if (
        image.startsWith("http://") ||
        image.startsWith("https://") ||
        image.startsWith("data:")
    ) {

        return image;

    }


    if (image.startsWith("image/")) {

        return "../" + image.substring(6);

    }


    if (image.startsWith("../")) {

        return image;

    }


    if (image.startsWith("./")) {

        return "../" + image.substring(2);

    }


    if (
        !image.includes("/") &&
        image.toLowerCase().endsWith(".jpg")
    ) {

        return "../" + image;

    }


    return image;

}


/* ==========================================
   RENDER ORDERS
========================================== */

function renderOrders() {

    const container =
        document.getElementById("ordersList");

    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (!orders || orders.length === 0) {

        container.innerHTML = `

            <div class="empty-orders">

                <div>□</div>

                <h2>
                    No Orders Yet
                </h2>

                <p>
                    New customer orders
                    will appear here.
                </p>

            </div>

        `;

        return;

    }


    orders.forEach(function(order, index) {


        if (!order.status) {
            order.status = "Pending";
        }


        if (
            order.paymentStatus === "Order Received"
        ) {

            order.paymentStatus = "Pending";

        }


        let productsHTML = "";


        if (Array.isArray(order.products)) {

            order.products.forEach(function(product) {

                const image =
                    getOrderProductImage(product);

                const quantity =
                    Number(product.quantity) || 1;

                const price =
                    Number(product.price) || 0;

                const productTotal =
                    price * quantity;


                productsHTML += `

                    <div
                        style="
                            display:flex;
                            align-items:center;
                            justify-content:space-between;
                            gap:15px;
                            padding:12px 0;
                            border-bottom:1px solid #eee;
                        "
                    >

                        <div
                            style="
                                display:flex;
                                align-items:center;
                                gap:12px;
                                min-width:0;
                            "
                        >

                            <img
                                src="${image}"
                                alt="${product.name || "Product"}"
                                onerror="this.onerror=null;this.src='../product1.jpg';"
                                style="
                                    width:65px;
                                    height:65px;
                                    min-width:65px;
                                    object-fit:cover;
                                    border-radius:10px;
                                    border:1px solid #ddd;
                                    display:block;
                                "
                            >

                            <div>

                                <strong>
                                    ${product.name || "Product"}
                                </strong>

                                <div
                                    style="
                                        margin-top:5px;
                                        color:#777;
                                        font-size:13px;
                                    "
                                >
                                    Qty: ${quantity}
                                </div>

                                <div
                                    style="
                                        margin-top:3px;
                                        color:#777;
                                        font-size:13px;
                                    "
                                >
                                    ₹${price} each
                                </div>

                            </div>

                        </div>

                        <strong>
                            ₹${productTotal}
                        </strong>

                    </div>

                `;

            });

        }


        const isPending =
            order.status === "Pending";


        const statusText =
            isPending
                ? "🟡 Pending"
                : "🚚 Your Order Is On Way";


        const statusBackground =
            isPending
                ? "#fff3cd"
                : "#d1fae5";


        const statusColor =
            isPending
                ? "#856404"
                : "#065f46";


        container.innerHTML += `

            <div
                class="order-card"
                style="
                    padding:22px;
                    margin-bottom:20px;
                    border:1px solid #ddd;
                    border-radius:16px;
                "
            >

                <div
                    style="
                        display:flex;
                        justify-content:space-between;
                        align-items:flex-start;
                        gap:20px;
                        margin-bottom:18px;
                    "
                >

                    <div>

                        <small>
                            ORDER ID
                        </small>

                        <h3>
                            ${
                                order.id ||
                                "ORDER-" + (index + 1)
                            }
                        </h3>

                    </div>


                    <div
                        style="
                            padding:7px 14px;
                            border-radius:20px;
                            background:${statusBackground};
                            color:${statusColor};
                            font-weight:600;
                        "
                    >
                        ${statusText}
                    </div>

                </div>


                <div style="margin-bottom:18px;">

                    <p>
                        <b>Customer:</b>
                        ${
                            order.customerName ||
                            "Not provided"
                        }
                    </p>


                    ${
                        order.customerEmail
                        ?
                        `
                        <p>
                            <b>Email:</b>
                            ${order.customerEmail}
                        </p>
                        `
                        :
                        ""
                    }


                    <p>
                        <b>Address:</b>
                        ${
                            order.customerAddress ||
                            "Not provided"
                        }
                    </p>

                </div>


                <div style="margin-bottom:18px;">

                    <h4>
                        Products
                    </h4>

                    ${
                        productsHTML ||
                        "<p>No product details available.</p>"
                    }

                </div>


                <div
                    style="
                        display:grid;
                        grid-template-columns:repeat(3,1fr);
                        gap:15px;
                        margin-bottom:20px;
                    "
                >

                    <div>

                        <small>
                            PAYMENT
                        </small>

                        <strong
                            style="
                                display:block;
                                margin-top:5px;
                            "
                        >
                            ${
                                order.paymentMethod ||
                                "Unknown"
                            }
                        </strong>

                    </div>


                    <div>

                        <small>
                            PAYMENT STATUS
                        </small>

                        <strong
                            style="
                                display:block;
                                margin-top:5px;
                            "
                        >
                            ${
                                order.paymentStatus ||
                                "Pending"
                            }
                        </strong>

                    </div>


                    <div>

                        <small>
                            TOTAL
                        </small>

                        <strong
                            style="
                                display:block;
                                margin-top:5px;
                            "
                        >
                            ₹${order.total || 0}
                        </strong>

                    </div>

                </div>


                ${
                    isPending
                    ?
                    `
                    <button
                        onclick="acceptOrder(${index})"
                        style="
                            width:100%;
                            padding:13px;
                            border:none;
                            border-radius:10px;
                            background:#111;
                            color:white;
                            cursor:pointer;
                            font-size:15px;
                            font-weight:600;
                        "
                    >
                        ✓ Accept Order
                    </button>
                    `
                    :
                    `
                    <div
                        style="
                            width:100%;
                            padding:13px;
                            text-align:center;
                            border-radius:10px;
                            background:#e8f8ef;
                            color:#087443;
                            font-weight:600;
                        "
                    >
                        🚚 Your Order Is On Way
                    </div>
                    `
                }

            </div>

        `;

    });


    localStorage.setItem(
        "annisahOrders",
        JSON.stringify(orders)
    );

}


/* ==========================================
   ACCEPT ORDER
========================================== */

function acceptOrder(index) {

    const order =
        orders[index];

    if (!order) {
        return;
    }


    if (order.status !== "Pending") {
        return;
    }


    const confirmed =
        confirm(
            "Accept this order and mark it as On Way?"
        );


    if (!confirmed) {
        return;
    }


    order.status =
        "Your Order Is On Way";


    order.paymentStatus =
        "Payment Pending";


    order.acceptedAt =
        new Date().toLocaleString();


    localStorage.setItem(
        "annisahOrders",
        JSON.stringify(orders)
    );


    renderOrders();
    updateDashboard();


    alert(
        "Order accepted successfully!"
    );

}


/* ==========================================
   DASHBOARD
========================================== */

function updateDashboard() {

    const totalProducts =
        document.getElementById("totalProducts");

    const totalOrders =
        document.getElementById("totalOrders");

    const totalRevenue =
        document.getElementById("totalRevenue");


    if (totalProducts) {

        totalProducts.textContent =
            adminProducts.length;

    }


    if (totalOrders) {

        totalOrders.textContent =
            orders.length;

    }


    let revenue = 0;


    orders.forEach(function(order) {

        revenue +=
            Number(order.total) || 0;

    });


    if (totalRevenue) {

        totalRevenue.textContent =
            "₹" + revenue;

    }

}


/* ==========================================
   INITIALIZE
========================================== */

loadOrders();

renderProducts();

renderOrders();

updateDashboard();

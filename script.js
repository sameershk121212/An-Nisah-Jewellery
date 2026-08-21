/* ==========================================
   AN-NISAH JEWELLERY
   COMPLETE CUSTOMER WEBSITE SCRIPT
   PART 1
========================================== */


/* ==========================================
   PRODUCTS
========================================== */

const products = [
    {
        name: "Elegant Necklace",
        price: 299,
        image: "image/product1.jpg"
    },
    {
        name: "Golden Necklace",
        price: 299,
        image: "image/product2.jpg"
    },
    {
        name: "Elegant Ring",
        price: 299,
        image: "image/product3.jpg"
    },
    {
        name: "Premium Jewellery",
        price: 299,
        image: "image/product4.jpg"
    },
    {
        name: "Classic Necklace",
        price: 299,
        image: "image/product5.jpg"
    },
    {
        name: "Fashion Jewellery",
        price: 299,
        image: "image/product6.jpg"
    },
    {
        name: "Golden Collection",
        price: 299,
        image: "image/product7.jpg"
    },
    {
        name: "Elegant Collection",
        price: 299,
        image: "image/product8.jpg"
    }
];


let cart = [];


/* ==========================================
   CUSTOMER LOGIN
========================================== */

let customerLoggedIn =
    localStorage.getItem("annisahCustomerLoggedIn") === "true";

let customerAccount =
    JSON.parse(
        localStorage.getItem("annisahCustomerAccount") || "null"
    );

let loginOTP = null;


/* ==========================================
   PRODUCT GRID
========================================== */

const productGrid =
    document.getElementById("productGrid");


function showMainProducts() {

    if (!productGrid) return;

    productGrid.innerHTML = "";

    products.forEach((product, index) => {

        productGrid.innerHTML += `
            <div class="product-card">

                <div class="product-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                </div>

                <div class="product-info">

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        ₹${product.price}
                    </p>

                    <button
                        class="add-cart"
                        onclick="addToCart(${index})"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>
        `;

    });
}


/* ==========================================
   CATEGORY PAGE
========================================== */

function openCategory(category) {

    const page =
        document.getElementById("categoryPage");

    if (!page) return;


    let title = "";
    let subtitle = "";
    let categoryProducts = [];


    if (category === "necklaces") {

        title = "Necklaces";

        subtitle =
            "Explore our elegant necklace collection.";

        categoryProducts = products;

    }

    else if (category === "rings") {

        title = "Rings";

        subtitle =
            "Our ring collection is coming soon.";

        categoryProducts = [];

    }

    else if (category === "bangles") {

        title = "Bangles";

        subtitle =
            "Our bangle collection is coming soon.";

        categoryProducts = [];

    }

    else if (category === "gift") {

        title = "Gift Hampers";

        subtitle =
            "Our gift hamper collection is coming soon.";

        categoryProducts = [];

    }


    page.innerHTML = `

        <div class="category-page-inner">

            <div class="category-page-top">

                <button
                    class="category-back-btn"
                    onclick="closeCategory()"
                >
                    ← Back
                </button>


                <div class="category-page-logo">

                    <span>
                        An-Nisah
                    </span>

                    <small>
                        JEWELLERY
                    </small>

                </div>

            </div>


            <div class="category-page-heading">

                <p>
                    AN-NISAH COLLECTION
                </p>

                <h1>
                    ${title}
                </h1>

                <span>
                    ${subtitle}
                </span>

            </div>


            <div
                class="category-product-grid"
                id="categoryProductGrid"
            ></div>

        </div>

    `;


    const grid =
        document.getElementById(
            "categoryProductGrid"
        );


    if (!grid) return;


    if (categoryProducts.length === 0) {

        grid.innerHTML = `

            <div class="category-empty">

                <div class="empty-icon">
                    ✦
                </div>

                <h2>
                    Coming Soon
                </h2>

                <p>
                    Beautiful
                    ${title.toLowerCase()}
                    will be added here soon.
                </p>

            </div>

        `;

    }

    else {

        categoryProducts.forEach(
            (product, index) => {

                grid.innerHTML += `

                    <div class="product-card">

                        <div class="product-image">

                            <img
                                src="${product.image}"
                                alt="${product.name}"
                            >

                        </div>


                        <div class="product-info">

                            <h3>
                                ${product.name}
                            </h3>

                            <p>
                                ₹${product.price}
                            </p>

                            <button
                                class="add-cart"
                                onclick="addToCart(${index})"
                            >
                                Add to Cart
                            </button>

                        </div>

                    </div>

                `;

            }
        );

    }


    page.classList.add("active");

    document.body.style.overflow = "hidden";


    setTimeout(() => {

        page.classList.add("show");

    }, 20);
}


/* ==========================================
   CLOSE CATEGORY
========================================== */

function closeCategory() {

    const page =
        document.getElementById("categoryPage");

    if (!page) return;


    page.classList.remove("show");


    setTimeout(() => {

        page.classList.remove("active");

        page.innerHTML = "";

        document.body.style.overflow = "";

    }, 350);
}


/* ==========================================
   ADD TO CART
========================================== */

function addToCart(index) {

    const product =
        products[index];

    if (!product) return;


    const existing =
        cart.find(
            item =>
                item.name === product.name
        );


    if (existing) {

        existing.quantity++;

    }

    else {

        cart.push({

            name: product.name,

            price: product.price,

            image: product.image,

            quantity: 1

        });

    }


    updateCart();

    openCart();
}


/* ==========================================
   UPDATE CART
========================================== */

function updateCart() {

    const count =
        document.getElementById("cartCount");

    const items =
        document.getElementById("cartItems");

    const total =
        document.getElementById("cartTotal");


    if (!count || !items || !total) {
        return;
    }


    let totalItems = 0;
    let totalPrice = 0;


    cart.forEach(item => {

        totalItems += item.quantity;

        totalPrice +=
            item.price * item.quantity;

    });


    count.textContent =
        totalItems;

    total.textContent =
        totalPrice;


    if (cart.length === 0) {

        items.innerHTML = `

            <p class="empty-cart">
                Your cart is empty.
            </p>

        `;

        return;
    }


    items.innerHTML = "";


    cart.forEach((item, index) => {

        items.innerHTML += `

            <div class="cart-item">

                <div>

                    <strong>
                        ${item.name}
                    </strong>

                    <p>
                        ₹${item.price}
                    </p>


                    <div class="quantity">

                        <button
                            onclick="changeQuantity(${index}, -1)"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(${index}, 1)"
                        >
                            +
                        </button>

                    </div>


                    <button
                        class="remove-btn"
                        onclick="removeFromCart(${index})"
                    >
                        Remove
                    </button>

                </div>


                <strong>
                    ₹${item.price * item.quantity}
                </strong>

            </div>

        `;

    });
}


/* ==========================================
   QUANTITY
========================================== */

function changeQuantity(index, amount) {

    if (!cart[index]) return;


    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();
}


/* ==========================================
   REMOVE FROM CART
========================================== */

function removeFromCart(index) {

    if (!cart[index]) return;

    cart.splice(index, 1);

    updateCart();
}


/* ==========================================
   OPEN CART
========================================== */

function openCart() {

    const overlay =
        document.getElementById("cartOverlay");

    if (!overlay) return;

    overlay.classList.add("active");
}


/* ==========================================
   CLOSE CART
========================================== */

function closeCart() {

    const overlay =
        document.getElementById("cartOverlay");

    if (!overlay) return;

    overlay.classList.remove("active");
}


/* ==========================================
   GET TOTAL
========================================== */

function getTotal() {

    return cart.reduce(
        (sum, item) => {

            return (
                sum +
                item.price * item.quantity
            );

        },
        0
    );
}


/* ==========================================
   CUSTOMER LOGIN
========================================== */

function openLogin() {

    const overlay =
        document.getElementById("loginOverlay");

    if (!overlay) return;


    if (customerLoggedIn) {

        const logout =
            confirm(
                "You are already logged in.\n\nDo you want to logout?"
            );


        if (logout) {

            logoutCustomer();

        }


        return;
    }


    overlay.classList.add("active");
}


/* ==========================================
   CLOSE LOGIN
========================================== */

function closeLogin() {

    const overlay =
        document.getElementById("loginOverlay");

    if (!overlay) return;

    overlay.classList.remove("active");
}


/* ==========================================
   SEND LOGIN OTP
========================================== */

function sendLoginOTP() {

    const email =
        document
            .getElementById("loginEmail")
            ?.value
            .trim();


    const phone =
        document
            .getElementById("loginPhone")
            ?.value
            .trim();


    if (!email) {

        alert(
            "Please enter your email address."
        );

        return;
    }


    if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {

        alert(
            "Please enter a valid email address."
        );

        return;
    }


    const cleanPhone =
        phone.replace(/\D/g, "");


    if (cleanPhone.length !== 10) {

        alert(
            "Please enter a valid 10-digit phone number."
        );

        return;
    }


    loginOTP =
        Math.floor(
            100000 +
            Math.random() * 900000
        ).toString();


    console.log(
        "DEMO LOGIN OTP:",
        loginOTP
    );


    customerAccount = {

        email: email,

        phone: cleanPhone

    };


    const loginForm =
        document.getElementById("loginForm");


    const otpForm =
        document.getElementById("otpForm");


    const otpMessage =
        document.getElementById("otpMessage");


    if (loginForm) {

        loginForm.style.display =
            "none";

    }


    if (otpForm) {

        otpForm.style.display =
            "block";

    }


    if (otpMessage) {

        otpMessage.textContent =
            "Demo OTP: " +
            loginOTP +
            " — enter this OTP to continue.";

    }
}


/* ==========================================
   VERIFY LOGIN OTP
========================================== */

function verifyLoginOTP() {

    const otpInput =
        document.getElementById("loginOTP");

    if (!otpInput) return;


    const enteredOTP =
        otpInput.value.trim();


    if (!enteredOTP) {

        alert(
            "Please enter the OTP."
        );

        return;
    }


    if (enteredOTP !== loginOTP) {

        alert(
            "Incorrect OTP. Please try again."
        );

        return;
    }


    customerLoggedIn = true;


    localStorage.setItem(
        "annisahCustomerLoggedIn",
        "true"
    );


    localStorage.setItem(
        "annisahCustomerAccount",
        JSON.stringify(customerAccount)
    );


    loginOTP = null;


    closeLogin();

    updateLoginButton();


    alert(
        "Login successful! You can now place your order."
    );
}


/* ==========================================
   BACK TO LOGIN
========================================== */

function backToLogin() {

    const loginForm =
        document.getElementById("loginForm");


    const otpForm =
        document.getElementById("otpForm");


    if (loginForm) {

        loginForm.style.display =
            "block";

    }


    if (otpForm) {

        otpForm.style.display =
            "none";

    }


    loginOTP = null;
}


/* ==========================================
   LOGOUT
========================================== */

function logoutCustomer() {

    customerLoggedIn = false;

    customerAccount = null;

    loginOTP = null;


    localStorage.removeItem(
        "annisahCustomerLoggedIn"
    );


    localStorage.removeItem(
        "annisahCustomerAccount"
    );


    updateLoginButton();


    alert(
        "You have been logged out."
    );
}


/* ==========================================
   UPDATE LOGIN BUTTON
========================================== */

function updateLoginButton() {

    const button =
        document.getElementById("loginButton");

    if (!button) return;


    if (customerLoggedIn) {

        button.textContent =
            "👤 Account";

    }

    else {

        button.textContent =
            "👤 Login";

    }
}


/* ==========================================
   LOGIN CHECK
========================================== */

function isCustomerLoggedIn() {

    return customerLoggedIn === true;
}


/* ==========================================
   SAVE ORDER
========================================== */

function saveOrder(
    customerName,
    customerEmail,
    customerPhone,
    customerAddress,
    paymentMethod,
    paymentStatus,
    paymentId = ""
) {

    const existing =
        localStorage.getItem("annisahOrders");


    let orders = [];


    if (existing) {

        try {

            const parsed =
                JSON.parse(existing);


            if (Array.isArray(parsed)) {

                orders = parsed;

            }

        }

        catch (error) {

            orders = [];

        }

    }


    const order = {

        id:
            "ORD-" + Date.now(),

        customerName:
            customerName,

        customerEmail:
            customerEmail || "",

        customerPhone:
            customerPhone || "",

        customerAddress:
            customerAddress,

        products:
            cart.map(item => ({

                name:
                    item.name,

                price:
                    item.price,

                quantity:
                    item.quantity,

                image:
                    item.image

            })),

        total:
            getTotal(),

        paymentMethod:
            paymentMethod,

        paymentStatus:
            paymentStatus,

        orderStatus:
            paymentMethod === "Razorpay"
                ? "Confirmed"
                : "Pending",

        paymentId:
            paymentId,

        date:
            new Date().toLocaleString("en-IN")

    };


    orders.unshift(order);


    localStorage.setItem(
        "annisahOrders",
        JSON.stringify(orders)
    );


    return order;
}


/* ==========================================
   CHECKOUT
========================================== */

function checkout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;
    }


    if (!isCustomerLoggedIn()) {

        alert(
            "Please login before placing your order."
        );

        openLogin();

        return;
    }


    closeCart();

    createCheckoutPage();
}


/* ==========================================
   CHECKOUT PAGE
========================================== */

function createCheckoutPage() {

    const old =
        document.getElementById("checkoutPage");


    if (old) {

        old.remove();

    }


    const page =
        document.createElement("div");


    page.id =
        "checkoutPage";


    page.innerHTML = `

        <div class="checkout-container">

            <div class="checkout-header">

                <button
                    onclick="closeCheckout()"
                    class="back-button"
                >
                    ← Back
                </button>


                <div class="checkout-logo">

                    <b>
                        An-Nisah
                    </b>

                    <small>
                        JEWELLERY
                    </small>

                </div>

            </div>


            <div class="checkout-title">

                <p>
                    SECURE CHECKOUT
                </p>

                <h1>
                    Complete Your Order
                </h1>

                <span>
                    Choose your preferred payment method.
                </span>

            </div>


            <div class="checkout-total">

                <span>
                    Order Total
                </span>

                <strong>
                    ₹${getTotal()}
                </strong>

            </div>


            <div class="payment-options">

                <button
                    onclick="showUPI()"
                    class="payment-card"
                >

                    <div class="payment-icon">
                        💳
                    </div>

                    <div>

                        <h2>
                            UPI Payment
                        </h2>

                        <p>
                            Pay securely using Razorpay.
                        </p>

                        <small>
                            Fast & Secure
                        </small>

                    </div>

                    <b>
                        →
                    </b>

                </button>


                <button
                    onclick="showWhatsApp()"
                    class="payment-card"
                >

                    <div class="payment-icon">
                        💬
                    </div>

                    <div>

                        <h2>
                            WhatsApp Order
                        </h2>

                        <p>
                            Send your order directly through WhatsApp.
                        </p>

                        <small>
                            Quick Ordering
                        </small>

                    </div>

                    <b>
                        →
                    </b>

                </button>

            </div>


            <p class="secure-note">
                🔒 Your information is kept private.
            </p>

        </div>

    `;


    document.body.appendChild(page);
}


/* ==========================================
   CLOSE CHECKOUT
========================================== */

function closeCheckout() {

    const page =
        document.getElementById("checkoutPage");


    if (page) {

        page.remove();

    }
}


/* ==========================================
   UPI FORM
========================================== */

function showUPI() {

    const page =
        document.getElementById("checkoutPage");

    if (!page) return;


    const account =
        customerAccount || {};


    page.innerHTML = `

        <div class="checkout-container">

            <div class="checkout-header">

                <button
                    onclick="createCheckoutPage()"
                    class="back-button"
                >
                    ← Back
                </button>


                <div class="checkout-logo">

                    <b>
                        An-Nisah
                    </b>

                    <small>
                        JEWELLERY
                    </small>

                </div>

            </div>


            <div class="checkout-title">

                <p>
                    RAZORPAY PAYMENT
                </p>

                <h1>
                    Your Details
                </h1>

                <span>
                    Enter your delivery details before payment.
                </span>

            </div>


            <div class="checkout-form">

                <label>
                    Full Name
                </label>

                <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                >


                <label>
                    Email Address
                </label>

                <input
                    id="email"
                    type="email"
                    value="${account.email || ""}"
                    placeholder="Enter your email"
                >


                <label>
                    Phone Number
                </label>

                <input
                    id="phone"
                    type="tel"
                    value="${account.phone || ""}"
                    placeholder="Enter your 10-digit phone number"
                >


                <label>
                    Delivery Address
                </label>

                <textarea
                    id="address"
                    rows="5"
                    placeholder="Enter your complete address"
                ></textarea>


                <div class="checkout-total">

                    <span>
                        Payable Amount
                    </span>

                    <strong>
                        ₹${getTotal()}
                    </strong>

                </div>


                <button
                    class="main-pay-button"
                    onclick="payWithRazorpay()"
                >
                    Pay Securely →
                </button>

            </div>

        </div>

    `;
}
/* ==========================================
   PART 2 — AN-NISAH JEWELLERY
   CHECKOUT + WHATSAPP + THANK YOU + ORDERS
========================================== */


/* ==========================================
   CHECKOUT
========================================== */

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    if (!isCustomerLoggedIn()) {
        alert("Please login before placing your order.");
        openLogin();
        return;
    }

    closeCart();
    createCheckoutPage();
}


/* ==========================================
   CHECKOUT PAGE
========================================== */

function createCheckoutPage() {
    const oldPage = document.getElementById("checkoutPage");

    if (oldPage) {
        oldPage.remove();
    }

    const page = document.createElement("div");

    page.id = "checkoutPage";

    page.innerHTML = `
        <div class="checkout-container">

            <div class="checkout-header">

                <button
                    onclick="closeCheckout()"
                    class="back-button"
                >
                    ← Back
                </button>

                <div class="checkout-logo">
                    <b>An-Nisah</b>
                    <small>JEWELLERY</small>
                </div>

            </div>


            <div class="checkout-title">

                <p>SECURE CHECKOUT</p>

                <h1>Complete Your Order</h1>

                <span>
                    Choose your preferred payment method.
                </span>

            </div>


            <div class="checkout-total">

                <span>Order Total</span>

                <strong>
                    ₹${getTotal()}
                </strong>

            </div>


            <div class="payment-options">

                <button
                    onclick="showUPI()"
                    class="payment-card"
                >

                    <div class="payment-icon">
                        💳
                    </div>

                    <div>

                        <h2>
                            UPI Payment
                        </h2>

                        <p>
                            Pay securely using Razorpay.
                        </p>

                        <small>
                            Fast & Secure
                        </small>

                    </div>

                    <b>→</b>

                </button>


                <button
                    onclick="showWhatsApp()"
                    class="payment-card"
                >

                    <div class="payment-icon">
                        💬
                    </div>

                    <div>

                        <h2>
                            WhatsApp Order
                        </h2>

                        <p>
                            Send your order directly through WhatsApp.
                        </p>

                        <small>
                            Quick Ordering
                        </small>

                    </div>

                    <b>→</b>

                </button>

            </div>


            <p class="secure-note">
                🔒 Your information is kept private.
            </p>

        </div>
    `;

    document.body.appendChild(page);
}


/* ==========================================
   CLOSE CHECKOUT
========================================== */

function closeCheckout() {
    const page = document.getElementById("checkoutPage");

    if (page) {
        page.remove();
    }
}


/* ==========================================
   UPI PAYMENT FORM
========================================== */

function showUPI() {
    const page = document.getElementById("checkoutPage");

    if (!page) {
        return;
    }

    const account = customerAccount || {};

    page.innerHTML = `
        <div class="checkout-container">

            <div class="checkout-header">

                <button
                    onclick="createCheckoutPage()"
                    class="back-button"
                >
                    ← Back
                </button>

                <div class="checkout-logo">
                    <b>An-Nisah</b>
                    <small>JEWELLERY</small>
                </div>

            </div>


            <div class="checkout-title">

                <p>RAZORPAY PAYMENT</p>

                <h1>Your Details</h1>

                <span>
                    Enter your delivery details before payment.
                </span>

            </div>


            <div class="checkout-form">

                <label>
                    Full Name
                </label>

                <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                >


                <label>
                    Email Address
                </label>

                <input
                    id="email"
                    type="email"
                    value="${account.email || ""}"
                    placeholder="Enter your email"
                >


                <label>
                    Phone Number
                </label>

                <input
                    id="phone"
                    type="tel"
                    value="${account.phone || ""}"
                    placeholder="Enter your 10-digit phone number"
                >


                <label>
                    Delivery Address
                </label>

                <textarea
                    id="address"
                    rows="5"
                    placeholder="Enter your complete address"
                ></textarea>


                <div class="checkout-total">

                    <span>
                        Payable Amount
                    </span>

                    <strong>
                        ₹${getTotal()}
                    </strong>

                </div>


                <button
                    class="main-pay-button"
                    onclick="payWithRazorpay()"
                >
                    Pay Securely →
                </button>

            </div>

        </div>
    `;
}


/* ==========================================
   LOAD RAZORPAY
========================================== */

function loadRazorpayScript() {
    return new Promise((resolve, reject) => {

        if (window.Razorpay) {
            resolve();
            return;
        }

        const script = document.createElement("script");

        script.src =
            "https://checkout.razorpay.com/v1/checkout.js";

        script.onload = resolve;

        script.onerror = reject;

        document.body.appendChild(script);
    });
}


/* ==========================================
   RAZORPAY PAYMENT
========================================== */

async function payWithRazorpay() {

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const address =
        document.getElementById("address").value.trim();


    if (!name) {
        alert("Please enter your name.");
        return;
    }


    if (!email) {
        alert("Please enter your email.");
        return;
    }


    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }


    if (!phone) {
        alert("Please enter your phone number.");
        return;
    }


    if (!/^\d{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }


    if (!address) {
        alert("Please enter your address.");
        return;
    }


    const amount = getTotal();


    try {

        await loadRazorpayScript();


        const response = await fetch(
            "http://localhost:5000/create-order",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    amount: amount
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {
            throw new Error(
                data.error ||
                "Unable to create payment order."
            );
        }


        const options = {

            key: data.key_id,

            amount: data.amount,

            currency: "INR",

            name: "An-Nisah Jewellery",

            description: "Jewellery Order",

            order_id: data.order_id,


            prefill: {

                name: name,

                email: email,

                contact: phone

            },


            notes: {

                address: address

            },


            theme: {

                color: "#c9a227"

            },


            handler: async function (payment) {

                const order = saveOrder(
                    name,
                    email,
                    phone,
                    address,
                    "Razorpay",
                    "Paid",
                    payment.razorpay_payment_id
                );


                cart = [];

                updateCart();


                showOrderSuccess(order);
            },


            modal: {

                ondismiss: function () {

                    console.log(
                        "Payment window closed."
                    );

                }

            }

        };


        const razorpay =
            new Razorpay(options);


        razorpay.on(
            "payment.failed",
            function (response) {

                alert(
                    "Payment failed. Please try again."
                );

                console.error(
                    response.error
                );

            }
        );


        razorpay.open();

    }

    catch (error) {

        console.error(error);

        alert(
            "Payment system is not ready yet. Please try again later."
        );

    }
}


/* ==========================================
   WHATSAPP PAGE
========================================== */

function showWhatsApp() {

    const page =
        document.getElementById("checkoutPage");

    if (!page) {
        return;
    }


    const account =
        customerAccount || {};


    page.innerHTML = `
        <div class="checkout-container">

            <div class="checkout-header">

                <button
                    onclick="createCheckoutPage()"
                    class="back-button"
                >
                    ← Back
                </button>


                <div class="checkout-logo">
                    <b>An-Nisah</b>
                    <small>JEWELLERY</small>
                </div>

            </div>


            <div class="checkout-title">

                <p>WHATSAPP ORDER</p>

                <h1>Your Details</h1>

                <span>
                    Enter your delivery details below.
                </span>

            </div>


            <div class="checkout-form">

                <label>
                    Full Name
                </label>

                <input
                    id="waName"
                    type="text"
                    placeholder="Enter your full name"
                >


                <label>
                    Email Address
                </label>

                <input
                    id="waEmail"
                    type="email"
                    value="${account.email || ""}"
                    placeholder="Enter your email"
                >


                <label>
                    Phone Number
                </label>

                <input
                    id="waPhone"
                    type="tel"
                    value="${account.phone || ""}"
                    placeholder="Enter your phone number"
                >


                <label>
                    Delivery Address
                </label>

                <textarea
                    id="waAddress"
                    rows="5"
                    placeholder="Enter your complete address"
                ></textarea>


                <div class="checkout-total">

                    <span>
                        Order Total
                    </span>

                    <strong>
                        ₹${getTotal()}
                    </strong>

                </div>


                <button
                    class="main-pay-button"
                    onclick="sendWhatsApp()"
                >
                    Send Order on WhatsApp →
                </button>

            </div>

        </div>
    `;
}


/* ==========================================
   WHATSAPP ORDER
========================================== */

function sendWhatsApp() {

    if (!isCustomerLoggedIn()) {

        alert(
            "Please login before placing your order."
        );

        openLogin();

        return;
    }


    const name =
        document.getElementById("waName").value.trim();

    const email =
        document.getElementById("waEmail").value.trim();

    const phone =
        document.getElementById("waPhone").value.trim();

    const address =
        document.getElementById("waAddress").value.trim();


    if (!name) {
        alert("Please enter your name.");
        return;
    }


    if (!email) {
        alert("Please enter your email.");
        return;
    }


    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }


    if (!phone) {
        alert("Please enter your phone number.");
        return;
    }


    if (!/^\d{10}$/.test(phone)) {
        alert(
            "Please enter a valid 10-digit phone number."
        );
        return;
    }


    if (!address) {
        alert("Please enter your address.");
        return;
    }


    /* SAVE ORDER */

    const order = saveOrder(
        name,
        email,
        phone,
        address,
        "WhatsApp",
        "Order Received"
    );


    /* CREATE WHATSAPP MESSAGE */

    let message =
        "Hello An-Nisah Jewellery!\n\n";

    message +=
        "I want to place an order.\n\n";

    message +=
        "Order ID: " +
        order.id +
        "\n";

    message +=
        "Name: " +
        name +
        "\n";

    message +=
        "Email: " +
        email +
        "\n";

    message +=
        "Phone: " +
        phone +
        "\n";

    message +=
        "Address: " +
        address +
        "\n\n";

    message +=
        "Products:\n";


    cart.forEach(item => {

        message +=
            "• " +
            item.name +
            " x " +
            item.quantity +
            " = ₹" +
            (item.price * item.quantity) +
            "\n";

    });


    message +=
        "\nTotal: ₹" +
        getTotal();


    const number =
        "917263993880";


    const whatsapp =
        "https://wa.me/" +
        number +
        "?text=" +
        encodeURIComponent(message);


    localStorage.setItem(
        "annisahPendingThankYou",
        JSON.stringify(order)
    );


    cart = [];

    updateCart();


    window.location.href =
        whatsapp;
}


/* ==========================================
   CHECK PENDING THANK YOU
========================================== */

function checkPendingThankYou() {

    const pending =
        localStorage.getItem(
            "annisahPendingThankYou"
        );


    if (!pending) {
        return;
    }


    try {

        const order =
            JSON.parse(pending);


        localStorage.removeItem(
            "annisahPendingThankYou"
        );


        showOrderSuccess(order);

    }

    catch (error) {

        console.error(
            "Thank You page error:",
            error
        );


        localStorage.removeItem(
            "annisahPendingThankYou"
        );

    }
}


/* ==========================================
   WHEN USER RETURNS FROM WHATSAPP
========================================== */

window.addEventListener(
    "pageshow",
    function () {

        setTimeout(() => {

            checkPendingThankYou();

        }, 300);

    }
);


/* ==========================================
   ORDER SUCCESS PAGE
========================================== */

function showOrderSuccess(order) {

    const old =
        document.getElementById(
            "orderSuccessPage"
        );


    if (old) {
        old.remove();
    }


    const page =
        document.createElement("div");


    page.id =
        "orderSuccessPage";


    const productHTML =
        order.products
            .map(item => `

                <div class="success-product">

                    <div>

                        <strong>
                            ${item.name}
                        </strong>

                        <span>
                            Qty: ${item.quantity}
                        </span>

                    </div>


                    <strong>
                        ₹${item.price * item.quantity}
                    </strong>

                </div>

            `)
            .join("");


    page.innerHTML = `

        <div class="success-container">


            <div class="success-icon">
                ✓
            </div>


            <p class="success-eyebrow">
                ORDER SUCCESSFUL
            </p>


            <h1>
                Thank You!
            </h1>


            <p class="success-message">
                Your order has been successfully received.
                Our team will contact you on WhatsApp
                with the order details and further updates.
            </p>


            <div class="success-order-card">


                <div class="success-order-header">

                    <span>
                        Order ID
                    </span>

                    <strong>
                        ${order.id}
                    </strong>

                </div>


                <div class="success-detail">

                    <span>
                        Customer
                    </span>

                    <strong>
                        ${order.customerName}
                    </strong>

                </div>


                <div class="success-detail">

                    <span>
                        Order Date
                    </span>

                    <strong>
                        ${order.date}
                    </strong>

                </div>


                <div class="success-detail">

                    <span>
                        Order Status
                    </span>

                    <strong>
                        ${order.orderStatus}
                    </strong>

                </div>


                <div class="success-detail">

                    <span>
                        Payment Status
                    </span>

                    <strong>
                        ${order.paymentStatus}
                    </strong>

                </div>


                <div class="success-products">

                    <h3>
                        Your Products
                    </h3>

                    ${productHTML}

                </div>


                <div class="success-total">

                    <span>
                        Total
                    </span>

                    <strong>
                        ₹${order.total}
                    </strong>

                </div>


            </div>


            <div class="success-actions">

                <button
                    class="main-pay-button"
                    onclick="continueShopping()"
                >
                    Continue Shopping
                </button>


                <button
                    class="success-orders-btn"
                    onclick="showMyOrders()"
                >
                    View My Orders
                </button>

            </div>


            <p class="success-note">
                💬 Order details will be sent through WhatsApp.
            </p>


        </div>

    `;


    document.body.appendChild(page);


    setTimeout(() => {

        page.classList.add("active");

    }, 20);
}


/* ==========================================
   CONTINUE SHOPPING
========================================== */

function continueShopping() {

    const page =
        document.getElementById(
            "orderSuccessPage"
        );


    if (page) {
        page.remove();
    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ==========================================
   MY ORDERS
========================================== */

function showMyOrders() {

    if (!isCustomerLoggedIn()) {

        openLogin();

        return;
    }


    const existing =
        document.getElementById(
            "myOrdersPage"
        );


    if (existing) {
        existing.remove();
    }


    const allOrders =
        JSON.parse(
            localStorage.getItem(
                "annisahOrders"
            ) || "[]"
        );


    const email =
        customerAccount?.email || "";


    const phone =
        customerAccount?.phone || "";


    const orders =
        allOrders.filter(order =>
            order.customerEmail === email ||
            order.customerPhone === phone
        );


    const page =
        document.createElement("div");


    page.id =
        "myOrdersPage";


    let orderHTML = "";


    if (orders.length === 0) {

        orderHTML = `

            <div class="category-empty">

                <div class="empty-icon">
                    ✦
                </div>

                <h2>
                    No Orders Yet
                </h2>

                <p>
                    Your previous orders will appear here.
                </p>

            </div>

        `;

    }

    else {

        orders.forEach(order => {

            const productsHTML =
                order.products
                    .map(item => `

                        <div class="success-product">

                            <div>

                                <strong>
                                    ${item.name}
                                </strong>

                                <span>
                                    Qty: ${item.quantity}
                                </span>

                            </div>


                            <strong>
                                ₹${item.price * item.quantity}
                            </strong>

                        </div>

                    `)
                    .join("");


            orderHTML += `

                <div class="my-order-card">


                    <div class="success-order-header">

                        <span>
                            ${order.id}
                        </span>

                        <strong>
                            ${order.orderStatus}
                        </strong>

                    </div>


                    <p>
                        ${order.date}
                    </p>


                    ${productsHTML}


                    <div class="success-total">

                        <span>
                            Total
                        </span>

                        <strong>
                            ₹${order.total}
                        </strong>

                    </div>


                    <div class="success-detail">

                        <span>
                            Payment
                        </span>

                        <strong>
                            ${order.paymentStatus}
                        </strong>

                    </div>


                </div>

            `;

        });

    }


    page.innerHTML = `

        <div class="my-orders-container">


            <button
                class="back-button"
                onclick="closeMyOrders()"
            >
                ← Back
            </button>


            <div class="checkout-title">

                <p>
                    AN-NISAH
                </p>

                <h1>
                    My Orders
                </h1>

                <span>
                    View your previous orders and status.
                </span>

            </div>


            <div class="my-orders-list">

                ${orderHTML}

            </div>


        </div>

    `;


    document.body.appendChild(page);


    setTimeout(() => {

        page.classList.add("active");

    }, 20);
}


/* ==========================================
   CLOSE MY ORDERS
========================================== */

function closeMyOrders() {

    const page =
        document.getElementById(
            "myOrdersPage"
        );


    if (page) {
        page.remove();
    }
}


/* ==========================================
   FINAL INITIALIZE
========================================== */

showMainProducts();

updateCart();

updateLoginButton();

checkPendingThankYou();

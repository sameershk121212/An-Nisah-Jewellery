/* ==========================================
   AN-NISAH JEWELLERY
   CUSTOMER WEBSITE SCRIPT
   RAZORPAY READY VERSION
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
                    Beautiful ${title.toLowerCase()}
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
        document.getElementById(
            "categoryPage"
        );

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
        document.getElementById(
            "cartCount"
        );

    const items =
        document.getElementById(
            "cartItems"
        );

    const total =
        document.getElementById(
            "cartTotal"
        );

    if (!count || !items || !total) {

        return;

    }

    let totalItems = 0;

    let totalPrice = 0;

    cart.forEach(item => {

        totalItems +=
            item.quantity;

        totalPrice +=
            item.price *
            item.quantity;

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

    cart.splice(index, 1);

    updateCart();

}


/* ==========================================
   OPEN CART
========================================== */

function openCart() {

    const overlay =
        document.getElementById(
            "cartOverlay"
        );

    if (!overlay) return;

    overlay.classList.add("active");

}


/* ==========================================
   CLOSE CART
========================================== */

function closeCart() {

    const overlay =
        document.getElementById(
            "cartOverlay"
        );

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
                item.price *
                item.quantity
            );

        },

        0

    );

}


/* ==========================================
   SAVE ORDER
========================================== */

function saveOrder(
    customerName,
    customerEmail,
    customerAddress,
    paymentMethod,
    paymentStatus,
    paymentId = ""
) {

    const existing =
        localStorage.getItem(
            "annisahOrders"
        );

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

    closeCart();

    createCheckoutPage();

}


/* ==========================================
   CHECKOUT PAGE
========================================== */

function createCheckoutPage() {

    const old =
        document.getElementById(
            "checkoutPage"
        );

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
                    Choose your preferred
                    payment method.
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
                            Pay securely using
                            Razorpay UPI.
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
                            Send your order
                            directly through
                            WhatsApp.
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
        document.getElementById(
            "checkoutPage"
        );

    if (page) {

        page.remove();

    }

}


/* ==========================================
   UPI FORM
========================================== */

function showUPI() {

    const page =
        document.getElementById(
            "checkoutPage"
        );

    if (!page) return;

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
                    Enter your details before payment.
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
                    placeholder="Enter your email"
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
   LOAD RAZORPAY CHECKOUT
========================================== */

function loadRazorpayScript() {

    return new Promise((resolve, reject) => {

        if (window.Razorpay) {

            resolve();

            return;

        }

        const script =
            document.createElement("script");

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
        document
            .getElementById("name")
            .value
            .trim();

    const email =
        document
            .getElementById("email")
            .value
            .trim();

    const address =
        document
            .getElementById("address")
            .value
            .trim();


    if (!name) {

        alert(
            "Please enter your name."
        );

        return;

    }


    if (!email) {

        alert(
            "Please enter your email."
        );

        return;

    }


    if (!address) {

        alert(
            "Please enter your address."
        );

        return;

    }


    const amount =
        getTotal();


    try {

        await loadRazorpayScript();


        /* ================================
           CREATE ORDER ON SERVER
        ================================= */

        const response =
            await fetch(
                "http://localhost:5000/create-order",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({
                            amount: amount
                        })

                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "Unable to create payment order."
            );

        }


        /* ================================
           RAZORPAY OPTIONS
        ================================= */

        const options = {

            key:
                data.key_id,

            amount:
                data.amount,

            currency:
                "INR",

            name:
                "An-Nisah Jewellery",

            description:
                "Jewellery Order",

            order_id:
                data.order_id,


            prefill: {

                name:
                    name,

                email:
                    email

            },


            notes: {

                address:
                    address

            },


            theme: {

                color:
                    "#c9a227"

            },


            handler:
                async function (payment) {

                    saveOrder(

                        name,

                        email,

                        address,

                        "Razorpay",

                        "Payment Successful",

                        payment.razorpay_payment_id

                    );


                    alert(
                        "Payment successful! Your order has been placed."
                    );


                    cart = [];

                    updateCart();

                    closeCheckout();

                },


            modal: {

                ondismiss:
                    function () {

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
        document.getElementById(
            "checkoutPage"
        );

    if (!page) return;

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
                    WHATSAPP ORDER
                </p>

                <h1>
                    Your Details
                </h1>

                <span>
                    Enter your delivery
                    details below.
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

    const name =
        document
            .getElementById("waName")
            .value
            .trim();

    const address =
        document
            .getElementById("waAddress")
            .value
            .trim();


    if (!name) {

        alert(
            "Please enter your name."
        );

        return;

    }


    if (!address) {

        alert(
            "Please enter your address."
        );

        return;

    }


    saveOrder(

        name,

        "",

        address,

        "WhatsApp",

        "Order Received"

    );


    let message =
        "Hello An-Nisah Jewellery!\n\n";


    message +=
        "I want to place an order.\n\n";


    message +=
        "Name: " +
        name +
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
            (
                item.price *
                item.quantity
            ) +
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
        encodeURIComponent(
            message
        );


    window.open(
        whatsapp,
        "_blank"
    );

}


/* ==========================================
   INITIALIZE
========================================== */

showMainProducts();

updateCart();

const express = require("express");
const Razorpay = require("razorpay");
const dotenv = require("dotenv");
const cors = require("cors");
const crypto = require("crypto");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


/* ==========================================
   RAZORPAY
========================================== */

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});


/* ==========================================
   HOME
========================================== */

app.get("/", (req, res) => {

    res.send("An-Nisah Payment Server is running!");

});


/* ==========================================
   RAZORPAY KEY
========================================== */

app.get("/razorpay-key", (req, res) => {

    res.json({
        key: process.env.RAZORPAY_KEY_ID
    });

});


/* ==========================================
   CREATE RAZORPAY ORDER
========================================== */

app.post("/create-order", async (req, res) => {

    try {

        const amount = Number(req.body.amount);

        if (!amount || amount <= 0) {

            return res.status(400).json({
                success: false,
                message: "Invalid amount"
            });

        }


        const options = {

            amount: Math.round(amount * 100),

            currency: "INR",

            receipt:
                "annisah_" +
                Date.now()

        };


        const order =
            await razorpay.orders.create(options);


        res.json({

            success: true,

            orderId:
                order.id,

            amount:
                order.amount,

            currency:
                order.currency

        });

    }

    catch (error) {

        console.error(
            "Create Order Error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Unable to create Razorpay order"

        });

    }

});


/* ==========================================
   VERIFY PAYMENT
========================================== */

app.post("/verify-payment", (req, res) => {

    try {

        const {

            razorpay_order_id,

            razorpay_payment_id,

            razorpay_signature

        } = req.body;


        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Payment details are missing"

            });

        }


        const body =
            razorpay_order_id +
            "|" +
            razorpay_payment_id;


        const expectedSignature =
            crypto
                .createHmac(
                    "sha256",
                    process.env.RAZORPAY_KEY_SECRET
                )
                .update(body)
                .digest("hex");


        const isValid =
            expectedSignature ===
            razorpay_signature;


        if (!isValid) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid payment signature"

            });

        }


        res.json({

            success: true,

            message:
                "Payment verified successfully"

        });

    }

    catch (error) {

        console.error(
            "Verification Error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Payment verification failed"

        });

    }

});


/* ==========================================
   START SERVER
========================================== */

app.listen(5000, () => {

    console.log(
        "Razorpay is ready."
    );

    console.log(
        "Server running on http://localhost:5000"
    );

});

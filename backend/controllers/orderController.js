import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)



// Create a new order

const placeOrder = async (req, res) => {

    const frontend_url = "https://home-helps-frontend.onrender.com"

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,

        })

        await newOrder.save();

        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} })


        const line_items = req.body.items.map((item) => ({

            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 80
            },
            quantity: item.quantity

        }))


        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100 * 80
            },
            quantity: 1
        })


        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`

        })


        res.json({ success: true, session_url: session.url })



    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Something went wrong" })
    }



}


const verifyOrder = async (req, res) => {

    const { orderId, success } = req.body;

    try {
        if (success == "true") {

            await orderModel.findByIdAndUpdate(orderId, { payment: true })

            res.json({ success: true, message: "Order placed successfully" })

        }
        else {
            await orderModel.findByIdAndDelete(orderId)

            res.json({ success: false, message: "Order failed" })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Something went wrong" })
    }

}


// user orders for frontend

const userOrders = async (req, res) => {

    try {
        const orders = await orderModel.find({ userId: req.body.userId })

        res.json({ success: true, data: orders })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Something went wrong" })
    }

}


// listing orders for admin panel

const listOrders = async (req, res) => {


    try {
        const orders = await orderModel.find({})
        res.json({ success: true, data: orders })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Something went wrong" })
    }



}


// api for updating the order status

const updateOrderStatus = async (req, res) => {


    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status })

        res.json({ success: true, message: "Order status updated" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Something went wrong" })
    }

}

export { placeOrder, verifyOrder, userOrders, listOrders, updateOrderStatus };

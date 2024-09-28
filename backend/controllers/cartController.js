import userModel from '../models/userModel.js';
import authMiddleware from '../middleware/auth.js';

// add items to the cart

const addToCart = async (req, res) => {

    try {
        let userData = await userModel.findById(req.body.userId);

        let cartData = await userData.cartData;

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        }

        else {
            cartData[req.body.itemId] += 1;
        }


        await userModel.findByIdAndUpdate(req.body.userId, { cartData: cartData });


        res.json({ success: true, message: "Item added to the cart" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }

}


// remove items from the cart

const removeFromCart = async (req, res) => {


    try {

        let userData = await userModel.findById(req.body.userId);


        let cartData = await userData.cartData;

        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }


        await userModel.findByIdAndUpdate(req.body.userId, { cartData });

        res.json({ success: true, message: "Item removed from the cart" });

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }

}


// fetch the cart data

const getCart = async (req, res) => {


    try {
        let userData = await userModel.findById(req.body.userId);

        let cartData = await userData.cartData;

        res.json({ success: true, cartData: cartData });


    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }


}

export { addToCart, removeFromCart, getCart };
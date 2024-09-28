import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

import validator from "validator";



// login user

const loginUser = async (req, res) => {

    const { email, password } = req.body;

    try {

        // check if user exists
        const user = await userModel.findOne({
            email
        })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        // check if password is correct

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        const token = createToken(user._id)

        res.json({
            success: true,
            token
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }

}


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}


// register user

const registerUser = async (req, res) => {

    const { name, email, password } = req.body;
    try {

        // check if user already exists
        const exist = await userModel.findOne({
            email
        })

        if (exist) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }


        // validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email"
            })
        }


        // password length check
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be atleast 8 characters"
            })
        }


        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })


        const user = await newUser.save();


        const token = createToken(user._id)

        res.json({
            success: true,
            message: "User registered successfully",
            token
        })




    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }

}


export { loginUser, registerUser }
import { log } from "console";
import foodModel from "../models/foodModel.js";
import fs from "fs";


// add food-item

const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category
    })


    try {
        await food.save();

        res.status(201).json({ success: true, message: "Food added successfully" })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to add food" })

    }

}


// all food list

const listFood = async (req, res) => {

    try {
        const foods = await foodModel.find({});
        res.status(200).json({ success: true, data: foods })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to fetch food items" })

    }


}


// remove food item

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        fs.unlink(`uploads/${food.image}`, () => {

        })


        await foodModel.findByIdAndDelete(req.body.id);

        res.status(200).json({ success: true, message: "Food removed successfully" })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to remove food" })
    }

}

export { addFood, listFood, removeFood }
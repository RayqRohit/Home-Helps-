import mongoose from "mongoose";

export const connectDB = async () => {


    await mongoose.connect("mongodb+srv://rohit1172:mongo3301@cluster0.deox8.mongodb.net/food-del")
        .then(() => console.log("connected to db"));

}



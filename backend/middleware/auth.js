import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {

    const { token } = req.headers;

    // here what we are doing is we are checking if the token is present or not and if present then it takes the token and convert it into the userId and then pass it to the controller so that to use the functions in the controller.

    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized Try Again" })
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        req.body.userId = token_decode.id;

        next();
    }
    catch (error) {
        console.log(error);

        return res.status(401).json({ success: false, message: "Not Authorized Try Again" })
    }

}


export default authMiddleware;
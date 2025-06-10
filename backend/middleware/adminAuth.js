import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers
        console.log(token)

        console.log("Token:", token);
        if (!token) {
            return res.json({ success: false, message: "not Authorized Login Gain" })


        }
        const token_decode = jwt.verify(token, process.env.JWT_SECURET);
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: "not Authorized Login Gain" })


        }
        next()


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })


    }

}
export default adminAuth;
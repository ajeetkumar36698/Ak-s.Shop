import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js"



const createToken = async (id) => {
    return jwt.sign({ id }, process.env.JWT_SECURET)

}

// Route for user Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: 'user doesnot exists' })

        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = await createToken(user._id)
            res.json({ success: true, token })


        }
        else {
            return res.json({ success: false, message: 'invaild credentials' })

        }

    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })


    }


}


// Route for user register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        // checking user alrady exist or not
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: 'User already exists' })
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "please enter a valid email" })

        }
        if (password.length < 8) {
            return res.json({ success: false, message: "please enter a strong password" })

        }
        // hashing user and password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })
        const user = await newUser.save()



        const token = await createToken(user._id)

        res.json({ success: true, token })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })

    }

}


// Route for admin Login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email == process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECURET);
            res.json({ success: true, token })

        } else {
            res.json({ success: false, message: "invalid credinatal" })
        }

    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })


    }

}


export { loginUser, registerUser, adminLogin }
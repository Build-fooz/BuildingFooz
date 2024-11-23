import userModel from "../models/User.model.js";
import jwt from 'jsonwebtoken'
import validator from "validator";
import bcryptjs from "bcryptjs";
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

export const register = async (req, res) => {
    const { email, name, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" })
        }
        // validating email and password

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email" })
        }
        if (email.length > 30 && email.length < 5) {
            return res.status(400).json({ success: false, message: "Email should be between 5 to 30 characters" })
        }
        if (password.length < 5) {
            return res.status(400).json({ success: false, message: "Password should be at least 5 characters long" })
        }

        // coverting password into hashed password

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = new userModel({
            name, email, password: hashedPassword
        })
        const user = await newUser.save()

        const token = createToken(user._id)

        res.cookie("token", token, { httpOnly: true, secure: true }).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" })

    }

}

export const login = async (req, res) => {

    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        const isMatch = await bcryptjs.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        const token = createToken(user._id)
        res.cookie("token", token, { httpOnly: true, secure: false }).json({
            success: true,
            message: "User logged in successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token
        })
    }


    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });

    }
}

export const userDetails = async (req, res) => {     //for user profile which user can access itself
    try {
        const user = await userModel.findById(req.user.id).select('-password')
        res.json({ success: true, user })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server error" })
    }

}

export const updateDetails = async (req, res) => {
    const { name, email, password } = req.body
    try {

        const updateDetails = {}



        // updating only provided fields
        if (name) updateDetails.name = name
        if (password) {
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(password, salt)
            updateDetails.password = hashedPassword
        }
        if (email) {
            if (!validator.isEmail(newEmail)) {
                return res.status(400).json({ success: false, message: "Invalid email" })
            }
            if (newEmail.length > 30 || newEmail.length < 5) {
                return res.status(400).json({ success: false, message: "Email should be between 5 to 30 characters" })
            }
            updateDetails.email = email
        }

        const user = await userModel.findByIdAndUpdate(req.user.id, updateDetails, { new: true })
        res.json({
            success: true,
            message: "Profile updated successfully",
            user: user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server error" });

    }
}



export const logout = async (req, res) => {
    res.clearCookie("token").json({
        success: true,
        message: "User logged out successfully"
    })
}
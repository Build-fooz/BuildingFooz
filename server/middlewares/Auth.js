import jwt from 'jsonwebtoken'

export const authUser = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Token is not valid"
        })
    }

}


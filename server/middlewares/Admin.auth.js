import jwt from 'jsonwebtoken'

export const isAdminMiddleware = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access' })
    }
    try {
        const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET)

        if (!decoded.isAdmin) {
            return res.status(403).json({ message: 'Access denied: Not an Admin' })
        }
        req.user = decoded;
        next()

    } catch (error) {
        console.log(error);
        res.status(403).json({ message: 'Access denied: Invalid token' })

    }
}
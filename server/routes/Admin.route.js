import express from 'express'
import { addProduct, adminLogin, deleteProduct, editProduct, getAllProducts, singleProduct } from '../controllers/Admin.controller.js'
import { isAdminMiddleware } from '../middlewares/Admin.auth.js'
import upload from '../middlewares/Multer.js'

const adminRoute = express.Router()

adminRoute.post('/admin-login', adminLogin)
adminRoute.post('/add', isAdminMiddleware, upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }]), addProduct)
adminRoute.post('/remove/:id', isAdminMiddleware, deleteProduct)
adminRoute.get('/single', isAdminMiddleware, singleProduct)
adminRoute.put('/edit/:id', isAdminMiddleware, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]), editProduct); adminRoute.get('/get-products', isAdminMiddleware, getAllProducts)

export default adminRoute
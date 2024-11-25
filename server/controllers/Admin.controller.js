import userModel from "../models/User.model.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import Product from "../models/Product.js";

const createToken = (id, isAdmin) => {
    return jwt.sign({ id, isAdmin }, process.env.ADMIN_JWT_SECRET, { expiresIn: '7d' })
}
export const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isPasswordMatch = await bcryptjs.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        if (!user.isAdmin) {
            return res.json({ token })
        }
        const token = createToken(user._id, user.isAdmin)


        res.cookie('token', token, { httpOnly: true }).json({
            message: "Login Successful",
            token,
            isAdmin: user.isAdmin
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server Error' });

    }
}

export const addProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, category, price, salesPrice, totalStock, averageReview } = req.body;

        const image1 = req.files?.image1 && req.files.image1[0];
        const image2 = req.files?.image2 && req.files.image2[0];
        const image3 = req.files?.image3 && req.files.image3[0];
        const image4 = req.files?.image4 && req.files.image4[0];

        const imagesToUpload = [image1, image2, image3, image4].filter(item => item !== undefined && item !== null);

        const findProduct = await Product.findById(id);

        if (!findProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        findProduct.title = title || findProduct.title;
        findProduct.description = description || findProduct.description;
        findProduct.category = category || findProduct.category;
        findProduct.price = price || findProduct.price;
        findProduct.salesPrice = salesPrice || findProduct.salesPrice;
        findProduct.totalStock = totalStock || findProduct.totalStock;
        findProduct.averageReview = averageReview || findProduct.averageReview;

        if (imagesToUpload.length > 0) {
            const imageUrls = await Promise.all(
                imagesToUpload.map(async (image) => {
                    const result = await cloudinary.uploader.upload(image.path, { resource_type: 'image' });
                    return result.secure_url;
                })
            );
            findProduct.images = [...findProduct.images, ...imageUrls];  // Add new images to existing ones
        }


        await findProduct.save();

        res.json({
            success: true,
            message: 'Product updated successfully',
            product: findProduct,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const listOfProducts = await Product.find({})

        res.json({
            success: true,
            message: "Products fetched successfully",
            products: listOfProducts
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server Error' });

    }
}

export const editProduct = async (req, res) => {
    try {
        const { id } = req.params
        const {
            title,
            description,
            category,
            price,
            salesPrice,
            totalStock,
            averageReview,

        } = req.body;
        const image1 = req.files?.image1 && req.files.image1[0];
        const image2 = req.files?.image2 && req.files.image2[0];
        const image3 = req.files?.image3 && req.files.image3[0];
        const image4 = req.files?.image4 && req.files.image4[0];

        const imageToUpload = [image1, image2, image3, image4].filter((item) => item !== undefined && item !== null);

        const findProduct = await Product.findById(id)

        if (!findProduct) {
            return res.status(404).json({ message: 'Product not found' })
        }
        findProduct.title = title || findProduct.title
        findProduct.description = description || findProduct.description
        findProduct.category = category || findProduct.category
        findProduct.price = price === "" ? 0 : price || findProduct.price;
        findProduct.salesPrice = salesPrice === "" ? 0 : salesPrice || findProduct.salesPrice;
        findProduct.totalStock = totalStock || findProduct.totalStock
        findProduct.averageReview = averageReview || findProduct.averageReview
        if (imageToUpload.length > 0) {
            const imageUrls = await Promise.all(
                imageToUpload.map(async (image) => {
                    const result = await cloudinary.uploader.upload(image.path, { resource_type: 'image' });
                    return result.secure_url;
                })
            );

            findProduct.images = [...findProduct.images, ...imageUrls];
        }

        await findProduct.save()

        res.json({
            success: true,
            message: "Product updated successfully",
            product: findProduct
        })





    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server Error' });

    }

}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params

        const product = await Product.findByIdAndDelete(id)

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }
        res.json({
            success: true,
            message: 'Product deleted successfully',

        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server Error' });

    }
}

export const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await Product.findById(productId)
        res.json({
            success: true,
            message: "Product fetched successfully",
            product
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server Error' });

    }
}
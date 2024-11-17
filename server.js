require('dotenv').config();
require('events').EventEmitter.defaultMaxListeners = 20;

// import { Routes } from 'react-router-dom';

const express = require('express');
const mongoose = require ('mongoose');
const cookieParser = require('cookie-parser');
const cors = require ('cors');
const authRouter = require('./routes/auth/auth-routes');
const adminProductsRouter = require('./routes/admin/products-routes')
const shopProductsRouter = require("./routes/shop/products-routes");

mongoose
.connect('mongodb+srv://thohira:thohi1210@fooz.z135l.mongodb.net/')
.then(()=>console.log('MongoDB connected'))
.catch((error) => console.log(error));


const app = express();
const PORT = process.env.PORT || 5000;
app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Cache-Control',  // Corrected header name
            'Expires',
            'Pragma',
        ],
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRouter);
app.use('/api/admin/products',adminProductsRouter);
app.use("/api/shopall/products", shopProductsRouter);

app.listen(PORT,()=> console.log(`Server is now running on the port ${PORT}`));
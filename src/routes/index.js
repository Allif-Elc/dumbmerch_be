const express = require('express');

const router = express.Router();


//controllers
const { register, login, checkAuth } = require("../controllers/auth");
const { addProfile,getProfile, updateUser} = require("../controllers/users");
const { searchProduct,
        getProduct,
        getProducts,
        addProduct,
        updateProduct,
        deleteProduct} = require("../controllers/products");
const { addTransaction,
        getTransaction,
        notification} = require("../controllers/transaction");
const { addCategory,
        deleteCategory,
        getCategories,
        getCategory,
        updateCategory,} = require("../controllers/categories");
const {addChat,getChats} = require("../controllers/chat");

//middlewares 
const { auth } = require("../middleware/auth");
const { uploadFiles } = require("../middleware/uploadFiles");


//routes
router.post('/login', login);
router.post('/register', register);
router.get ('/check-auth',auth, checkAuth);

router.get('/search',auth,searchProduct);
router.get('/product/:id', auth,getProduct);
router.get('/products', getProducts);
router.post('/product', auth,uploadFiles("image"),addProduct);
router.patch('/product/:id', auth,uploadFiles("image"),updateProduct);
router.delete('/product/:id', auth,deleteProduct);

router.get('/category/:id', auth,getCategory);
router.get('/categories', getCategories);
router.post('/category', auth,addCategory);
router.patch('/category/:id', auth,updateCategory);
router.delete('/category/:id', auth,deleteCategory);

router.get('/transaction',auth, getTransaction);
router.post('/transaction', auth,addTransaction);
router.post('/notification', notification);

router.get('/chat',auth, getChats);
router.post('/chat', auth,addChat);

router.get('/profile',auth,getProfile);
router.post('/profile',auth,addProfile);
router.patch('/profile',auth,uploadFiles("photo"),updateUser);

module.exports = router;
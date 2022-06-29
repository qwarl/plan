const express = require('express')
const router = express.Router()
const cartController=require('../app/controllers/CartsController')
const authToken=require('../app/middlewares/auth')

// route.get('/:IdUser',cartController.getCartById)
router.get('/getAll',cartController.getAll)
router.get('/getCartByIdUser/:IdUser',cartController.getCartByIdUser)
router.post('/clearAllItemInCartByIdUser/:IdUser',cartController.clearAllItemInCartByIdUser)
router.post('/deleteItemInCart/:IdProduct',cartController.deleteItemInCart)
router.post('/addToCart',cartController.addToCart)
module.exports=router
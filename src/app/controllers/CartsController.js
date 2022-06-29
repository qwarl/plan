const { findOne } = require('../models/Cart')
const Cart = require('../models/Cart')
// const Product = require('../models/Product')
const User = require('../models/User')

class CartController {

    // [get] carts/getAll
    async getAll(req, res) {
        try {
            const carts = await Cart.find()
            res.status(200).json({ success: true, message: 'Get all carts successfully', carts })
        } catch (error) {
            res.status(400).json({ success: false, message: 'Get all carts fail' })
        }
    }

    // [get] carts/:IdUser
    async getCartByIdUser(req, res) {
        // const carts = []
        // const IdUser = req.params.IdUser
        // console.log('IdUser: ', IdUser);

        let listProduct = [];
        Cart.find({ IdUser: req.params.idUser })
            .populate("idProduct") // key to populate
            .then(cart => {
                //cart.foreach(item=> console.log(item.idProduct))
                //cart.forEach(element => listProduct.push(element.idProduct));
                // console.log(listProduct);
                res.json(cart);
            });

        // try {
        //     await Cart.find({ IdUser: IdUser })
        //         .populate('IdProduct')
        //     res.status(200).json({ success: true, message: 'Get cart by IdUser successfully', carts })
        // } catch (error) {
        //     res.status(400).json({ success: false, message: 'Get cart by IdUser fail' })
        // }
    }

    // [post] carts/clearAllItemInCartByIdUser
    async clearAllItemInCartByIdUser(req, res) {
        const IdUser = req.params.IdUser
        console.log('IdUser: ', IdUser);
        try {
            await Cart.deleteMany({ IdUser: IdUser })
            res.status(200).json({ success: true, message: 'Clear all item in cart by IdUser successfully' })
                .redirect('/cart/clearAllItemInCartByIdUser')
        } catch (error) {
            res.status(400).json({ success: false, message: 'Clear all item in cart by IdUser fail' })
        }

    }

    // [post] carts/deleteItemInCart
    async deleteItemInCart(req, res) {
        const IdProduct = req.params.IdProduct
        console.log('IdProduct: ', IdProduct);
        try {
            await Cart.deleteOne({ IdProduct: IdProduct })
            res.status(200).json({ success: true, message: 'Delete item in cart successfully' })
                .redirect('/deleteItemInCart')
        } catch (error) {
            res.status(400).json({ success: false, message: 'Delete item in cart fail' })
        }
    }
    // [post] carts/addToCart
    async addToCart(req, res) {
        const checkCart = await Cart.findOne({ IdProduct: req.body.IdProduct, IdUser: req.body.IdUser })
        if (!checkCart) {
            let newCart = Cart(req.body)
            
            newCart.save()
                .then(
                    () => res.status(200).json({ success: true, message: 'Add new cart successfully' })
                        // .redirect('/addToCart')
                        )
                        // console.log('cart: ', newCart)
                .catch(
                    (err) => res.status(400).json({ success: false, message: 'Add new cart failure' })
                )
        }
        else { // update quantity
            checkCart.itemNum = checkCart.itemNum + req.body.itemNum
            checkCart.save()
            res.status(200).json({ success: true, message: 'Add new cart successfully' })
                // .redirect('/addToCart')
            // console.log("Add new cart SUCCESSFULLY!");
            // res.redirect('/addToCart')
        }       
    }
}


module.exports = new CartController
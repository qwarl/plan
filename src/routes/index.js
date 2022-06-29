const adminRoute = require('./admin')
const userRoute = require('./user')
const cartRoute = require('./cart')
const productRoute = require('./product')

function route(app) {
    app.use('/admins', adminRoute)

    app.use('/users', userRoute)

    app.use('/carts', cartRoute)

    app.use('/product', productRoute)

}

module.exports = route
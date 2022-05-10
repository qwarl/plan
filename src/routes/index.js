const adminRoute = require('./admin')
const userRoute = require('./user')

function route(app) {
    app.use('/admins', adminRoute)
    
    app.use('/users', userRoute)

}

module.exports = route
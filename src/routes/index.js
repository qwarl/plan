const adminRoute=require('./admin')

function route(app){
app.use('/admins', adminRoute)

}

module.exports=route
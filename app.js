require('dotenv').config()

const express= require('express')
const { blogs, users } = require('./model/index')
const app=express()





const blogRoute = require('./routers/blogRoute')
const auuthRoute = require('./routers/authRoute')



 app.set('view engine', 'ejs')
require('./model/index')

app.use(express.urlencoded({ extended: true}))
   
app.use('',blogRoute)
app.use('',auuthRoute)

 app.use(express.static("public/css/")) 
 app.use(express.static('./storage/'))

app.listen(3000,()=>{
    console.log ('start project')
})
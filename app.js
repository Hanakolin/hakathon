require('dotenv').config()

const express= require('express')
const { blogs, users } = require('./model/index')
require('./model/index')

const session = require('express-session')
const authRoute = require('./routers/authRoute')
const blogRoute = require('./routers/blogRoute');
const app=express()

app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}))

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use('/', authRoute)
app.use('/', blogRoute);

app.use(express.static("public/css/")) 
app.use(express.static('./storage/'))

app.listen(3000,()=>{
    console.log ('start project')
})

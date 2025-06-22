const express =require ('express')
const app = express()

app.set('view engine', 'ejs')

app.get('/',(req,res)=>{
    res.render('home.ejs')
})



app.use(express.static('public'))

app.listen(3000,()=>{
    console.log('start project vayo hai  ')
})
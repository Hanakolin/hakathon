const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize ('hakathon','root','',{
    host:'localhost',
    port:3306,
    dialect:'mysql',
    operatorsAliases:false,
    pool:{
        max:5,
        min:0,
        acquire:3000,
        ide:1000,
    }

})
sequelize.authenticate().then(()=>{
    console.log('milo hai yo ')

})
.catch((err)=>{
    console.log(' error ayo hai yehi ', err)
})

const db ={}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.sequelize.sync({ force:false}).then(()=>{
    console.log('sync vayo hai ')
})

module.exports = db
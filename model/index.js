const { Sequelize, DataTypes } = require("sequelize")
const databaseConfig = require('../config/dbConfig')
const makeBlogTable = require("./blogModel")
const makeUserTable = require("./userModel")

const sequelize = new Sequelize( databaseConfig.db,databaseConfig.username, databaseConfig.password,{
    host: databaseConfig.host, 
    port:databaseConfig.port,
    dialect: databaseConfig.dialect,
    operatorsAliases:false,
    pool:{
        max : 5,
        min :0,
        acquire :3000,
        ide : 1000
    }

})
sequelize.authenticate().then(()=>{
    console.log(' milo jhai ')
})
.catch((err)=>{
    console.log('error milo jhai', err)
})
const db={}
db.Sequelize = Sequelize
db.sequelize = sequelize 


db.blogs = makeBlogTable(sequelize,DataTypes )
db.users = makeUserTable( sequelize,DataTypes)


db.sequelize.sync({ force : false}). then(()=>{
    console.log('synced done')
})
module.exports = db
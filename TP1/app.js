//Carregando modulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')

const app = express()
const admin = require('./routes/admin')
const mongoose = require('mongoose')
const session = require("express-session")
const flash = require("connect-flash")
const path = require("path")

app.use(session({
    secret: "tp1",
    resave:true,
    saveUninitialized:true
}))

app.use(express.static(path.join(__dirname,"public")));

app.use(flash())

app.use((req,res,next) =>{
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.login_confirm = req.flash("login_confirm")
    next()
})

//Configuracoes
//  Body Parser
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json())
//  Handlebars
    app.engine('handlebars',handlebars({defaultLayout:'main'}))
    app.set('view engine', 'handlebars')
//  Mongoose
    mongoose.connect("mongodb+srv://pablohsgc:tp1mongo@cluster0.o0gi1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority").then(() =>{
        console.log("Conectado ao MongoDB")
    }).catch((err) =>{
        console.log("Erro ao se conectar!")
    })
//  Rotas
    app.use(admin)

    //

//Outros
const PORT = 3000
app.listen(PORT,() =>{
    console.log("Aplicação rodando na porta "+PORT)
})
    
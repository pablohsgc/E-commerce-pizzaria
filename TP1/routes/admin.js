const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

require("../models/Produto")
require("../models/Bairro")
require("../models/Usuario")

const Usuario = mongoose.model("usuarios")
const Bairro = mongoose.model("bairros")

const LoginController = require('../controller/LoginController')
const login = new LoginController()

const CardapioController = require('../controller/CardapioController')
const session = require("express-session")
const Cardapio = new CardapioController()

const CarrinhoController = require('../controller/CarrinhoController')
const carrinho = new CarrinhoController()

router.get('/', (req, res) =>{
    res.redirect('/cardapio')
})

router.get('/cardapio', async (req, res) =>{

    try{
        let categorias_cardapio = await Cardapio.cardapio()
        let pizzas_cardapio = [categorias_cardapio[0]]; 
        categorias_cardapio.shift();
        res.render("admin/cardapio",{pizzas:pizzas_cardapio,categorias:categorias_cardapio/*categorias:categorias_cardapio*/})
    }catch(erro){
        req.flash("error_msg", erro)
        res.render("admin/cardapio")
    }
})  

router.get('/cadastro', (req, res) =>{
    //Listagem de bairros no input de bairro da interface cadastro
    Bairro.find().then((bairros) =>{ 
        var elementos = [];
        
        bairros.forEach((elemento) =>{
            var item = {
                nome:elemento["nome"]					
            };
            elementos.push(item)
        })        
        res.render('admin/cadastro', {bairro: elementos})			
    }).catch((erro)=>{
        console.log(erro)			
    })     
})  

router.post("/cadastro", (req, res) => {
    
    const novoUsuario = {
        nome: req.body.nome,
        senha: req.body.senha1,
        cpf: req.body.cpf,
        email: req.body.email,
        telefone: req.body.telefone,
        endereco: {
            rua: req.body.rua,
            numero: req.body.numero,
            complemento: req.body.complemento,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            estado: req.body.estado,
            cep: req.body.cep
        }
    }
    if(req.body.senha1 != req.body.senha2){
        req.flash("error_msg", "As senhas digitadas devem ser iguais!")
        res.redirect('/cadastro')
    }
    else{
        new Usuario(novoUsuario).save().then( () => {
            req.flash("success_msg", "Usuario cadastrado com sucesso!")
            res.redirect("/cardapio")        
        }).catch((erro) => {
            req.flash("error_msg", "Houve um erro ao Cadastrar Usuário!")
            res.redirect("/cadastro")
        })
    }   
})

router.get("/login", (req, res) => {  
    if(login.usuario != null){
        req.flash("success_msg","Usuario já está logado!")
        res.redirect("/cardapio")
    }  
    res.render("admin/login")
})

router.post("/login", async (req, res) => {
    try{
        await login.login(req.body.email,req.body.password) 
        req.session.user = true
        res.redirect("/cardapio")
    }catch(erro){
        req.flash("error_msg",erro)
        res.redirect("/login")
    }
})

router.post("/nomePizza", async (req, res) =>{
    res.json(await Cardapio.nomes_pizzas())
})

router.get("/deslogarUsuario", (req,res) =>{
    login.logout()
    req.session.user = null
    carrinho.esvaziaCarrinho()
    res.redirect("/login")
})

router.post("/adicionaProduto", (req,res) =>{
    carrinho.addProdutoCarrinho(req.body.nome,req.body.preco,req.body.quantidade)
    res.json({"Produtos":carrinho.carrinho,"Total":carrinho.precoTotal})
})

router.post("/removeProduto", (req,res) =>{
    carrinho.removeProdutoCarrinho(req.body.nome)
    res.json({"Produtos":carrinho.carrinho,"Total":carrinho.precoTotal})
})

module.exports = router
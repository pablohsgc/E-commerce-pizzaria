const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

require("../models/Produto")
require("../models/Bairro")
require("../models/Usuario")

const Usuario = mongoose.model("usuarios")
const Bairro = mongoose.model("bairros")

const AutenticacaoUsuario = require('../controller/AutenticacaoUsuario')
const CardapioController = require('../controller/CardapioController')
const Cardapio = new CardapioController()

router.get('/', (req, res) =>{
    res.redirect('/cardapio')
})

router.get('/cardapio', async (req, res) =>{
    /*Produto.find().then((produtos) =>{ 
        var elementos = [];

        produtos.forEach((elemento) =>{
            var item = {
                nome:elemento["nome"],
                descricao:elemento["descricao"],
                preco:elemento["preco"]
            };
            elementos.push(item)
        })
        res.render("admin/cardapio",{categorias: elementos})
    }).catch((erro)=>{
        req.flash("error_msg","Houve erro ao listar as categorias!")
        res.redirect("/admin")
    })*/
    /*
    let pizzas = await Cardapio.pizzas()
    res.render("admin/cardapio",{categorias:pizzas})*/
    let categorias_cardapio = await Cardapio.cardapio()
    res.render("admin/cardapio",{categorias:categorias_cardapio})
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

/*
router.get('/categorias/add', (req, res) =>{
    res.render("admin/addcategorias") 
})

router.post("/categorias/nova",(req,res) =>{
    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto:"Nome inválido"})
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({texto:"Slug inválido"})
    }

    if(erros.length > 0){
        res.render("admin/addcategorias",{erros:erros})
    }else{
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }
    
        new Categoria(novaCategoria).save().then(() =>{
            req.flash("success_msg","Categoria criada com sucesso!")
            res.redirect("/categorias")
        }).catch((erro) =>{
            req.flash("error_msg","Categoria criada com sucesso!")
            res.redirect("/categorias")
        })
    }
})
*/
router.get("/login", (req, res) => {    
    res.render("admin/login")
})

router.post("/login", async (req, res) => {
    let Autenticacao = new AutenticacaoUsuario(req.body.email,req.body.password) 
    let resultado = await Autenticacao.autenticar()  
    res.send(resultado)
})

module.exports = router
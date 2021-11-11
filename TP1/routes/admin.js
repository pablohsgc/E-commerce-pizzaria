const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

require("../models/Categorias")
require("../models/Produto")
require("../models/Bairro")
require("../models/Usuario")
//require("../models/Endereco")

//const Endereco = mongoose.model("enderecos")
const Usuario = mongoose.model("usuarios")
const Categoria = mongoose.model("categorias")
const Produto = mongoose.model("produtos")
const Bairro = mongoose.model("bairros")



router.get('/', (req, res) =>{
    res.render('admin/index')
})

router.get('/posts',(req, res) =>{
    res.send("Pagina de posts")
})


router.get('/categorias', (req, res) =>{
    Produto.find().then((produtos) =>{ 
        var elementos = [];

        produtos.forEach((elemento) =>{
            var item = {
                nome:elemento["nome"],
                descricao:elemento["descricao"],
                preco:elemento["preco"]
            };
            elementos.push(item)
        })
        res.render("admin/categorias",{categorias: elementos})
    }).catch((erro)=>{
        req.flash("error_msg","Houve erro ao listar as categorias!")
        res.redirect("/admin")
    })
   //res.render("admin/categorias") 
})  

router.get('/cadastro', (req, res) =>{
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
    
    new Usuario(novoUsuario).save().then( () => {
        req.flash("success_msg", "Usuario cadastrado com sucesso!")
        res.redirect("/categorias")        
    }).catch((erro) => {
        req.flash("error_msg", "Houve um erro ao Cadastrar Usuário!")
        res.redirect("/cadastro")
    })
})

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

module.exports = router
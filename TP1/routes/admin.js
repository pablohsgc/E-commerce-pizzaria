const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

require("../models/Produto")
require("../models/Bairro")
require("../models/Usuario")

const CadastroUsuarioController = require('../controller/CadastroUsuarioController')
const usuario = new CadastroUsuarioController()

const FinalizaPedidoController = require('../controller/FinalizaPedidoController')
const pedido = new FinalizaPedidoController()

const BairroController = require('../controller/BairroController')
const bairro = new BairroController();

const LoginController = require('../controller/LoginController')
const login = new LoginController()

const CardapioController = require('../controller/CardapioController')
const session = require("express-session")
const Cardapio = new CardapioController()

const CarrinhoController = require('../controller/CarrinhoController')
const carrinho = new CarrinhoController()

router.get('/', (req, res) => {
    res.redirect('/cardapio')
})

router.get('/cardapio', async (req, res) => {

    try {
        let categorias_cardapio = await Cardapio.cardapio()
        let pizzas_cardapio = [categorias_cardapio[0]];
        categorias_cardapio.shift();
        res.render("admin/cardapio", { pizzas: pizzas_cardapio, categorias: categorias_cardapio/*categorias:categorias_cardapio*/ })
    } catch (erro) {
        req.flash("error_msg", erro)
        res.render("admin/cardapio")
    }
})

//Listagem de bairros no input de bairro da interface cadastro    
router.get('/cadastro', async (req, res) => {
    try {
        let lista_bairros = []
        lista_bairros = await bairro.listarBairros()
        res.render('admin/cadastro', { bairro: lista_bairros })
    } catch (erro) {
        req.flash("error_msg", erro)
    }
})
//Cadastro do novo usuário
router.post("/cadastro", (req, res) => {
    try {
        let endereco = {
            rua: req.body.rua,
            numero: req.body.numero,
            complemento: req.body.complemento,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            estado: req.body.estado,
            cep: req.body.cep
        }
        usuario.addUsuario(req.body.nome,
            req.body.senha1,
            req.body.senha2,
            req.body.cpf,
            req.body.email,
            req.body.telefone,
            endereco)
        req.flash("success_msg", "Usuario cadastrado com sucesso!")
        res.redirect("/cardapio")
    } catch(erro){
        req.flash("error_msg", "Houve um erro ao Cadastrar Usuário!")
        res.redirect("/cadastro")
    }
        
   
})

router.get("/login", (req, res) => {
    if (login.usuario != null) {
        req.flash("success_msg", "Usuario já está logado!")
        res.redirect("/cardapio")
    }
    res.render("admin/login")
})

router.post("/login", async (req, res) => {
    try {
        await login.login(req.body.email, req.body.password)
        req.session.user = true
        res.redirect("/cardapio")
    } catch (erro) {
        req.flash("error_msg", erro)
        res.redirect("/login")
    }
})

router.post("/nomePizza", async (req, res) => {
    res.json(await Cardapio.pizzas())
})

router.post("/finalizaPedido", async (req, res) => {
    try{
        if (carrinho.precoTotal != 0) {
            let endereco = login.usuario["endereco"]
            let nome = login.usuario["nome"]
            let dadosEntrega = {
                nome: nome,
                endereco: endereco
            }
            retorno = pedido.finalizaPedido(Date.now(), carrinho.getCarrinho(), carrinho.precoTotal, dadosEntrega)
            carrinho.esvaziaCarrinho()
            req.flash("success_msg", "Pedido realizado com sucesso!")      
            res.redirect("/cardapio");
        }
    } catch(erro){
        req.flash("error_msg", erro)
    }
        
})

router.get("/deslogarUsuario", (req, res) => {
    login.logout()
    req.session.user = null
    carrinho.esvaziaCarrinho()
    res.redirect("/login")
})

router.post("/adicionaProduto", (req, res) => {
    carrinho.addProdutoCarrinho(req.body.nome, req.body.preco, req.body.quantidade)
    res.json({ "Produtos": carrinho.carrinho, "Total": carrinho.precoTotal })
})

router.post("/removeProduto", (req, res) => {
    carrinho.removeProdutoCarrinho(req.body.nome)
    res.json({ "Produtos": carrinho.carrinho, "Total": carrinho.precoTotal })
})

router.post("/adicionaPizzaDoisSabores", (req,res) => {
    carrinho.adicionaPizzaDoisSabores(req.body.nome_pizza_1,
                                     req.body.nome_pizza_2,
                                     req.body.preco_pizza_1,
                                     req.body.preco_pizza_2,
                                     req.body.quantidade)
    res.json({ "Produtos": carrinho.carrinho, "Total": carrinho.precoTotal})
})

module.exports = router
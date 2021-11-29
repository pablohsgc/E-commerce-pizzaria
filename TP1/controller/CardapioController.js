const mongoose = require("mongoose")
require("../models/Produto")
const Produto = mongoose.model("produtos")

class CardapioController{
    constructor(){

    }

    async pizzas(nome_categoria){
        return await Produto.find({categoria: nome_categoria}).then((produtos) => { 
            var elementos = [];
    
            produtos.forEach((elemento) =>{
                var item = {
                    nome:elemento["nome"],
                    descricao:elemento["descricao"],
                    preco:elemento["preco"],
                    id:elemento["_id"]
                };
                elementos.push(item)
            })
            
            return elementos;
        }).catch((erro)=>{
            return null
        })
    }

    async cardapio(){
        var pizzas_cardapio = await this.pizzas("Pizzas")
        var bebidas_cardapio = await this.pizzas("Bebidas")
        var promocoes_cardapio = await this.pizzas("Promoções")

        var categorias = [{
            titulo_categoria:"Pizzas",
            elementos:pizzas_cardapio
        },{
            titulo_categoria:"Bebidas",
            elementos:bebidas_cardapio
        },{
            titulo_categoria:"Promoções",
            elementos:promocoes_cardapio
        }]

        return categorias;
    }

    async nomes_pizzas(){
        let pizzas = await this.pizzas("Pizzas");
        let nomes = pizzas.map(pizza => pizza.nome)
        return {Pizzas:nomes}
    }
}

module.exports = CardapioController
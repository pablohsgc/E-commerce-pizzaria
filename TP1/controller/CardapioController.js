const mongoose = require("mongoose")
require("../models/Produto")
const Produto = mongoose.model("produtos")

class CardapioController{
    constructor(){

    }

    async pizzas(){
        return await Produto.find().then((produtos) =>{ 
            var elementos = [];
    
            produtos.forEach((elemento) =>{
                var item = {
                    nome:elemento["nome"],
                    descricao:elemento["descricao"],
                    preco:elemento["preco"]
                };
                elementos.push(item)
            })
            
            return elementos;
        }).catch((erro)=>{
            return null
        })
    }
}

module.exports = CardapioController
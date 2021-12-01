const mongoose = require("mongoose")
require("../models/Produto")
const Produto = mongoose.model("produtos")

class CardapioController{
    constructor(){

    }

    async consulta_categoria(nome_categoria){
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
            throw erro
        })
    }

    async cardapio(){
        var pizzas_cardapio = await this.consulta_categoria("Pizzas")
        var bebidas_cardapio = await this.consulta_categoria("Bebidas")
        var promocoes_cardapio = await this.consulta_categoria("Promoções")

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

    async pizzas(){
        let consulta = await this.consulta_categoria("Pizzas");
        
        let pizzas = consulta.map(function(consulta){ 
            return  {nome:consulta.nome,preco:consulta.preco} 
        })

        return {Pizzas:pizzas}
    }
}

module.exports = CardapioController
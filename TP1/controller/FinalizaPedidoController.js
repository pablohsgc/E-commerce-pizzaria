/*
    Módulo que controla a finalização de pedidos
*/  
const mongoose = require("mongoose")
require("../models/Pedido")
const Pedido = mongoose.model("pedidos")

class FinalizaPedidoController{
    constructor(){        
    }

    async finalizaPedido(data, listaPedidos, precoTotal, dadosEntrega){        
        
        const pedido = {
            data: data,
            listaPedidos: listaPedidos,
            precoTotal: precoTotal,
            dadosEntrega: dadosEntrega
        }   
        console.log("PEDIDO ", pedido)
        new Pedido(pedido).save().then((pedidos) => {
            console.log("Certo")
            return "Sucesso"
        }).catch((erro) => {
            console.log(erro)
            return erro
        })        
    }

}

module.exports = FinalizaPedidoController
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
        new Pedido(pedido).save().then((pedidos) => {            
        }).catch((erro) => {            
            throw "Erro: Problema ao finalizar pedido!"
        })        
    }
}

module.exports = FinalizaPedidoController
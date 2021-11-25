const { DH_NOT_SUITABLE_GENERATOR } = require("constants")
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Usuario = mongoose.model("usuarios")
const Produto = mongoose.model("produtos")
require("../models/Usuario")
require("../models/Produto")

const Pedido = new Schema({
    data: {
        type: Date,
        required: true,
        default: Date.now()
    },
    listaPedidos: {
        produdo: {
            type: Schema.Types.ObjectId,
            ref: "produtos",
            required: true
        }           
    },
    precoTotal: {
        type: Number,
        required: true
    },
    dadosEntrega: {
        nome: {
            type: String,
            required: true
        },
        endereco: {
            rua: {
                type: String,
                required: true
            },
            numero: {
                type: String,
                required: true
            },
            complemento: {
                type: String            
            },
            bairro: {
                type: String,
                required: true
            }
        }    
    }    
        
})

mongoose.model("pedidos",Pedido)

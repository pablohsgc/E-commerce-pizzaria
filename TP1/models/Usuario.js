const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Bairro = mongoose.model("bairros")
require("../models/Bairro")

const Usuario = new Schema({
    nome: {
        type: String,
        required: true
    },
    senha:{
        type: String,
        required: true  
    },
    cpf:{
        type: String,
        required: true  
    },
    email: {
        type: String,
        required: true
    },
    telefone: {
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
})

mongoose.model("usuarios",Usuario)
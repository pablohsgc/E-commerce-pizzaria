const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Endereco = mongoose.model('enderecos')

const Usuario = new Schema({
    nome: {
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
    Endereco    
})

mongoose.model("usuarios",Usuario)
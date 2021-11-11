const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Bairro = mongoose.model("bairros")

endereco: [{
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
    Bairro,
}]

mongoose.model("enderecos",Endereco)
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("../models/Bairro")
const Bairro = mongoose.model("bairros")

const Endereco = new Schema({
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
        type: Schema.Types.ObjectId,
        ref: Bairro,
        required: true
    }
})

mongoose.model("enderecos",Endereco)
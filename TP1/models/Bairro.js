const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Bairro = new Schema({
    nome: {
        type:String,
        required:true
    }
})

mongoose.model("bairros",Bairro)
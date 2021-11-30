/*
    Módulo que controla a listagem de bairros no cadastro de usuário
*/

const mongoose = require("mongoose")
require("../models/Bairro")
const Bairro = mongoose.model("bairros")

class BairroController{

    constructor(){       
    }

    async listarBairros(){
        
        return await Bairro.find().then((bairros) =>{         
            var elementos = [];
            bairros.forEach((elemento) =>{
                var item = {
                    nome:elemento["nome"]					
                };
                elementos.push(item)
            })              
            return elementos      
        }).catch((erro)=>{
            console.log(erro)
            return null			
        })           
    }
}
module.exports = BairroController
const mongoose = require("mongoose")
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")

class AutenticacaoUsuario{
    constructor(email,password){
        this.email = email;
        this.password = password;
    }

    async autenticar(){
        return await Usuario.findOne({"email":this.email}).then((usuario) => {
            if(usuario["senha"] == this.password)
                return usuario
            throw "Erro: Credenciais incorretas ou usuário não existe!"
        }).catch((erro) => {
            throw erro
        })
    }
}

module.exports = AutenticacaoUsuario 
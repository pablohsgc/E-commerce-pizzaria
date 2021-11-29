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
            if(usuario == null || usuario["senha"] != this.password)
                throw "Erro: Credenciais incorretas ou usuário não existe!"
            return usuario
        }).catch((erro) => {
            throw erro
        })
    }
}

module.exports = AutenticacaoUsuario 
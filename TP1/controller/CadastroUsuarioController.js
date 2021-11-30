/*
    Módulo que controla o cadastro de um novo usuário
*/
const mongoose = require("mongoose")

require("../models/Usuario")

class CadastroUsuarioController{
    constructor(){       
    }

    addUsuario(nome, senha1, senha2, cpf, email, telefone, endereco){
        var retorno;
        const novoUsuario = {
            nome: nome,
            senha: senha1,
            cpf: cpf,
            email: email,
            telefone: telefone,
            endereco
        }
        if (senha1 != senha2) {
            return null
        }
        else {
            return novoUsuario
        }
    }
}

module.exports = CadastroUsuarioController
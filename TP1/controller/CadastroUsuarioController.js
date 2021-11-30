/*
    Módulo que controla o cadastro de um novo usuário
*/
const mongoose = require("mongoose")
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")

class CadastroUsuarioController{
    constructor(){   
        this.email 
        this.endereco;
    }

    addUsuario(nome, senha1, senha2, cpf, email, telefone, endereco){        
        let mensagem
        const novoUsuario = {
            nome: nome,
            senha: senha1,
            cpf: cpf,
            email: email,
            telefone: telefone,
            endereco
        }
        if(senha1 != senha2){
            req.flash("error_msg", "As senhas digitadas devem ser iguais!")
            res.redirect('/cadastro')
        } 
        else {
            new Usuario(novoUsuario).save().then(() => {                
            }).catch((erro) => {
                throw "Erro: Problema ao cadastrar novo usuário!"
            })
        }  
    }
}

module.exports = CadastroUsuarioController
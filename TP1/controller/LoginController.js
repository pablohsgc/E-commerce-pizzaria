const AutenticacaoUsuario = require("./AutenticacaoUsuario")

class Login{
    constructor(){
        this.usuario = null
    }

    async login(email_usuario,senha_usuario){
        let autenticacao = new AutenticacaoUsuario(email_usuario,senha_usuario)
        try{
            this.usuario = await autenticacao.autenticar(email_usuario,senha_usuario)
        }catch(erro){
            throw erro
        }
    }

    logout(){
        this.usuario = null
    }
}

module.exports = Login
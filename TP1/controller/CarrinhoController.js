/*
    Módulo que controla o carrinho de compras
*/
class CarrinhoController {

    constructor() {
        this.carrinho = []
        this.precoTotal = 0
    }

    addProdutoCarrinho(nome, preco, quantidade) {
        var item = {
            nome: nome,
            quantidade: quantidade,
            preco: preco
        }
        if (quantidade != 0) {
            this.carrinho.push(item)
            this.precoTotal += preco * quantidade            
        }
    }

    removeProdutoCarrinho(nome) {
        var item = {
            nome: nome
        }
        var pos = 0

        for (let x of this.carrinho) { //Para cada item no carrinho                     
            if (x.nome == item.nome) { //Verifica se o nome dele é igual ao nome do item a ser removido                   
                let removido = this.carrinho.splice(pos, 1)                
                this.precoTotal -= x.preco * x.quantidade
            }
            pos = pos + 1
        }
    }

    esvaziaCarrinho() {
        this.carrinho = []
        this.precoTotal = 0
    }

    getCarrinho(){
        var elementos = [];    
            this.carrinho.forEach((elemento) =>{
                var item = {
                    nome:elemento["nome"],
                    quantidade: elemento['quantidade'],
                    preco:elemento["preco"]                   
                };
                elementos.push(item)
            })
        return elementos
    }

    adicionaPizzaDoisSabores(nome1, nome1, preco1, preco2, quantidade){
        let nome = nome1 + "/" + nome2
        let preco = ((preco1 + preco2) / 2)
        this.addProdutoCarrinho(nome, preco, quantidade)
    }
}

module.exports = CarrinhoController
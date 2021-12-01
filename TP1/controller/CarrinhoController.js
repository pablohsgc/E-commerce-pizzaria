/*
    Módulo que controla o carrinho de compras
*/
class CarrinhoController {

    constructor() {
        this.carrinho = []
        this.precoTotal = 0
    }

    addProdutoCarrinho(nome, preco, quantidade) {
        let item = {
            nome: nome,
            quantidade: quantidade,
            preco: preco
        }       

        let pos = this.contemProduto(nome)

        if (quantidade != 0) {             
            if(pos == -1){ //Se item não está no carrinho, adiciona ele               
                this.carrinho.push(item)
                this.precoTotal += preco * quantidade 

            } else{ // Se já tem o item no carrinho, apenas atualiza a quantidade
                this.carrinho[pos].quantidade = parseFloat(this.carrinho[pos].quantidade) + parseFloat(quantidade)
                this.precoTotal += preco * quantidade
            }
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
        return this.carrinho
    }

    adicionaPizzaDoisSabores(nome1, nome2, preco1, preco2, quantidade){
        let nome = nome1 + "/" + nome2
        let preco = ((preco1 + preco2) / 2)
        this.addProdutoCarrinho(nome, preco, quantidade)
    }

    contemProduto(nome){
        let nomes = nome.split("/")
        let sabor_combinado = false
        let nomes_aux = []

        if(nomes.length > 1){
            sabor_combinado = true    
        }

        for (let x = 0; x < this.carrinho.length; x++) { //Para cada item no carrinho                                           
            if (nome == this.carrinho[x].nome) { //Verifica se ele já está no carrinho 
                return x;                
            }   
            
            nomes_aux = this.carrinho[x].nome.split("/")

            if(sabor_combinado && nomes_aux.length > 1){
                if(nomes_aux[0]+"/"+nomes_aux[1] === nomes[0]+"/"+nomes[1] ||
                   nomes_aux[0]+"/"+nomes_aux[1] === nomes[1]+"/"+nomes[0] )
                   return x;
            }
        }

        return -1;//Posicao para a não existencia de produto
    }
}

module.exports = CarrinhoController
class CarrinhoService{
    
    constructor(){      
        this.carrinho = []
        this.precoTotal = 0        
    }

    addItemCarrinho(nome, preco, quantidade)  {
        var item = {
            nome: nome,
            quantidade: quantidade,
            preco: preco
        }
        this.carrinho.push(item)
        this.precoTotal += preco        
    }
    
    removeItemCarrinho(nome, preco, quantidade){
        var item = {
            nome: nome,
            quantidade: quantidade,
            preco: preco
        }
        var pos = 0
        for (let x of carrinho){                               
            if(x.nome == item.nome){                    
                let removido = carrinho.splice(pos, 1)
                console.log(pos)                    
                this.precoTotal -= preco
            }                  
            pos = pos + 1               
        }      
    }
}
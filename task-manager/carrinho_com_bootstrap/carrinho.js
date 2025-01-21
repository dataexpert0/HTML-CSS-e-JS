var qtd = [0, 0]; 
var valorProduto = [45.00, 39.90]; 
var valorTotal = [0, 0]; 

function adicionarItem(item)
{
    var quantidade = document.getElementById('quantidade' + item); 
    qtd[item] = qtd[item] + 1; 
    quantidade.innerHTML = qtd[item]; 

    var total = document.getElementById("total" + item);
    valorTotal[item] = Number.parseFloat(valorProduto[item] * qtd[item]); 
    total.innerHTML = valorTotal[item].toFixed(2); 
}
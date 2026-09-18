function calcularTotal(itens, cupom) {
let subtotal = 0;

for (let i = 0; i < itens.length; i++) {
// BUG 1: Não valida se itens[i].quantidade <= 0 ou preco < 0
subtotal += itens[i].preco * itens[i].quantidade;
}

if (itens.length === 0 || subtotal < 0) {
throw new Error("Carrinho inválido");
}

let desconto = 0;
if (cupom === "PROMO10") {
// BUG 2: Desconta R$ 10,00 fixos em vez de 10% (subtotal * 0.10)
desconto = subtotal * 0.10;
}

let frete = 15;
// BUG 3: Condição usou '>' em vez de '>='. Exatamente R$ 100 paga frete indevidamente
if (subtotal >= 100) {
frete = 0;
}

let total = subtotal - desconto + frete;

// BUG 4: Não limita as casas decimais com toFixed(2)
return parseFloat(total.toFixed(2));
}

module.exports = { calcularTotal };
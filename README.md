# Módulo de Checkout — Carrinho de Compras

Projeto de testes de software (E-Commerce Node.js) desenvolvido para exercitar a construção de uma **matriz de testes (GOT — Guia de Ordem de Testes)** sobre uma função de checkout com bugs propositais, seguida da correção do código com base nos testes.

## Sobre o projeto

| | |
|---|---|
| **Projeto** | Módulo de Checkout — Carrinho de Compras |
| **Sistema** | E-Commerce Node.js |
| **Responsável** | Pedro de Oliveira |
| **Ambiente** | Node.js / Jest |

A função central do projeto é `calcularTotal(itens, cupom)`, responsável por calcular o valor final de uma compra a partir da lista de itens do carrinho e de um cupom de desconto opcional.

## Estrutura do repositório

```
.
├── carrinho.js                          # Função calcularTotal e regras de negócio
├── carrinho.test.js                     # Suíte de testes (Jest) com os 6 casos do GOT
└── Plano_de_Testes_Software_GOT.docx    # Documento de planejamento e matriz de rastreabilidade de testes
```

## Regras de negócio

1. **Cálculo de subtotal:** multiplica a quantidade pelo preço de cada item.
2. **Validação de entrada:** se o carrinho estiver vazio, ou se algum item resultar em total negativo (quantidade ≤ 0 ou preço < 0), a função lança o erro `"Carrinho inválido"`.
3. **Desconto de cupom:** se o cupom for `"PROMO10"`, aplica 10% de desconto sobre o subtotal.
4. **Frete:**
   - Subtotal **igual ou superior a R$ 100,00** → frete **grátis**.
   - Subtotal **menor que R$ 100,00** → frete de **R$ 15,00**.
5. **Arredondamento:** o valor total final é sempre retornado com exatamente 2 casas decimais.

## Como rodar os testes

```bash
npm install --save-dev jest
npx jest
```

## Casos de teste (Matriz do GOT)

| ID | Cenário | Resultado esperado |
|---|---|---|
| CT-01 | Frete grátis exato na borda (subtotal = R$ 100,00) | Total: 100 |
| CT-02 | Aplicação de cupom PROMO10 | Total: 60 (50 − 5 + 15) |
| CT-03 | Quantidade negativa | Erro: "Carrinho inválido" |
| CT-04 | Arredondamento de centavos | Total: 48.33 |
| CT-05 | Carrinho vazio | Erro: "Carrinho inválido" |
| CT-06 | Frete pago (subtotal < 100) | Total: 95 (80 + 15) |

## Bugs encontrados e correções aplicadas

A primeira rodada de testes (versão `1.0.0-bugged`) apontou falha em 3 dos 6 casos. As correções aplicadas em `carrinho.js` foram:

| Bug | Antes | Depois | Caso corrigido |
|---|---|---|---|
| Validação de quantidade/preço | Nenhuma validação de item negativo | `subtotal < 0` também dispara `"Carrinho inválido"` | CT-03 |
| Cálculo do desconto | Valor fixo de R$ 10,00 | `subtotal * 0.10` (10% real) | CT-02 |
| Condição de frete grátis | `subtotal > 100` | `subtotal >= 100` | CT-01 |
| Arredondamento | Sem limite de casas decimais | `parseFloat(total.toFixed(2))` | CT-04 |

Após as correções, os 6 cenários da matriz passaram a apresentar **Status Final: Passou**, conforme detalhado no `Plano_de_Testes_Software_GOT.docx`.

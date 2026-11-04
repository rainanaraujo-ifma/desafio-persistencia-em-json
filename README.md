# Desafio — Lista de Compras
---

## Objetivo

A Lista de Compras já funciona, mas os itens vivem só na memória: fechou o app, a lista some.

Neste desafio, você vai fazer a lista **sobreviver ao fechamento do app**, gravando os dados em um arquivo JSON no computador do usuário.

Tudo que mexe em arquivo acontece no **processo principal**. A tela só pede, pelo `window.api`.

---

## Ponto de partida

Descompacte o projeto, entre na pasta e rode:

```bash
npm install
npm start
```

O arquivo `resultado.png` mostra como a lista vai ficar. A aparência não muda: o que muda é o comportamento.

Adicione dois itens, marque um como comprado e exclua outro. Tudo deve funcionar. Agora feche o app e abra de novo: a lista voltou vazia. **É isso que você vai resolver.**

### Estrutura atual

```
projeto_inicial_compras/
├── package.json
├── main.js              processo principal (só cria a janela)
├── preload.js           já registrado na janela, com o window.api vazio
├── resultado.png        print de como a lista vai ficar
└── src/
    ├── index.html
    ├── style.css
    └── script.js        a tela, com os dados em memória
```

Cada item da lista tem este formato:

```js
{ nome: 'Arroz', quantidade: 2, comprado: false }
```

---

## O que deve acontecer

- Ao abrir o app, a lista aparece **como estava** da última vez, com quantidades e marcações.
- Na primeira vez que o app abre, quando ainda não existe arquivo, a lista começa **vazia**, sem erro.
- Toda mudança na lista é gravada na hora: adicionar, marcar como comprado e excluir.
- O arquivo se chama `compras.json` e fica na pasta de dados do app, dada por `app.getPath('userData')`.

---

## Passos

1. Crie o arquivo `repositorio.js` **na raiz** do projeto. É nele que fica **todo** o código de ler e gravar arquivo, com `node:fs/promises`.
2. No `repositorio.js`, crie uma função para **carregar** os itens e outra para **salvar** os itens. Exporte as duas com `module.exports`.
3. No `main.js`, crie os handlers dos canais `'compras:carregar'` e `'compras:salvar'`. Eles **não** leem nem gravam arquivo diretamente: só chamam as funções do repositório.
4. No `preload.js`, acrescente ao `window.api` as funções `carregarItens()` e `salvarItens(itens)`.
5. No `script.js`:
   - ao abrir a tela, carregue os itens salvos antes de desenhar a lista;
   - depois de **toda** mudança no array, além de `renderizar()`, grave a lista.

### Observações

- A variável `itens` hoje é `const`. Pense se ela pode continuar assim quando a lista vier do arquivo.
- Para a primeira execução, descubra qual erro o `readFile` lança quando o arquivo não existe e trate **só esse caso**.
- Mudou o `main.js` ou o `repositorio.js`? Feche o app e rode `npm start` de novo. Ctrl+R não basta.

---

## Teste

- Adicione três itens, marque um, feche o app e abra de novo: os três itens voltam, com a marcação.
- Exclua um item, feche e abra: ele não volta.
- Encontre o arquivo `compras.json` no seu computador e abra no VS Code. Dica: um `console.log` com o caminho no `main.js` aparece no terminal.
- Edite a quantidade de um item direto no `compras.json`, salve e reabra o app: a mudança aparece.

---

## Desafios extras

1. **Limpar comprados:** um botão que remove de uma vez todos os itens marcados e grava a lista.
2. **Arquivo estragado:** se o `compras.json` estiver com o texto quebrado (teste apagando um `}` dele), o app deve abrir com a lista vazia e mostrar em vermelho `Não foi possível ler a lista salva.`, em vez de travar.
3. **Último acesso:** guarde no mesmo arquivo a data e a hora da última vez que a lista foi salva e mostre no rodapé, ao lado do total.

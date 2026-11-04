// script.js — a tela da Lista de Compras
// Já funciona com os dados EM MEMÓRIA: adicionar, marcar e excluir.

const itens = [];

const campoNome = document.getElementById('campo-nome');
const campoQuantidade = document.getElementById('campo-quantidade');
const botaoAdicionar = document.getElementById('botao-adicionar');
const lista = document.getElementById('lista');
const status = document.getElementById('status');
const mensagem = document.getElementById('mensagem');

function renderizar() {
  lista.innerHTML = '';

  if (itens.length === 0) {
    const vazio = document.createElement('li');
    vazio.className = 'vazio';
    vazio.textContent = 'A lista está vazia.';
    lista.appendChild(vazio);
  }

  let comprados = 0;
  for (const item of itens) {
    lista.appendChild(criarLinha(item));
    if (item.comprado) {
      comprados++;
    }
  }

  status.textContent = `${itens.length} itens · ${comprados} comprados`;
}

function criarLinha(item) {
  const linha = document.createElement('li');
  linha.className = 'item';

  const check = document.createElement('input');
  check.type = 'checkbox';
  check.checked = item.comprado;
  check.addEventListener('change', () => onMarcar(item, check.checked));

  const nome = document.createElement('span');
  nome.className = 'nome';
  nome.textContent = item.nome;
  if (item.comprado) {
    nome.classList.add('comprado');
  }

  const quantidade = document.createElement('span');
  quantidade.className = 'quantidade';
  quantidade.textContent = `x${item.quantidade}`;

  const excluir = document.createElement('button');
  excluir.textContent = '✕';
  excluir.className = 'botao-excluir';
  excluir.addEventListener('click', () => onExcluir(item));

  linha.append(check, nome, quantidade, excluir);
  return linha;
}

function mostrarMensagem(texto, ehErro) {
  mensagem.textContent = texto;
  mensagem.className = ehErro ? 'mensagem erro' : 'mensagem';
}

function onMarcar(item, marcado) {
  item.comprado = marcado;
  renderizar();
}

function onExcluir(item) {
  itens.splice(itens.indexOf(item), 1);
  renderizar();
}

function onAdicionar() {
  const nome = campoNome.value.trim();
  const quantidade = Number(campoQuantidade.value);

  if (nome === '' || quantidade < 1) {
    mostrarMensagem('Informe o item e uma quantidade maior que zero.', true);
    return;
  }

  itens.push({ nome, quantidade, comprado: false });
  campoNome.value = '';
  campoQuantidade.value = 1;
  mostrarMensagem('', false);
  renderizar();
}

botaoAdicionar.addEventListener('click', onAdicionar);
campoNome.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    onAdicionar();
  }
});

renderizar();

let participantes = [];
let numerosEscolhidos = [];

// Carregar dados salvos, se existirem
if (localStorage.getItem('participantes')) {
  participantes = JSON.parse(localStorage.getItem('participantes'));
}
if (localStorage.getItem('numerosEscolhidos')) {
  numerosEscolhidos = JSON.parse(localStorage.getItem('numerosEscolhidos'));
}

function comprarNumero() {
  let nomeParticipante = document.getElementById('nomeParticipante').value;
  let numeroEscolhido = parseInt(document.getElementById('numeroEscolhido').value);

  if (numerosEscolhidos.includes(numeroEscolhido)) {
    alert('Este número já foi escolhido. Escolha outro.');
    return;
  }

  if (numeroEscolhido < 1 || numeroEscolhido > 200) {
    alert('Escolha um número entre 1 e 200.');
    return;
  }

  if (nomeParticipante.trim() === '') {
    alert('Digite seu nome.');
    return;
  }

  numerosEscolhidos.push(numeroEscolhido);
  participantes.push({ nome: nomeParticipante, numero: numeroEscolhido, valor: 50 });

  atualizarListaParticipantes();
  limparCampos();
  salvarDados();
}

function limparCampos() {
  document.getElementById('nomeParticipante').value = '';
  document.getElementById('numeroEscolhido').value = '';
}

function atualizarListaParticipantes() {
  let participantesElement = document.getElementById('participantes');
  participantesElement.innerHTML = '';

  let numerosEscolhidosSet = new Set(numerosEscolhidos);

  for (let i = 1; i <= 200; i++) {
    let span = document.createElement('span');
    span.textContent = i;
    span.className = 'numero';

    if (numerosEscolhidosSet.has(i)) {
      span.classList.add('selecionado');
    }

    participantesElement.appendChild(span);
  }

  participantes.forEach(participante => {
    let li = document.createElement('li');
    li.textContent = `${participante.nome} - Número ${participante.numero} - R$ ${participante.valor.toFixed(2)}`;
    participantesElement.appendChild(li);
  });
}

function realizarSorteio() {
  let primeiroLugarIndex = Math.floor(Math.random() * participantes.length);
  let segundoLugarIndex = Math.floor(Math.random() * participantes.length);
  let terceiroLugarIndex = Math.floor(Math.random() * participantes.length);

  let numeros = document.getElementsByClassName('numero');
  numeros[participantes[primeiroLugarIndex].numero - 1].classList.add('vencedor');
  numeros[participantes[segundoLugarIndex].numero - 1].classList.add('vencedor');
  numeros[participantes[terceiroLugarIndex].numero - 1].classList.add('vencedor');

  document.getElementById('primeiroLugar').textContent = `${participantes[primeiroLugarIndex].nome} - Número ${participantes[primeiroLugarIndex].numero} - R$ 300`;
  document.getElementById('segundoLugar').textContent = `${participantes[segundoLugarIndex].nome} - Número ${participantes[segundoLugarIndex].numero} - R$ 100`;
  document.getElementById('terceiroLugar').textContent = `${participantes[terceiroLugarIndex].nome} - Número ${participantes[terceiroLugarIndex].numero} - R$ 50`;

  // Exibe o nome do ganhador
  let vencedorElement = document.createElement('span');
  vencedorElement.textContent = `O ganhador é: ${participantes[primeiroLugarIndex].nome}`;
  document.getElementById('ganhador').appendChild(vencedorElement);

  salvarDados();
}

function salvarDados() {
  localStorage.setItem('participantes', JSON.stringify(participantes));
  localStorage.setItem('numerosEscolhidos', JSON.stringify(numerosEscolhidos));
}

atualizarListaParticipantes();

atualizarListaParticipantes()
var nomeJogador;
var escolhaJogador;
var escolhaComputador;
var pontosJogador = 0;
var pontosComputador = 0;

do {
    nomeJogador = prompt('Qual é o seu nome?');
} while (!nomeJogador);

definirNomeJogador(nomeJogador);
atualizarMensagem(`Bem vindo ${nomeJogador}, está preparado? Escolha uma opção acima...`);
document.getElementById('jogador-pontos').innerHTML = pontosJogador;
document.getElementById('computador-pontos').innerHTML = pontosJogador;

function atualizarMensagem(mensagem) {
    document.getElementById('mensagem').innerHTML = mensagem;
}

function definirNomeJogador(novoNome) {
    document.getElementById('jogador-nome').innerHTML = novoNome;
}

function somarPontosJogador() {
    pontosJogador++;
    document.getElementById('jogador-pontos').innerHTML = pontosJogador;
}

function somarPontosComputador() {
    pontosComputador++;
    document.getElementById('computador-pontos').innerHTML = pontosComputador;
}

function mostrarEscolha(quem, escolha){
    document.getElementById(quem + '-escolha-' + escolha).classList.add('selecionado');
}

function ocultarEscolha(quem, escolha){
    document.getElementById(quem + '-escolha-' + escolha).classList.remove('selecionado');
}

document.getElementById('jogador-escolha-1').onclick = function () { jogar(1) };
document.getElementById('jogador-escolha-2').onclick = function () { jogar(2) };
document.getElementById('jogador-escolha-3').onclick = function () { jogar(3) };

function jogar(escolha) {
    // 1 = pedra
    // 2 = papel
    // 3 = tesoura
    escolhaJogador = escolha;
    mostrarEscolha('jogador', escolhaJogador);

    escolhaComputador = sortear(1, 3);
    mostrarEscolha('computador', escolhaComputador);

    var ganhador = calcularEscolha(escolhaJogador, escolhaComputador);
    if (ganhador === 0) {
        atualizarMensagem("Empatou!");
    } else if (ganhador === 1) {
        atualizarMensagem(`Ponto para ${nomeJogador}.`);
        somarPontosJogador();
    } else {
        atualizarMensagem("Ponto para Computador.");
        somarPontosComputador();
    }

    setTimeout(function(){ 
        ocultarEscolha('jogador', escolhaJogador);
        ocultarEscolha('computador', escolhaComputador);
        atualizarMensagem(`${nomeJogador} escolha uma opção...`)
    }, 2000);
}

function sortear(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calcularEscolha(escolhaJogador, escolhaComputador) {
    // 0 = empate
    // 1 = jogador
    // 2 = computador
    if (escolhaJogador === escolhaComputador) {
        return 0;
    }
    if (escolhaJogador === 1) { // Jogador joga Pedra
        if (escolhaComputador === 2) { // Computador joga Papel
            return 2; // Pedra perde para Papel (Computador vence)
        }
        else { // Computador joga Tesoura
            return 1; // Pedra vence de Tesoura (Jogador vence)
        }
    }
    else if (escolhaJogador === 2) { // Jogador joga Papel
        if (escolhaComputador === 3) { // Computador joga Tesoura
            return 2; // Papel perde para Tesoura (Computador vence)
        }
        else { // Computador joga Pedra
            return 1; // Papel vence de Pedra (Jogador vence)
        }
    }
    else { // Jogador joga Tesoura
        if (escolhaComputador === 1) { // Computador joga Pedra
            return 2; // Tesoura perde para Pedra (Computador vence)
        }
        else { // Computador joga Papel
            return 1; // Tesoura vence de Papel (Jogador vence)
        }
    }
}
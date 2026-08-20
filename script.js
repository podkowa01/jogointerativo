const tabuleiro = document.getElementById("tabuleiro");

const faseTexto = document.getElementById("fase");
const movimentosTexto = document.getElementById("movimentos");
const paresTexto = document.getElementById("pares");

const mensagem = document.getElementById("mensagem");

const botaoReiniciar = document.getElementById("reiniciar");


/* =========================
   CONFIGURAÇÃO DAS FASES
========================= */

const fases = [
    {
        numero: 1,
        pares: 4
    },

    {
        numero: 2,
        pares: 6
    },

    {
        numero: 3,
        pares: 8
    },

    {
        numero: 4,
        pares: 10
    },

    {
        numero: 5,
        pares: 12
    }
];


/* =========================
   EMOJIS
========================= */

const emojis = [
    "🍎",
    "🚀",
    "🐶",
    "⚽",
    "🎮",
    "🍕",
    "🌟",
    "🐱",
    "🦁",
    "🐼",
    "🍔",
    "🎸"
];


/* =========================
   VARIÁVEIS
========================= */

let faseAtual = 0;

let primeiraCarta = null;
let segundaCarta = null;

let bloqueado = false;

let movimentos = 0;

let paresEncontrados = 0;


/* =========================
   EMBARALHAR
========================= */

function embaralhar(array) {

    return array.sort(() => Math.random() - 0.5);

}


/* =========================
   CRIAR JOGO
========================= */

function criarJogo() {

    tabuleiro.innerHTML = "";

    mensagem.textContent = "";

    primeiraCarta = null;
    segundaCarta = null;

    bloqueado = false;

    movimentos = 0;

    paresEncontrados = 0;

    const quantidadePares = fases[faseAtual].pares;

    faseTexto.textContent = fases[faseAtual].numero;

    movimentosTexto.textContent = movimentos;

    paresTexto.textContent =
        `0 / ${quantidadePares}`;


    /*
        Cria os pares necessários
    */

    let cartas = [];

    for (let i = 0; i < quantidadePares; i++) {

        cartas.push(emojis[i]);
        cartas.push(emojis[i]);

    }


    cartas = embaralhar(cartas);


    /*
        Cria as cartas na tela
    */

    cartas.forEach((emoji) => {

        const carta = document.createElement("div");

        carta.classList.add("carta");


        carta.innerHTML = `
            <div class="frente">${emoji}</div>

            <div class="verso">?</div>
        `;


        carta.addEventListener(
            "click",
            virarCarta
        );


        tabuleiro.appendChild(carta);

    });

}


/* =========================
   VIRAR CARTA
========================= */

function virarCarta() {

    if (bloqueado) return;

    if (this === primeiraCarta) return;

    if (this.classList.contains("encontrada")) {
        return;
    }


    this.classList.add("virada");


    if (!primeiraCarta) {

        primeiraCarta = this;

        return;
    }


    segundaCarta = this;

    movimentos++;

    movimentosTexto.textContent = movimentos;


    verificarPar();

}


/* =========================
   VERIFICAR PAR
========================= */

function verificarPar() {

    const emoji1 =
        primeiraCarta
            .querySelector(".frente")
            .textContent;

    const emoji2 =
        segundaCarta
            .querySelector(".frente")
            .textContent;


    if (emoji1 === emoji2) {

        encontrouPar();

    } else {

        cartasDiferentes();

    }

}


/* =========================
   PAR ENCONTRADO
========================= */

function encontrouPar() {

    primeiraCarta.classList.add(
        "encontrada"
    );

    segundaCarta.classList.add(
        "encontrada"
    );


    paresEncontrados++;


    const quantidadePares =
        fases[faseAtual].pares;


    paresTexto.textContent =
        `${paresEncontrados} / ${quantidadePares}`;


    resetarCartas();


    /*
        Verifica se terminou a fase
    */

    if (
        paresEncontrados ===
        quantidadePares
    ) {

        terminarFase();

    }

}


/* =========================
   CARTAS DIFERENTES
========================= */

function cartasDiferentes() {

    bloqueado = true;


    setTimeout(() => {

        primeiraCarta.classList.remove(
            "virada"
        );

        segundaCarta.classList.remove(
            "virada"
        );


        resetarCartas();

    }, 1000);

}


/* =========================
   RESETAR CARTAS
========================= */

function resetarCartas() {

    primeiraCarta = null;

    segundaCarta = null;

    bloqueado = false;

}


/* =========================
   TERMINAR FASE
========================= */

function terminarFase() {

    /*
        Se for a última fase
    */

    if (faseAtual === fases.length - 1) {

        mensagem.textContent =
            `🏆 PARABÉNS! Você terminou todas as 5 fases em ${movimentos} movimentos!`;

        return;
    }


    mensagem.textContent =
        `🎉 Fase ${faseAtual + 1} concluída!`;


    bloqueado = true;


    /*
        Passa para a próxima fase
    */

    setTimeout(() => {

        faseAtual++;

        criarJogo();

    }, 2000);

}


/* =========================
   REINICIAR
========================= */

botaoReiniciar.addEventListener(
    "click",
    () => {

        faseAtual = 0;

        criarJogo();

    }
);


/* =========================
   COMEÇAR
========================= */

criarJogo();
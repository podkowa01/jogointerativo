const tabuleiro = document.getElementById("tabuleiro");
const movimentosTexto = document.getElementById("movimentos");
const mensagem = document.getElementById("mensagem");
const botaoReiniciar = document.getElementById("reiniciar");

const emojis = [
    "🍎", "🍎",
    "🚀", "🚀",
    "🐶", "🐶",
    "⚽", "⚽",
    "🎮", "🎮",
    "🍕", "🍕",
    "🌟", "🌟",
    "🐱", "🐱"
];

let primeiraCarta = null;
let segundaCarta = null;
let bloqueado = false;
let movimentos = 0;
let paresEncontrados = 0;

// Embaralha as cartas
function embaralhar(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Cria o tabuleiro
function criarJogo() {
    tabuleiro.innerHTML = "";
    mensagem.textContent = "";

    primeiraCarta = null;
    segundaCarta = null;
    bloqueado = false;
    movimentos = 0;
    paresEncontrados = 0;

    movimentosTexto.textContent = movimentos;

    const cartasEmbaralhadas = embaralhar([...emojis]);

    cartasEmbaralhadas.forEach((emoji) => {
        const carta = document.createElement("div");
        carta.classList.add("carta");

        carta.innerHTML = `
            <div class="frente">${emoji}</div>
            <div class="verso">?</div>
        `;

        carta.addEventListener("click", virarCarta);

        tabuleiro.appendChild(carta);
    });
}

// Vira uma carta
function virarCarta() {
    if (bloqueado) return;
    if (this === primeiraCarta) return;
    if (this.classList.contains("encontrada")) return;

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

// Verifica se as duas cartas são iguais
function verificarPar() {
    const emoji1 = primeiraCarta.querySelector(".frente").textContent;
    const emoji2 = segundaCarta.querySelector(".frente").textContent;

    if (emoji1 === emoji2) {
        encontrouPar();
    } else {
        cartasDiferentes();
    }
}

// Quando encontra um par
function encontrouPar() {
    primeiraCarta.classList.add("encontrada");
    segundaCarta.classList.add("encontrada");

    paresEncontrados++;

    resetarCartas();

    if (paresEncontrados === emojis.length / 2) {
        mensagem.textContent =
            `🎉 Parabéns! Você venceu em ${movimentos} movimentos!`;
    }
}

// Quando as cartas são diferentes
function cartasDiferentes() {
    bloqueado = true;

    setTimeout(() => {
        primeiraCarta.classList.remove("virada");
        segundaCarta.classList.remove("virada");

        resetarCartas();
    }, 1000);
}

// Reseta as cartas selecionadas
function resetarCartas() {
    primeiraCarta = null;
    segundaCarta = null;
    bloqueado = false;
}

// Botão de reiniciar
botaoReiniciar.addEventListener("click", criarJogo);

// Inicia o jogo
criarJogo();
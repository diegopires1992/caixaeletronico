let saldoValue = document.getElementById("saldoValue");
let saldo = 122.50;
let notas = [
    { valor: 100, quantidade: 1 },
    { valor: 50, quantidade: 3 },
    { valor: 20, quantidade: 4 },
    { valor: 10, quantidade: 1 },
    { valor: 5, quantidade: 3 },
    { valor: 2, quantidade: 12 },
    { valor: 1, quantidade: 10 },
];

function retiradaNotas(valor) {
    saldo = saldo - valor;

    let notasRetiradas = [];

    for (let i = 0; i < notas.length; i++) {
        if (valor >= notas[i].valor && notas[i].quantidade > 0) {
            valor = valor - notas[i].valor;
            notas[i].quantidade = notas[i].quantidade - 1;
            notasRetiradas = [...notasRetiradas, { nota: notas[i].valor }];
            i--
        }

    }

    return notasRetiradas
}

setInterval(() => {
    saldoValue.innerHTML = saldo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}, 10)


let retiradaButton = document.getElementById("retirada");

function valorRetirada() {
    let retiradaValue = document.getElementById("retiradaValue").value;
    let saldoRetirada = parseFloat(retiradaValue);

    for (let image of document.getElementsByTagName("img")) {
        image.style.display = 'none';
    }
    if (saldoRetirada > saldo || saldoRetirada < 0) {
        document.getElementById("notasRetiradas").innerHTML = "Saldo insuficiente";
        return
    }
    if (!Number.isInteger(saldoRetirada)) {
        document.getElementById("notasRetiradas").innerHTML = "Não aceitamos centavos";
        return
    }
    if (!saldoRetirada) {
        document.getElementById("notasRetiradas").innerHTML = "Insira um valor";
        return
    }

    let displayNotas = retiradaNotas(saldoRetirada);

    for (let i = 0; i < displayNotas.length; i++) {
        document.getElementById("notasRetiradas").innerHTML = "";
        const image = document.createElement('img');
        image.src = `./image/nota${displayNotas[i].nota}.png`;
        document.getElementById("containerNotas").appendChild(image);
    }

    document.getElementById("retiradaValue").value = 0;

}

retiradaButton.addEventListener("click", valorRetirada);
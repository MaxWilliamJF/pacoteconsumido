fetch('data.json')
  .then(response => response.json())
  .then(data => letsDoIt(data));


// Função 'principal' do app
function letsDoIt (dados) {
    console.log('Dados: ', dados);

    const qtdMedicoes = quantidadeMedicoes(dados.medicao);
    const consumido = totalConsumido(dados.medicao, qtdMedicoes);
    const osDadosProGrafico = dadosProGrafico(dados.medicao);

    exibirTotalConsumido(consumido);
    exibirTamanhoPacote(dados.pacote);

    new Chartist.Line(
        '.ct-chart',
        osDadosProGrafico,
        {
            low: 0,
            high: 500,
            width: '90%'
        });
}

function quantidadeMedicoes (medicoes) {
    return medicoes.length;
}

// Retorna a quantidade de dados consumida até o momento da última medição
function totalConsumido (medicoes, qtdMedicoes) {
    // Deve verificar se é array

    let consumido = 0;
    consumido = medicoes[qtdMedicoes - 1].consumido;

    return consumido;
}

function exibirTotalConsumido (totalConsumido) {
    const elmTotalConsumido = document.getElementById('consumidoEsteCiclo');
    if (!elmTotalConsumido) {
        console.error('Elemento "total consumido" não encontrado');
        return false;
    }

    elmTotalConsumido.innerHTML = totalConsumido;
}

function exibirTamanhoPacote (pacote) {
    const elmTamanhoPacote = document.getElementById('tamanhoPacote');
    if (!elmTamanhoPacote) {
        console.error('Elemento "tamanho pacotes" não encontrado');
        return false;
    }

    elmTamanhoPacote.innerHTML = pacote;
}

function dadosProGrafico (medicoes) {
    const dadosConsumidos = medicoes.map(medicao => medicao.consumido);
    const diasUteis = 26;

    // Tornar datas dinâmicas (Definir intervalo. Definir período [Mês atual? pacote? Datas medias + X?])
    const datas = ['2020-06-19', '2020-06-29', '2020-07-02', '2020-07-06', '2020-07-09', '2020-07-14', '2020-07-19'].map(
        data => {
            return new Date(data).toLocaleDateString('pt-BR');
        }
    );

    return {
        labels: datas,
        series: [
            dadosConsumidos,
            [0, (17/1) * diasUteis, (26/2) * diasUteis, (40/6) * diasUteis, (62/10) * diasUteis, (74/14) * diasUteis]
        ]
    }
}

// "Dark mode"
const csslinkelm = document.getElementById('maincsslink');
const darkMode = document.getElementById('darkMode');

darkMode.addEventListener('click', (item) => {
    console.log('Darkmode:', item.target);
    console.log('Darkmode.target.dataset', item.target.dataset);

    changeDarkMode(item.target, csslinkelm, item.target.dataset.dm)
});

function changeDarkMode (darkMode, csslinkelm, mode) {
    console.log(darkMode.dataset);
    if (mode === 'off') {
        darkMode.dataset.dm = 'on';
        darkMode.src = './images/on.png';
        csslinkelm.href = 'style-dark.css';
    }
    
    if (mode === 'on') {
        darkMode.dataset.dm = 'off';
        darkMode.src = './images/off.png';
        csslinkelm.href = 'style.css';
    }
}
// Fim "dark mode"

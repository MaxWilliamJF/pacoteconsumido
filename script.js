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
    dadosConsumidos = medicoes.map(medicao => medicao.consumido);

    // Tornar datas dinâmicas (Definir intervalo. Definir período [Mês atual? pacote? Datas medias + X?])
    const datas = ['2020-06-19', '2020-06-29', '2020-07-02', '2020-07-06', '2020-07-13', '2020-07-19'].map(
        data => {
            return new Date(data).toLocaleDateString('pt-BR');
        }
    );

    return {
        labels: datas,
        series: [
            dadosConsumidos,
            [0, (17/1) * 26, (26/2) * 26]
        ]
    }
}

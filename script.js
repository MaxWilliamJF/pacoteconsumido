fetch('data.json')
  .then(response => response.json())
  .then(data => letsDoIt(data));


// Função 'principal' do app
function letsDoIt (dados) {
    console.log('Dados: ', dados);

    const qtdMedicoes = quantidadeMedicoes(dados.medicao);
    const consumido = totalConsumido(dados.medicao, qtdMedicoes);
    console.log('Total consumido: ', consumido);

    exibirTotalConsumido(consumido);
    exibirTamanhoPacote(dados.pacote);
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

var dadosProGrafico = {
    // A labels array that can contain any sort of values
    labels: ['2020-06-29', '2020-07-02', '2020-07-06', '2020-07-13', '2020-07-19'],
    // Our series array that contains series objects or in this case series data arrays
    series: [
        [17, 26],
        [(17/1) * 26, (26/2) * 26]
    ]
};
  
// Create a new line chart object where as first parameter we pass in a selector
// that is resolving to our chart container element. The Second parameter
// is the actual data object.
new Chartist.Line(
    '.ct-chart',
    dadosProGrafico,
    {
        low: 0,
        high: 500,
        width: '90%'
    });

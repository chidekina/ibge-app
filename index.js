const regioes = document.getElementById('regiao__selecao');
const estados = document.getElementById('estados__selecao');
const cidades = document.getElementById('cidades__selecao');

fetch('https://servicodados.ibge.gov.br/api/v1/localidades/regioes/')
    .then(response => response.json())
    .then(response => {
        response.forEach(regiao => {
            regioes.innerHTML += `<option value="${regiao.id}">${regiao.nome}</option>`
        });
    });

regioes.addEventListener('change', () => {
    estados.disabled = false;
    estados.innerHTML = '<option value="" selected>Selecione um estado</option>';
    cidades.innerHTML = '<option value="" selected>Selecione uma cidade</option>';
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/regioes/${regioes.value}/estados`)
        .then(response => response.json())
        .then(response => {
            response.forEach(estado => {
                estados.innerHTML += `<option value="${estado.id}">${estado.nome}</option>`
            });
        });
});

estados.addEventListener('change', () => {
    cidades.disabled = false;
    cidades.innerHTML = '<option value="" selected>Selecione uma cidade</option>';

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estados.value}/municipios`)
        .then(response => response.json())
        .then(response => {
            response.forEach(cidade => {
                cidades.innerHTML += `<option value="${cidade.id}">${cidade.nome}</option>`
            });
        });
});
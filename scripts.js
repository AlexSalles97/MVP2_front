// Função para obter a lista existente do servidor da API externa através da requisição GET
async function fetchAPIByTitle(title) {
  try {
    const url = `https://servicodados.ibge.gov.br/api/v1/paises/{paises}`;
    const response = await fetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Erro na solicitação: ${response.status}`);
    }

    const data = await response.json();
    const foundItem = data.find(item => item.nome.abreviado.toLowerCase() === title.toLowerCase());
    return foundItem || null;
  }

  catch (error) {
    console.error('Erro ao buscar dados da API:', error);
    return null;
  }
}

// Função para preencher campos com base nos dados da API
function fillFieldsWithData(item) {
  if (item) {
    document.getElementById('newID').value = item.id.M49;
    document.getElementById('newContinent').value = item.localizacao.regiao.nome;
    document.getElementById('newLanguage').value = item.linguas[0].nome;
    document.getElementById('newCapital').value = item.governo.capital.nome;
    document.getElementById('newCoin').value = item['unidades-monetarias'][0].nome;
  } else {
    document.getElementById('newID').value = '';
    document.getElementById('newContinent').value = '';
    document.getElementById('newLanguage').value = '';
    document.getElementById('newCapital').value = '';
    document.getElementById('newCoin').value = '';
  }
}

// Adicione um evento de escuta ao campo de nome do país para "input"
const searchInput = document.getElementById('newCountry');
searchInput.addEventListener('input', async function() {
  const searchText = this.value.trim();
  const foundItem = await fetchAPIByTitle(searchText);
  fillFieldsWithData(foundItem);
});

// Função para obter a lista existente do servidor através da requisição GET
const getList = async () => {
  let url = 'http://127.0.0.1:5000/nacoes';
  fetch(url, {
    method: 'get',
  })
  .then((response) => response.json())
  .then((data) => {
    clearTable();
    data.nacoes.forEach(item => insertList(item.id, item.pais, item.continente, item.lingua, item.capital, item.moeda))
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

// Função para limpar a tabela
function clearTable() {
  const table = document.getElementById('myTable');
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
}

// Função para obter a lista existente do servidor via requisição GET
const getListId = async (nacao) => {
  let url = 'http://127.0.0.1:5000/nacao?id=' + nacao; 
  const dados = await fetch (url, {
    method: 'get',
  });
  const nacaodados = await dados.json();
  console.log(nacaodados)
  preencheModal(nacaodados)
}

// Função para preencher o modal de edição
const preencheModal = (dataNacao) => {    
  document.getElementById("idmodal").value = (dataNacao.id);
  document.getElementById("paismodal").value = (dataNacao.pais);
  document.getElementById("continentemodal").value = (dataNacao.continente);
  document.getElementById("linguamodal").value = (dataNacao.lingua);
  document.getElementById("capitalmodal").value = (dataNacao.capital);
  document.getElementById("moedamodal").value = (dataNacao.moeda);
}

// Chamada da função para carregamento inicial dos dados
getList()

// Função para colocar um país na lista do servidor através da requisição POST
const postItem = async (id, pais, continente, lingua, capital, moeda) => {
  const formData = new FormData();
  formData.append('id', id);
  formData.append('pais', pais);
  formData.append('continente', continente);
  formData.append('lingua', lingua);
  formData.append('capital', capital);
  formData.append('moeda', moeda);

  let url = 'http://127.0.0.1:5000/nacao';
  fetch(url, {
    method: 'post',
    body: formData,
  })
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error:', error);
  });
}

// Função para adicionar uma novo país com suas respectivas informações
const novoPais = () => {
  let id = document.getElementById("newID").value;
  let pais = document.getElementById("newCountry").value;
  let continente = document.getElementById("newContinent").value;
  let lingua = document.getElementById("newLanguage").value;
  let capital = document.getElementById("newCapital").value;
  let moeda = document.getElementById("newCoin").value;

  if (pais === '') {
    alert("Escreva o nome de um país!");
  } else if (id === '') {
    alert("País não localizado!");
  } else if (paisJaExisteNaLista(pais)) {
    alert("Este país já está na lista!");
  } else {
    postItem(id, pais, continente, lingua, capital, moeda)
    alert("País adicionado!")
    getList()
  }
}

// Função para inserir países na lista apresentada
const insertList = (idCountry, nameCountry, continent, language, capital, coin, dataNacao) => {
  console.log(dataNacao)
  var item = [idCountry, nameCountry, continent, language, capital, coin]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }

  insertButton(row.insertCell(-1))
  document.getElementById('newID').value = '';
  document.getElementById('newCountry').value = '';
  document.getElementById('newContinent').value = '';
  document.getElementById('newLanguage').value = '';
  document.getElementById('newCapital').value = '';
  document.getElementById('newCoin').value = '';
  removeElement()
  chamaNacaoModal()
}

// Função para verificar se o país já existe na lista
function paisJaExisteNaLista(pais) {
  const table = document.getElementById('myTable');
  const rows = table.getElementsByTagName('tr');

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const countryCell = row.cells[1];

    if (countryCell.textContent === pais) {
      return true;
    }
  }
  return false;
}

// Função para atualizar as informações de um país da lista do servidor através da requisição PUT
const putItem = async (id, pais, continente, lingua, capital, moeda) => {
  const formData = new FormData();
  formData.append('id', id);
  formData.append('pais', pais);
  formData.append('continente', continente);
  formData.append('lingua', lingua);
  formData.append('capital', capital);
  formData.append('moeda', moeda);

  let url = 'http://127.0.0.1:5000/nacao?id=' + id;
  fetch(url, {
    method: 'put',
    body: formData,
  })
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error:', error);
  });
}

// Função para editar um país
const editElement = () => {
  let id = document.getElementById("idmodal").value;
  let pais = document.getElementById("paismodal").value;
  let continente = document.getElementById("continentemodal").value;
  let lingua = document.getElementById("linguamodal").value;
  let capital = document.getElementById("capitalmodal").value;
  let moeda = document.getElementById("moedamodal").value;

  if (pais === '') {
    alert("Escreva um nome!");
  } else {
    putItem(id, pais, continente, lingua, capital, moeda)
    alert("Atualização realizada com sucesso!")
    location.reload()
  }
}

// Função para chamar o país selecionado para carregar no modal
const chamaNacaoModal = () => {
  let editar = document.getElementsByClassName("btn btn-info btn-sm font-weight-bold");

  for (i = 0; i < editar.length; i++) {
    editar[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nacao = div.getElementsByTagName('td')[0].innerHTML        
      getListId(nacao)
    }
  }
}

// Função para deletar um país da lista do servidor através da requisição DELETE
const deleteItem = (nacao) => {
  console.log(nacao)

  let url = 'http://127.0.0.1:5000/nacao?id=' + nacao;
  fetch(url, {
    method: 'delete'
  })
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error:', error);
  });
}

// Função para remover um país da lista de acordo com o click no botão excluir
const removeElement = () => {
  let excluir = document.getElementsByClassName("btn btn-danger btn-sm font-weight-bold");

  for (i = 0; i < excluir.length; i++) {
    excluir[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nacao = div.getElementsByTagName('td')[0].innerHTML
      console.log(nacao)

      if (confirm("Deseja excluir o país?")) {
        div.remove()
        deleteItem(nacao)
        alert("País excluido!")
      }
    }
  }
}

// Função para criar um botão de atualizar e excluir para cada país da lista
const insertButton = (parent) => {
  let btnUpdate = document.createElement("a");
  let txtUpdate = document.createTextNode("Alterar");
  btnUpdate.className = "btn btn-info btn-sm font-weight-bold";
  btnUpdate.setAttribute("data-toggle", "modal")
  btnUpdate.setAttribute("data-target", "#modalEditar")
  btnUpdate.setAttribute("id", "editar")
  btnUpdate.appendChild(txtUpdate);
  parent.appendChild(btnUpdate);

  let span = document.createElement("span");
  span.className = "p-1";
  parent.appendChild(span);
    
  let btnDel = document.createElement("a");
  let txtDel = document.createTextNode("Excluir");
  btnDel.className = "btn btn-danger btn-sm font-weight-bold";
  btnDel.setAttribute("onclick", "removeElement()")
  btnDel.appendChild(txtDel);
  parent.appendChild(btnDel);
}

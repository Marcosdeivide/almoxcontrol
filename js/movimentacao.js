// ELEMENTOS

const btnNova = document.getElementById("btnNovaMovimentacao");

const modal = document.getElementById("modalMovimentacao");

const fechar = document.getElementById("fecharModalMovimentacao");

const form = document.getElementById("formMovimentacao");

const lista = document.getElementById("listaMovimentacoes");

const total = document.getElementById("totalMovimentacoes");

const selectColaborador = document.getElementById("colaboradorMovimentacao");

const selectFerramenta = document.getElementById("ferramentaMovimentacao");

// INPUTS



const tipo = document.getElementById("tipoMovimentacao");

const devolucao = document.getElementById("dataDevolucao");

const observacao = document.getElementById("observacaoMovimentacao");

// PEGAR DADOS

let ferramentas = JSON.parse(localStorage.getItem("ferramentas")) || [];

let movimentacoes = JSON.parse(localStorage.getItem("movimentacoes")) || [];

let colaboradores = JSON.parse(localStorage.getItem("colaboradores")) || [];

// FECHAR MODAL

fechar.addEventListener("click", () => {
  modal.style.display = "none";
});

// CARREGAR FERRAMENTAS NO SELECT

function carregarFerramentas() {
  selectFerramenta.innerHTML = "";

  ferramentas.forEach((item) => {
    if (item.status === "Em uso") return;

    selectFerramenta.innerHTML += `
        <option value="${item.nome}">
            ${item.nome}
        </option>
    `;
  });
}

function carregarColaboradores() {
  selectColaborador.innerHTML = "";

  colaboradores.forEach((item) => {
    selectColaborador.innerHTML += `
            <option value="${item.nome}">
                ${item.nome}
            </option>
        `;
  });
}

btnNova.addEventListener("click", () => {

  carregarFerramentas();

  carregarColaboradores();

  modal.style.display = "flex";

});

// SALVAR MOVIMENTAÇÃO



form.addEventListener("submit", (e) => {

  e.preventDefault();


  // Procura a ferramenta escolhida

  const ferramenta = ferramentas.find(
    (f) => f.nome === selectFerramenta.value
  );



  // Procura o colaborador escolhido

  const colaboradorSelecionado = colaboradores.find(
    (c) => c.nome === selectColaborador.value
  );



  // Verifica se encontrou

  if (!ferramenta || !colaboradorSelecionado) {

    alert("Selecione uma ferramenta e um colaborador.");

    return;

  }



  // Verifica se a ferramenta já está em uso

  if (
    tipo.value === "emprestimo" &&
    ferramenta.status === "Em uso"
  ) {

    alert("Esta ferramenta já está emprestada.");

    return;

  }



  // Criando movimentação

  let novaMovimentacao = {


    ferramenta: ferramenta.nome,


    colaborador: colaboradorSelecionado.nome,


    tipo: tipo.value,


    devolucao: devolucao.value,


    observacao: observacao.value,


    data: new Date().toLocaleString()


  };




  // Atualiza ferramenta

  if (tipo.value === "emprestimo") {


    ferramenta.status = "Em uso";


    ferramenta.colaborador = colaboradorSelecionado.nome;


    colaboradorSelecionado.ferramentas =
      (colaboradorSelecionado.ferramentas || 0) + 1;


  }




  // Salvar dados

  movimentacoes.push(novaMovimentacao);



  localStorage.setItem(
    "ferramentas",
    JSON.stringify(ferramentas)
  );



  localStorage.setItem(
    "colaboradores",
    JSON.stringify(colaboradores)
  );



  localStorage.setItem(
    "movimentacoes",
    JSON.stringify(movimentacoes)
  );



  mostrarMovimentacoes();



  form.reset();



  modal.style.display = "none";


});

// MOSTRAR NA TABELA

function mostrarMovimentacoes() {
  lista.innerHTML = "";

  movimentacoes.forEach((item, index) => {
    lista.innerHTML += `


        <tr>


        <td>
        ${item.data}
        </td>


        <td>
        ${item.ferramenta}
        </td>


        <td>
        ${item.colaborador}
        </td>


        <td>

        <span class="tipo ${item.tipo}">

        ${item.tipo}

        </span>

        </td>



        <td>

        ${item.devolucao || "-"}

        </td>



        <td>

        <span class="status ${item.tipo === "emprestimo" ? "uso" : "disponivel"}">

${item.tipo === "emprestimo" ? "Em uso" : "Devolvida"}

</span>

        </td>



        <td class="acoes">


<button 
title="Devolver"
onclick="devolverFerramenta(${index})">

<i class="fa-solid fa-arrow-rotate-left"></i>

</button>


<button 
title="Excluir"
onclick="excluirMovimentacao(${index})">

<i class="fa-solid fa-trash"></i>

</button>


</td>


        </tr>


        `;
  });

  total.innerHTML = movimentacoes.length;
}

// EXCLUIR

function excluirMovimentacao(index) {
  movimentacoes.splice(index, 1);

  localStorage.setItem("movimentacoes", JSON.stringify(movimentacoes));

  mostrarMovimentacoes();
}

// DEVOLVER FERRAMENTA

function devolverFerramenta(index) {
  const mov = movimentacoes[index];

  const ferramenta = ferramentas.find((f) => f.nome === mov.ferramenta);

  const colaborador = colaboradores.find((c) => c.nome === mov.colaborador);

  if (ferramenta) {
    ferramenta.status = "Disponível";

    ferramenta.colaborador = "";
  }

  if (colaborador) {
    colaborador.ferramentas = Math.max(
  0,
  (colaborador.ferramentas || 0) - 1
);
  }

  mov.tipo = "devolucao";

  localStorage.setItem("ferramentas", JSON.stringify(ferramentas));

  localStorage.setItem("colaboradores", JSON.stringify(colaboradores));

  localStorage.setItem("movimentacoes", JSON.stringify(movimentacoes));

  mostrarMovimentacoes();
}
// INICIAR

// INICIAR

carregarFerramentas();

carregarColaboradores();

mostrarMovimentacoes();
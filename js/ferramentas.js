/* ========================================
   ELEMENTOS
======================================== */

const btnAdicionar = document.getElementById("btnAdicionarFerramenta");
const modal = document.getElementById("modalFerramenta");
const fecharModal = document.getElementById("fecharModal");

const form = document.getElementById("formFerramenta");
const lista = document.getElementById("listaFerramentas");

const total = document.getElementById("totalFerramentas");
const pesquisa = document.getElementById("pesquisaFerramenta");


/* ========================================
   DADOS
======================================== */

let ferramentas =
    JSON.parse(localStorage.getItem("ferramentas")) || [];

let editarId = null;


/* ========================================
   ABRIR MODAL
======================================== */

btnAdicionar.addEventListener("click", () => {

    editarId = null;

    form.reset();

    modal.style.display = "flex";

});


/* ========================================
   FECHAR MODAL
======================================== */

fecharModal.addEventListener("click", () => {

    modal.style.display = "none";

});


/* ========================================
   SALVAR FERRAMENTA
======================================== */

form.addEventListener("submit", (e) => {

    e.preventDefault();


    const nome =
        document.getElementById("nomeFerramenta").value.trim();

    const codigo =
        document.getElementById("codigoFerramenta").value.trim();

    const categoria =
        document.getElementById("categoriaFerramenta").value.trim();

    const status =
    normalizarStatus(
        document.getElementById("statusFerramenta").value
    );


    /* --------------------------------
       VALIDAÇÃO
    -------------------------------- */

    if (!nome || !codigo || !categoria || !status) {

        alert("Preencha todos os campos.");

        return;
    }


    /* --------------------------------
       OBJETO
    -------------------------------- */

    const ferramenta = {
        nome: nome,
        codigo: codigo,
        categoria: categoria,
        status: status
    };


    /* --------------------------------
       EDITAR
    -------------------------------- */

    if (editarId !== null) {

        ferramentas[editarId] = ferramenta;

        editarId = null;

    }


    /* --------------------------------
       NOVA
    -------------------------------- */

    else {

        ferramentas.push(ferramenta);

    }


    /* --------------------------------
       SALVAR
    -------------------------------- */

    localStorage.setItem(
        "ferramentas",
        JSON.stringify(ferramentas)
    );


    /* --------------------------------
       ATUALIZAR
    -------------------------------- */

    mostrar();

    form.reset();

    modal.style.display = "none";

});


/* ========================================
   MOSTRAR FERRAMENTAS
======================================== */

function mostrar() {

    lista.innerHTML = "";


    ferramentas.forEach((item, index) => {

        const linha = document.createElement("tr");


        /* =================================
           CÓDIGO
        ================================= */

        const codigo = document.createElement("td");

        codigo.textContent = item.codigo || "-";


        /* =================================
           NOME
        ================================= */

        const nome = document.createElement("td");

        nome.textContent = item.nome || "-";


        /* =================================
           CATEGORIA
        ================================= */

        const categoria = document.createElement("td");

        categoria.textContent =
            item.categoria || "-";


        /* =================================
           STATUS
        ================================= */

        const statusColuna =
            document.createElement("td");

        const status =
            document.createElement("span");

        const statusNormalizado =
    normalizarStatus(item.status);

status.classList.add(
    "status",
    statusNormalizado
);
        status.textContent =
            formatarStatus(item.status);


        statusColuna.appendChild(status);


        /* =================================
           AÇÕES
        ================================= */

        const acoesColuna =
            document.createElement("td");

        const acoes =
            document.createElement("div");

        acoes.classList.add("acoes");


        /* ---------------------------------
           EDITAR
        --------------------------------- */

        const btnEditar =
            document.createElement("button");

        btnEditar.type = "button";

        btnEditar.title =
            "Editar ferramenta";

        btnEditar.innerHTML =
            '<i class="fa-solid fa-pen"></i>';

        btnEditar.addEventListener(
            "click",
            () => editarFerramenta(index)
        );


        /* ---------------------------------
           EXCLUIR
        --------------------------------- */

        const btnExcluir =
            document.createElement("button");

        btnExcluir.type = "button";

        btnExcluir.title =
            "Excluir ferramenta";

        btnExcluir.innerHTML =
            '<i class="fa-solid fa-trash"></i>';

        btnExcluir.addEventListener(
            "click",
            () => excluirFerramenta(index)
        );


        /* ---------------------------------
           MONTAR AÇÕES
        --------------------------------- */

        acoes.appendChild(btnEditar);

        acoes.appendChild(btnExcluir);

        acoesColuna.appendChild(acoes);


        /* =================================
           MONTAR LINHA
        ================================= */

        linha.appendChild(codigo);

        linha.appendChild(nome);

        linha.appendChild(categoria);

        linha.appendChild(statusColuna);

        linha.appendChild(acoesColuna);


        /* =================================
           ADICIONAR NA TABELA
        ================================= */

        lista.appendChild(linha);

    });


    /* =================================
       ATUALIZAR TOTAL
    ================================= */

    total.textContent = ferramentas.length;


    /* =================================
       PESQUISA ATUAL
    ================================= */

    filtrarFerramentas();

}


/* ========================================
   NORMALIZAR STATUS
======================================== */

function normalizarStatus(status) {

    const valor = String(status || "")
        .trim()
        .toLowerCase();

    if (
        valor === "disponivel" ||
        valor === "disponível"
    ) {
        return "disponivel";
    }

    if (
        valor === "em uso" ||
        valor === "em-uso"
    ) {
        return "em-uso";
    }

    if (
        valor === "manutencao" ||
        valor === "manutenção"
    ) {
        return "manutencao";
    }

    return "disponivel";
}


/* ========================================
   TEXTO DO STATUS
======================================== */

function formatarStatus(status) {

    const statusNormalizado =
        normalizarStatus(status);


    if (statusNormalizado === "disponivel") {
        return "Disponível";
    }

    if (statusNormalizado === "em-uso") {
        return "Em uso";
    }

    if (statusNormalizado === "manutencao") {
        return "Manutenção";
    }

    return "Disponível";
}


/* ========================================
   EDITAR
======================================== */

function editarFerramenta(index) {

    const ferramenta =
        ferramentas[index];


    if (!ferramenta) {
        return;
    }


    editarId = index;


    document.getElementById(
        "nomeFerramenta"
    ).value = ferramenta.nome || "";

    document.getElementById(
        "codigoFerramenta"
    ).value = ferramenta.codigo || "";

    document.getElementById(
        "categoriaFerramenta"
    ).value = ferramenta.categoria || "";

    document.getElementById(
        "statusFerramenta"
    ).value =
        ferramenta.status || "disponivel";


    modal.style.display = "flex";

}


/* ========================================
   EXCLUIR
======================================== */

function excluirFerramenta(index) {

    const ferramenta =
        ferramentas[index];


    if (!ferramenta) {
        return;
    }


    const confirmar =
        confirm(
            `Deseja excluir "${ferramenta.nome}"?`
        );


    if (!confirmar) {
        return;
    }


    ferramentas.splice(index, 1);


    localStorage.setItem(
        "ferramentas",
        JSON.stringify(ferramentas)
    );


    mostrar();

}


/* ========================================
   PESQUISA
======================================== */

pesquisa.addEventListener(
    "input",
    filtrarFerramentas
);


function filtrarFerramentas() {

    const texto =
        pesquisa.value
            .toLowerCase()
            .trim();


    const linhas =
        lista.querySelectorAll("tr");


    linhas.forEach((linha) => {

        const conteudo =
            linha.textContent
                .toLowerCase();


        linha.style.display =
            conteudo.includes(texto)
                ? ""
                : "none";

    });

}


/* ========================================
   INICIAR
======================================== */

mostrar();
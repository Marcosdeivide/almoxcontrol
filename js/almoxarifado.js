/* =========================================================
   ALMOXCONTROL
   MÓDULO DE INSUMOS
========================================================= */


/* =========================================================
   CONFIGURAÇÕES
========================================================= */

const STORAGE_INSUMOS = "insumos";
const STORAGE_MOVIMENTACOES = "movimentacoes";

const RESPONSAVEL_PADRAO = "Administrador";


/* =========================================================
   ELEMENTOS PRINCIPAIS
========================================================= */

const tabelaInsumosBody = document.getElementById("tabelaInsumosBody");

const btnNovoInsumo = document.getElementById("btnNovoInsumo");
const btnFiltros = document.getElementById("btnFiltros");

const campoBusca = document.getElementById("campoBusca");

const formInsumo = document.getElementById("formInsumo");
const formEditar = document.getElementById("formEditar");
const formMovimentacao = document.getElementById("formMovimentacao");
const formFiltros = document.getElementById("formFiltros");

const modalInsumo = document.getElementById("modalInsumo");
const modalEditar = document.getElementById("modalEditar");
const modalMovimentacao = document.getElementById("modalMovimentacao");
const modalVisualizar = document.getElementById("modalVisualizar");
const modalFiltros = document.getElementById("modalFiltros");


/* =========================================================
   ESTADO
========================================================= */

let filtrosAtuais = {
    categoria: "",
    status: "",
    localizacao: ""
};


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    inicializarDados();

    configurarEventos();

    renderizarInsumos();

    atualizarDashboard();

});


/* =========================================================
   INICIALIZAÇÃO DOS DADOS
========================================================= */

function inicializarDados() {

    if (!localStorage.getItem(STORAGE_INSUMOS)) {
        localStorage.setItem(
            STORAGE_INSUMOS,
            JSON.stringify([])
        );
    }

    if (!localStorage.getItem(STORAGE_MOVIMENTACOES)) {
        localStorage.setItem(
            STORAGE_MOVIMENTACOES,
            JSON.stringify([])
        );
    }

}


/* =========================================================
   EVENTOS
========================================================= */

function configurarEventos() {

    /* Novo insumo */

    btnNovoInsumo.addEventListener("click", () => {

        limparFormularioNovoInsumo();

        abrirModal(modalInsumo);

    });


    /* Busca */

    campoBusca.addEventListener("input", () => {

        renderizarInsumos();

    });


    /* Filtros */

    btnFiltros.addEventListener("click", () => {

        preencherFiltros();

        abrirModal(modalFiltros);

    });


    /* Cadastro */

    formInsumo.addEventListener(
        "submit",
        cadastrarInsumo
    );


    /* Edição */

    formEditar.addEventListener(
        "submit",
        salvarEdicao
    );


    /* Movimentação */

    formMovimentacao.addEventListener(
        "submit",
        registrarMovimentacao
    );


    /* Filtros */

    formFiltros.addEventListener(
        "submit",
        aplicarFiltros
    );


    /* Limpar filtros */

    document
        .getElementById("limparFiltros")
        .addEventListener("click", limparFiltros);


    /* Fechar modais */

    document
        .querySelectorAll("[data-fechar-modal]")
        .forEach(botao => {

            botao.addEventListener("click", () => {

                const modalId =
                    botao.dataset.fecharModal;

                fecharModal(
                    document.getElementById(modalId)
                );

            });

        });


    /* Clique fora do modal */

    document
        .querySelectorAll(".modal-overlay")
        .forEach(modal => {

            modal.addEventListener("click", event => {

                if (event.target === modal) {
                    fecharModal(modal);
                }

            });

        });


    /* ESC */

    document.addEventListener("keydown", event => {

        if (event.key !== "Escape") {
            return;
        }

        document
            .querySelectorAll(".modal-overlay.active")
            .forEach(modal => {

                fecharModal(modal);

            });

    });


    /* Ações da tabela */

    tabelaInsumosBody.addEventListener(
        "click",
        tratarAcaoTabela
    );

}


/* =========================================================
   LOCAL STORAGE
========================================================= */

function obterInsumos() {

    try {

        return JSON.parse(
            localStorage.getItem(STORAGE_INSUMOS)
        ) || [];

    } catch (erro) {

        console.error(
            "Erro ao carregar insumos:",
            erro
        );

        return [];

    }

}


function salvarInsumos(insumos) {

    localStorage.setItem(
        STORAGE_INSUMOS,
        JSON.stringify(insumos)
    );

}


function obterMovimentacoes() {

    try {

        return JSON.parse(
            localStorage.getItem(STORAGE_MOVIMENTACOES)
        ) || [];

    } catch (erro) {

        console.error(
            "Erro ao carregar movimentações:",
            erro
        );

        return [];

    }

}


function salvarMovimentacoes(movimentacoes) {

    localStorage.setItem(
        STORAGE_MOVIMENTACOES,
        JSON.stringify(movimentacoes)
    );

}


/* =========================================================
   CADASTRAR INSUMO
========================================================= */

function cadastrarInsumo(event) {

    event.preventDefault();

    const codigo =
        document
            .getElementById("codigoInsumo")
            .value
            .trim()
            .toUpperCase();

    const nome =
        document
            .getElementById("nomeInsumo")
            .value
            .trim();

    const categoria =
        document
            .getElementById("categoriaInsumo")
            .value;

    const unidade =
        document
            .getElementById("unidadeInsumo")
            .value;

    const estoqueInicial =
        Number(
            document
                .getElementById("estoqueInsumo")
                .value
        );

    const estoqueMinimo =
        Number(
            document
                .getElementById("estoqueMinimoInsumo")
                .value
        );

    const valor =
        Number(
            document
                .getElementById("valorInsumo")
                .value
        ) || 0;

    const localizacao =
        document
            .getElementById("localizacaoInsumo")
            .value
            .trim();

    const fornecedor =
        document
            .getElementById("fornecedorInsumo")
            .value
            .trim();


    /* Validação */

    if (
        !codigo ||
        !nome ||
        !categoria ||
        !unidade ||
        !localizacao
    ) {

        mostrarToast(
            "Preencha todos os campos obrigatórios.",
            "erro"
        );

        return;

    }


    if (
        estoqueInicial < 0 ||
        estoqueMinimo < 0 ||
        valor < 0
    ) {

        mostrarToast(
            "Os valores não podem ser negativos.",
            "erro"
        );

        return;

    }


    const insumos = obterInsumos();


    /* Código duplicado */

    const codigoExiste = insumos.some(
        insumo =>
            insumo.codigo.toLowerCase() ===
            codigo.toLowerCase()
    );


    if (codigoExiste) {

        mostrarToast(
            "Já existe um insumo com esse código.",
            "erro"
        );

        return;

    }


    /* Criar insumo */

    const novoInsumo = {

        id: gerarId(),

        codigo,
        nome,
        categoria,
        unidade,

        estoque: estoqueInicial,

        estoqueMinimo,

        valorUnitario: valor,

        localizacao,

        fornecedor,

        criadoEm: new Date().toISOString(),

        atualizadoEm: new Date().toISOString()

    };


    insumos.push(novoInsumo);

    salvarInsumos(insumos);


    /* Registrar estoque inicial */

    if (estoqueInicial > 0) {

        registrarMovimentacaoHistorico({

            itemTipo: "insumo",

            tipo: "entrada",

            codigo: novoInsumo.codigo,

            item: novoInsumo.nome,

            quantidade: estoqueInicial,

            unidade: novoInsumo.unidade,

            estoqueAnterior: 0,

            estoquePosterior: estoqueInicial,

            responsavel: RESPONSAVEL_PADRAO,

            observacao: "Estoque inicial",

            data: new Date().toISOString()

        });

    }


    renderizarInsumos();

    atualizarDashboard();

    fecharModal(modalInsumo);

    limparFormularioNovoInsumo();


    mostrarToast(
        "Insumo cadastrado com sucesso."
    );

}


/* =========================================================
   RENDERIZAÇÃO
========================================================= */

function renderizarInsumos() {

    const insumos = obterInsumos();

    const resultado = aplicarFiltrosInternos(insumos);


    if (resultado.length === 0) {

        tabelaInsumosBody.innerHTML = `

            <tr>

                <td
                    colspan="9"
                    class="empty-state"
                >

                    <i class="fa-solid fa-box-open"></i>

                    <strong>
                        Nenhum insumo encontrado
                    </strong>

                    <span>
                        Tente alterar a busca ou os filtros.
                    </span>

                </td>

            </tr>

        `;

        return;

    }


    tabelaInsumosBody.innerHTML =
        resultado
            .map(criarLinhaInsumo)
            .join("");

}


/* =========================================================
   CRIAR LINHA
========================================================= */

function criarLinhaInsumo(insumo) {

    const status =
        calcularStatus(insumo);

    const classeStatus =
        obterClasseStatus(status);


    return `

        <tr data-id="${escapeHTML(insumo.id)}">

            <td>
                ${escapeHTML(insumo.codigo)}
            </td>

            <td>
                ${escapeHTML(insumo.nome)}
            </td>

            <td>
                ${escapeHTML(insumo.categoria)}
            </td>

            <td>
                ${formatarNumero(insumo.estoque)}
            </td>

            <td>
                ${formatarNumero(insumo.estoqueMinimo)}
            </td>

            <td>
                ${escapeHTML(insumo.unidade)}
            </td>

            <td>
                ${escapeHTML(insumo.localizacao)}
            </td>

            <td>

                <span class="status ${classeStatus}">
                    ${status}
                </span>

            </td>

            <td>

                <div class="table-actions">

                    <button
                        type="button"
                        data-acao="visualizar"
                        data-id="${escapeHTML(insumo.id)}"
                        title="Visualizar"
                    >
                        <i class="fa-solid fa-eye"></i>
                    </button>

                    <button
                        type="button"
                        data-acao="editar"
                        data-id="${escapeHTML(insumo.id)}"
                        title="Editar"
                    >
                        <i class="fa-solid fa-pen"></i>
                    </button>

                    <button
                        type="button"
                        data-acao="movimentar"
                        data-id="${escapeHTML(insumo.id)}"
                        title="Movimentar"
                    >
                        <i class="fa-solid fa-arrow-right-arrow-left"></i>
                    </button>

                    <button
                        type="button"
                        class="danger"
                        data-acao="excluir"
                        data-id="${escapeHTML(insumo.id)}"
                        title="Excluir"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </div>

            </td>

        </tr>

    `;

}


/* =========================================================
   AÇÕES DA TABELA
========================================================= */

function tratarAcaoTabela(event) {

    const botao =
        event.target.closest("button[data-acao]");


    if (!botao) {
        return;
    }


    const acao =
        botao.dataset.acao;

    const id =
        botao.dataset.id;


    switch (acao) {

        case "visualizar":
            visualizarInsumo(id);
            break;

        case "editar":
            editarInsumo(id);
            break;

        case "movimentar":
            abrirMovimentacao(id);
            break;

        case "excluir":
            excluirInsumo(id);
            break;

    }

}


/* =========================================================
   VISUALIZAR
========================================================= */

function visualizarInsumo(id) {

    const insumo =
        encontrarInsumo(id);


    if (!insumo) {
        return;
    }


    const status =
        calcularStatus(insumo);


    document.getElementById(
        "visualizarNome"
    ).textContent = insumo.nome;


    document.getElementById(
        "visualizarCodigo"
    ).textContent =
        `Código: ${insumo.codigo}`;


    document.getElementById(
        "visualizarCategoria"
    ).textContent =
        insumo.categoria;


    document.getElementById(
        "visualizarStatus"
    ).innerHTML = `

        <span class="status ${obterClasseStatus(status)}">
            ${status}
        </span>

    `;


    document.getElementById(
        "visualizarEstoque"
    ).textContent =
        `${formatarNumero(insumo.estoque)} ${insumo.unidade}`;


    document.getElementById(
        "visualizarMinimo"
    ).textContent =
        `${formatarNumero(insumo.estoqueMinimo)} ${insumo.unidade}`;


    document.getElementById(
        "visualizarUnidade"
    ).textContent =
        insumo.unidade;


    document.getElementById(
        "visualizarValor"
    ).textContent =
        formatarMoeda(insumo.valorUnitario);


    document.getElementById(
        "visualizarLocalizacao"
    ).textContent =
        insumo.localizacao;


    document.getElementById(
        "visualizarFornecedor"
    ).textContent =
        insumo.fornecedor || "Não informado";


    renderizarHistorico(insumo);


    abrirModal(modalVisualizar);

}


/* =========================================================
   HISTÓRICO
========================================================= */

function renderizarHistorico(insumo) {

    const container =
        document.getElementById(
            "historicoInsumo"
        );


    const movimentacoes =
        obterMovimentacoes()
            .filter(mov =>
                mov.itemTipo === "insumo" &&
                mov.codigo === insumo.codigo
            )
            .sort(
                (a, b) =>
                    new Date(b.data) -
                    new Date(a.data)
            )
            .slice(0, 5);


    if (movimentacoes.length === 0) {

        container.innerHTML = `

            <div class="history-empty">
                Nenhuma movimentação registrada.
            </div>

        `;

        return;

    }


    container.innerHTML =
        movimentacoes
            .map(mov => {

                const entrada =
                    mov.tipo === "entrada";

                const classe =
                    entrada
                        ? "entrada"
                        : "consumo";

                const icone =
                    entrada
                        ? "fa-arrow-down"
                        : "fa-arrow-up";

                const texto =
                    entrada
                        ? "Entrada"
                        : "Consumo";


                return `

                    <div class="history-item">

                        <div class="history-info">

                            <div class="history-type ${classe}">

                                <i class="fa-solid ${icone}"></i>

                                ${texto}

                            </div>

                            <small>
                                ${formatarData(mov.data)}

                                ${mov.observacao
                                    ? ` • ${escapeHTML(mov.observacao)}`
                                    : ""
                                }
                            </small>

                        </div>

                        <div class="history-quantity">

                            ${entrada ? "+" : "-"}

                            ${formatarNumero(mov.quantidade)}

                            ${escapeHTML(mov.unidade)}

                        </div>

                    </div>

                `;

            })
            .join("");

}


/* =========================================================
   EDITAR
========================================================= */

function editarInsumo(id) {

    const insumo =
        encontrarInsumo(id);


    if (!insumo) {
        return;
    }


    document.getElementById(
        "editarId"
    ).value = insumo.id;


    document.getElementById(
        "editarCodigo"
    ).value = insumo.codigo;


    document.getElementById(
        "editarNome"
    ).value = insumo.nome;


    document.getElementById(
        "editarCategoria"
    ).value = insumo.categoria;


    document.getElementById(
        "editarUnidade"
    ).value = insumo.unidade;


    document.getElementById(
        "editarMinimo"
    ).value = insumo.estoqueMinimo;


    document.getElementById(
        "editarValor"
    ).value = insumo.valorUnitario;


    document.getElementById(
        "editarLocalizacao"
    ).value = insumo.localizacao;


    document.getElementById(
        "editarFornecedor"
    ).value = insumo.fornecedor || "";


    abrirModal(modalEditar);

}


/* =========================================================
   SALVAR EDIÇÃO
========================================================= */

function salvarEdicao(event) {

    event.preventDefault();


    const id =
        document.getElementById(
            "editarId"
        ).value;


    const insumos =
        obterInsumos();


    const index =
        insumos.findIndex(
            insumo => insumo.id === id
        );


    if (index === -1) {

        mostrarToast(
            "Insumo não encontrado.",
            "erro"
        );

        return;

    }


    const nome =
        document.getElementById(
            "editarNome"
        ).value.trim();


    const categoria =
        document.getElementById(
            "editarCategoria"
        ).value;


    const unidade =
        document.getElementById(
            "editarUnidade"
        ).value;


    const minimo =
        Number(
            document.getElementById(
                "editarMinimo"
            ).value
        );


    const valor =
        Number(
            document.getElementById(
                "editarValor"
            ).value
        ) || 0;


    const localizacao =
        document.getElementById(
            "editarLocalizacao"
        ).value.trim();


    const fornecedor =
        document.getElementById(
            "editarFornecedor"
        ).value.trim();


    if (
        !nome ||
        !categoria ||
        !unidade ||
        !localizacao
    ) {

        mostrarToast(
            "Preencha todos os campos obrigatórios.",
            "erro"
        );

        return;

    }


    if (minimo < 0 || valor < 0) {

        mostrarToast(
            "Os valores não podem ser negativos.",
            "erro"
        );

        return;

    }


    insumos[index] = {

        ...insumos[index],

        nome,
        categoria,
        unidade,

        estoqueMinimo: minimo,

        valorUnitario: valor,

        localizacao,

        fornecedor,

        atualizadoEm:
            new Date().toISOString()

    };


    salvarInsumos(insumos);

    renderizarInsumos();

    atualizarDashboard();

    fecharModal(modalEditar);


    mostrarToast(
        "Insumo atualizado com sucesso."
    );

}


/* =========================================================
   ABRIR MOVIMENTAÇÃO
========================================================= */

function abrirMovimentacao(id) {

    const insumo =
        encontrarInsumo(id);


    if (!insumo) {
        return;
    }


    document.getElementById(
        "movimentacaoId"
    ).value = insumo.id;


    document.getElementById(
        "movimentacaoNome"
    ).textContent =
        insumo.nome;


    document.getElementById(
        "movimentacaoEstoqueAtual"
    ).textContent =
        `Estoque atual: ${formatarNumero(insumo.estoque)} ${insumo.unidade}`;


    document.getElementById(
        "movimentacaoDescricao"
    ).textContent =
        `Registre uma entrada ou consumo de ${insumo.nome}.`;


    document.getElementById(
        "tipoMovimentacao"
    ).value = "entrada";


    document.getElementById(
        "quantidadeMovimentacao"
    ).value = "";


    document.getElementById(
        "observacaoMovimentacao"
    ).value = "";


    abrirModal(modalMovimentacao);

}


/* =========================================================
   REGISTRAR MOVIMENTAÇÃO
========================================================= */

function registrarMovimentacao(event) {

    event.preventDefault();


    const id =
        document.getElementById(
            "movimentacaoId"
        ).value;


    const tipo =
        document.getElementById(
            "tipoMovimentacao"
        ).value;


    const quantidade =
        Number(
            document.getElementById(
                "quantidadeMovimentacao"
            ).value
        );


    const observacao =
        document.getElementById(
            "observacaoMovimentacao"
        ).value.trim();


    if (!quantidade || quantidade <= 0) {

        mostrarToast(
            "Informe uma quantidade válida.",
            "erro"
        );

        return;

    }


    const insumos =
        obterInsumos();


    const index =
        insumos.findIndex(
            insumo => insumo.id === id
        );


    if (index === -1) {

        mostrarToast(
            "Insumo não encontrado.",
            "erro"
        );

        return;

    }


    const insumo =
        insumos[index];


    const estoqueAnterior =
        Number(insumo.estoque);


    let estoquePosterior;


    /* ENTRADA */

    if (tipo === "entrada") {

        estoquePosterior =
            estoqueAnterior + quantidade;

    }


    /* CONSUMO */

    else {

        if (quantidade > estoqueAnterior) {

            mostrarToast(
                "O consumo não pode ser maior que o estoque atual.",
                "erro"
            );

            return;

        }


        estoquePosterior =
            estoqueAnterior - quantidade;

    }


    /* Atualizar estoque */

    insumo.estoque =
        estoquePosterior;


    insumo.atualizadoEm =
        new Date().toISOString();


    insumos[index] =
        insumo;


    salvarInsumos(insumos);


    /* Histórico */

    registrarMovimentacaoHistorico({

        itemTipo: "insumo",

        tipo,

        codigo: insumo.codigo,

        item: insumo.nome,

        quantidade,

        unidade: insumo.unidade,

        estoqueAnterior,

        estoquePosterior,

        responsavel: RESPONSAVEL_PADRAO,

        observacao:
            observacao ||
            (tipo === "entrada"
                ? "Entrada de estoque"
                : "Consumo de estoque"),

        data: new Date().toISOString()

    });


    renderizarInsumos();

    atualizarDashboard();

    fecharModal(modalMovimentacao);


    mostrarToast(
        tipo === "entrada"
            ? "Entrada registrada com sucesso."
            : "Consumo registrado com sucesso."
    );

}


/* =========================================================
   HISTÓRICO DE MOVIMENTAÇÕES
========================================================= */

function registrarMovimentacaoHistorico(movimentacao) {

    const movimentacoes =
        obterMovimentacoes();


    movimentacoes.push({

        id: gerarId(),

        ...movimentacao

    });


    salvarMovimentacoes(
        movimentacoes
    );

}


/* =========================================================
   EXCLUIR
========================================================= */

function excluirInsumo(id) {

    const insumo =
        encontrarInsumo(id);


    if (!insumo) {
        return;
    }


    const confirmou =
        confirm(
            `Deseja realmente excluir o insumo "${insumo.nome}"?`
        );


    if (!confirmou) {
        return;
    }


    const insumos =
        obterInsumos()
            .filter(
                item => item.id !== id
            );


    salvarInsumos(insumos);


    renderizarInsumos();

    atualizarDashboard();


    mostrarToast(
        "Insumo excluído com sucesso."
    );

}


/* =========================================================
   DASHBOARD
========================================================= */

function atualizarDashboard() {

    const insumos =
        obterInsumos();


    let estoqueBaixo = 0;
    let semEstoque = 0;
    let valorTotal = 0;


    insumos.forEach(insumo => {

        const estoque =
            Number(insumo.estoque) || 0;

        const minimo =
            Number(insumo.estoqueMinimo) || 0;

        const valor =
            Number(insumo.valorUnitario) || 0;


        if (estoque <= 0) {

            semEstoque++;

        } else if (estoque <= minimo) {

            estoqueBaixo++;

        }


        valorTotal +=
            estoque * valor;

    });


    document.getElementById(
        "totalInsumos"
    ).textContent =
        insumos.length;


    document.getElementById(
        "estoqueBaixo"
    ).textContent =
        estoqueBaixo;


    document.getElementById(
        "semEstoque"
    ).textContent =
        semEstoque;


    document.getElementById(
        "valorEstoque"
    ).textContent =
        formatarMoeda(valorTotal);

}


/* =========================================================
   STATUS
========================================================= */

function calcularStatus(insumo) {

    const estoque =
        Number(insumo.estoque) || 0;

    const minimo =
        Number(insumo.estoqueMinimo) || 0;


    if (estoque <= 0) {
        return "Sem estoque";
    }


    if (estoque <= minimo) {
        return "Estoque baixo";
    }


    return "Em estoque";

}


function obterClasseStatus(status) {

    if (status === "Sem estoque") {
        return "status-danger";
    }


    if (status === "Estoque baixo") {
        return "status-warning";
    }


    return "status-ok";

}


/* =========================================================
   BUSCA + FILTROS
========================================================= */

function aplicarFiltrosInternos(insumos) {

    const busca =
        campoBusca.value
            .trim()
            .toLowerCase();


    return insumos.filter(insumo => {

        const correspondeBusca =
            !busca ||
            insumo.codigo
                .toLowerCase()
                .includes(busca) ||

            insumo.nome
                .toLowerCase()
                .includes(busca) ||

            insumo.categoria
                .toLowerCase()
                .includes(busca) ||

            insumo.localizacao
                .toLowerCase()
                .includes(busca);


        const correspondeCategoria =
            !filtrosAtuais.categoria ||
            insumo.categoria ===
            filtrosAtuais.categoria;


        const correspondeStatus =
            !filtrosAtuais.status ||
            calcularStatus(insumo) ===
            filtrosAtuais.status;


        const correspondeLocalizacao =
            !filtrosAtuais.localizacao ||
            insumo.localizacao
                .toLowerCase()
                .includes(
                    filtrosAtuais.localizacao
                        .toLowerCase()
                );


        return (
            correspondeBusca &&
            correspondeCategoria &&
            correspondeStatus &&
            correspondeLocalizacao
        );

    });

}


/* =========================================================
   FILTROS
========================================================= */

function preencherFiltros() {

    document.getElementById(
        "filtroCategoria"
    ).value =
        filtrosAtuais.categoria;


    document.getElementById(
        "filtroStatus"
    ).value =
        filtrosAtuais.status;


    document.getElementById(
        "filtroLocalizacao"
    ).value =
        filtrosAtuais.localizacao;

}


function aplicarFiltros(event) {

    event.preventDefault();


    filtrosAtuais = {

        categoria:
            document.getElementById(
                "filtroCategoria"
            ).value,

        status:
            document.getElementById(
                "filtroStatus"
            ).value,

        localizacao:
            document.getElementById(
                "filtroLocalizacao"
            ).value.trim()

    };


    renderizarInsumos();

    atualizarEstadoBotaoFiltro();

    fecharModal(modalFiltros);

}


function limparFiltros() {

    filtrosAtuais = {

        categoria: "",
        status: "",
        localizacao: ""

    };


    document.getElementById(
        "filtroCategoria"
    ).value = "";


    document.getElementById(
        "filtroStatus"
    ).value = "";


    document.getElementById(
        "filtroLocalizacao"
    ).value = "";


    renderizarInsumos();

    atualizarEstadoBotaoFiltro();

}


function atualizarEstadoBotaoFiltro() {

    const possuiFiltro =
        filtrosAtuais.categoria ||
        filtrosAtuais.status ||
        filtrosAtuais.localizacao;


    btnFiltros.classList.toggle(
        "active",
        Boolean(possuiFiltro)
    );

}


/* =========================================================
   MODAIS
========================================================= */

function abrirModal(modal) {

    if (!modal) {
        return;
    }


    modal.classList.add("active");

    document.body.classList.add("modal-open");

}


function fecharModal(modal) {

    if (!modal) {
        return;
    }


    modal.classList.remove("active");


    if (
        !document.querySelector(
            ".modal-overlay.active"
        )
    ) {

        document.body.classList.remove(
            "modal-open"
        );

    }

}


/* =========================================================
   LIMPAR FORMULÁRIO
========================================================= */

function limparFormularioNovoInsumo() {

    formInsumo.reset();

}


/* =========================================================
   ENCONTRAR INSUMO
========================================================= */

function encontrarInsumo(id) {

    return obterInsumos()
        .find(
            insumo => insumo.id === id
        );

}


/* =========================================================
   UTILITÁRIOS
========================================================= */

function gerarId() {

    return (
        Date.now().toString(36) +
        Math.random()
            .toString(36)
            .substring(2, 8)
    );

}


function formatarNumero(valor) {

    return Number(valor || 0)
        .toLocaleString(
            "pt-BR",
            {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
            }
        );

}


function formatarMoeda(valor) {

    return Number(valor || 0)
        .toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );

}


function formatarData(data) {

    if (!data) {
        return "-";
    }


    const dataObj =
        new Date(data);


    return dataObj.toLocaleString(
        "pt-BR",
        {
            dateStyle: "short",
            timeStyle: "short"
        }
    );

}


function escapeHTML(valor) {

    return String(valor ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   TOAST
========================================================= */

let toastTimeout;


function mostrarToast(
    mensagem,
    tipo = "sucesso"
) {

    const toast =
        document.getElementById("toast");

    const toastMensagem =
        document.getElementById(
            "toastMensagem"
        );


    toastMensagem.textContent =
        mensagem;


    const icone =
        toast.querySelector("i");


    if (tipo === "erro") {

        toast.style.borderLeftColor =
            "#ef4444";

        icone.className =
            "fa-solid fa-circle-exclamation";

        icone.style.color =
            "#f87171";

    } else {

        toast.style.borderLeftColor =
            "#4ade80";

        icone.className =
            "fa-solid fa-circle-check";

        icone.style.color =
            "#4ade80";

    }


    toast.classList.add("active");


    clearTimeout(toastTimeout);


    toastTimeout =
        setTimeout(() => {

            toast.classList.remove(
                "active"
            );

        }, 3000);

}


/* =========================================================
   DISPONIBILIZAR DADOS PARA DEBUG
========================================================= */

window.almoxControlInsumos = {

    obterInsumos,

    obterMovimentacoes,

    atualizarDashboard,

    renderizarInsumos

};
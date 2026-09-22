/* =========================================================
   ALMOXCONTROL
   MÓDULO DE MOVIMENTAÇÕES
========================================================= */


/* =========================================================
   CONFIGURAÇÕES
========================================================= */

const STORAGE_FERRAMENTAS = "ferramentas";
const STORAGE_COLABORADORES = "colaboradores";
const STORAGE_INSUMOS = "insumos";
const STORAGE_MOVIMENTACOES = "movimentacoes";
const STORAGE_OS = "ordensServico";


/* =========================================================
   ELEMENTOS
========================================================= */

const btnNova = document.getElementById("btnNovaMovimentacao");
const modal = document.getElementById("modalMovimentacao");
const fechar = document.getElementById("fecharModalMovimentacao");
const form = document.getElementById("formMovimentacao");

const lista = document.getElementById("listaMovimentacoes");
const total = document.getElementById("totalMovimentacoes");

const pesquisa = document.getElementById("pesquisaMovimentacao");
const filtro = document.getElementById("filtroMovimentacao");

const tipoItem = document.getElementById("tipoItemMovimentacao");

const camposInsumo = document.getElementById("camposInsumo");
const camposFerramenta = document.getElementById("camposFerramenta");

const selectInsumo = document.getElementById("insumoMovimentacao");
const quantidadeInsumo = document.getElementById("quantidadeMovimentacao");

const vincularOS = document.getElementById("vincularOSMovimentacao");
const campoOS = document.getElementById("campoOSMovimentacao");
const selectOS = document.getElementById("ordemServicoMovimentacao");

const selectFerramenta = document.getElementById("ferramentaMovimentacao");
const selectColaborador = document.getElementById("colaboradorMovimentacao");

const tipoFerramenta = document.getElementById("tipoMovimentacao");
const dataDevolucao = document.getElementById("dataDevolucao");

const observacao = document.getElementById("observacaoMovimentacao");


/* =========================================================
   DADOS
========================================================= */

let ferramentas = obterDados(STORAGE_FERRAMENTAS);
let colaboradores = obterDados(STORAGE_COLABORADORES);
let insumos = obterDados(STORAGE_INSUMOS);
let movimentacoes = obterDados(STORAGE_MOVIMENTACOES);
let ordensServico = obterDados(STORAGE_OS);


/* =========================================================
   LOCAL STORAGE
========================================================= */

function obterDados(chave) {

    try {

        return JSON.parse(
            localStorage.getItem(chave)
        ) || [];

    } catch (erro) {

        console.error(
            `Erro ao carregar ${chave}:`,
            erro
        );

        return [];

    }

}


function atualizarDados() {

    ferramentas = obterDados(STORAGE_FERRAMENTAS);

    colaboradores = obterDados(STORAGE_COLABORADORES);

    insumos = obterDados(STORAGE_INSUMOS);

    movimentacoes = obterDados(STORAGE_MOVIMENTACOES);

    ordensServico = obterDados(STORAGE_OS);

}


/* =========================================================
   ABRIR MODAL
========================================================= */

btnNova.addEventListener("click", () => {

    atualizarDados();

    limparFormulario();

    carregarInsumos();

    carregarFerramentas();

    carregarColaboradores();

    carregarOS();

    atualizarTipoItem();

    modal.style.display = "flex";

});


/* =========================================================
   FECHAR MODAL
========================================================= */

fechar.addEventListener("click", () => {

    modal.style.display = "none";

});


modal.addEventListener("click", (event) => {

    if (event.target === modal) {

        modal.style.display = "none";

    }

});


/* =========================================================
   TIPO DE ITEM
========================================================= */

tipoItem.addEventListener(
    "change",
    atualizarTipoItem
);


function atualizarTipoItem() {

    if (tipoItem.value === "insumo") {

        camposInsumo.hidden = false;

        camposFerramenta.hidden = true;

    } else {

        camposInsumo.hidden = true;

        camposFerramenta.hidden = false;

    }

}


/* =========================================================
   CARREGAR INSUMOS
========================================================= */

function carregarInsumos() {

    selectInsumo.innerHTML = "";

    if (insumos.length === 0) {

        selectInsumo.innerHTML = `
            <option value="">
                Nenhum insumo cadastrado
            </option>
        `;

        return;

    }


    insumos.forEach((insumo) => {

        selectInsumo.innerHTML += `
            <option value="${insumo.id}">
                ${escaparHTML(insumo.nome)}
                — estoque: ${insumo.estoque} ${escaparHTML(insumo.unidade)}
            </option>
        `;

    });

}


/* =========================================================
   CARREGAR FERRAMENTAS
========================================================= */

function carregarFerramentas() {

    selectFerramenta.innerHTML = "";

    const disponiveis = ferramentas.filter(
        ferramenta =>
            ferramenta.status !== "Em uso"
    );


    if (disponiveis.length === 0) {

        selectFerramenta.innerHTML = `
            <option value="">
                Nenhuma ferramenta disponível
            </option>
        `;

        return;

    }


    disponiveis.forEach((ferramenta) => {

        selectFerramenta.innerHTML += `
            <option value="${escaparHTML(ferramenta.nome)}">
                ${escaparHTML(ferramenta.nome)}
            </option>
        `;

    });

}


/* =========================================================
   CARREGAR COLABORADORES
========================================================= */

function carregarColaboradores() {

    selectColaborador.innerHTML = "";

    if (colaboradores.length === 0) {

        selectColaborador.innerHTML = `
            <option value="">
                Nenhum colaborador cadastrado
            </option>
        `;

        return;

    }


    colaboradores.forEach((colaborador) => {

        selectColaborador.innerHTML += `
            <option value="${escaparHTML(colaborador.nome)}">
                ${escaparHTML(colaborador.nome)}
            </option>
        `;

    });

}


/* =========================================================
   CARREGAR ORDENS DE SERVIÇO
========================================================= */

function carregarOS() {

    selectOS.innerHTML = `
        <option value="">
            Selecione uma OS
        </option>
    `;


    if (ordensServico.length === 0) {

        selectOS.innerHTML += `
            <option value="" disabled>
                Nenhuma OS cadastrada
            </option>
        `;

        return;

    }


    ordensServico
        .slice()
        .sort((a, b) => b.id - a.id)
        .forEach((os) => {

            selectOS.innerHTML += `
                <option value="${os.id}">
                    OS ${escaparHTML(os.numero)}
                    — ${escaparHTML(os.cliente)}
                </option>
            `;

        });

}


/* =========================================================
   VINCULAR OS
========================================================= */

vincularOS.addEventListener(
    "change",
    atualizarCampoOS
);


function atualizarCampoOS() {

    if (vincularOS.value === "sim") {

        campoOS.hidden = false;

    } else {

        campoOS.hidden = true;

        selectOS.value = "";

    }

}


/* =========================================================
   SALVAR MOVIMENTAÇÃO
========================================================= */

form.addEventListener(
    "submit",
    salvarMovimentacao
);


function salvarMovimentacao(event) {

    event.preventDefault();

    atualizarDados();


    if (tipoItem.value === "insumo") {

        registrarSaidaInsumo();

        return;

    }


    registrarEmprestimoFerramenta();

}


/* =========================================================
   SAÍDA DE INSUMO
========================================================= */

function registrarSaidaInsumo() {

    const insumoId = selectInsumo.value;

    const quantidade = Number(
        quantidadeInsumo.value
    );


    if (!insumoId) {

        alert("Selecione um insumo.");

        return;

    }


    if (!quantidade || quantidade <= 0) {

        alert("Informe uma quantidade válida.");

        return;

    }


    const index = insumos.findIndex(
        insumo =>
            String(insumo.id) === String(insumoId)
    );


    if (index === -1) {

        alert("Insumo não encontrado.");

        return;

    }


    const insumo = insumos[index];

    const estoqueAnterior =
        Number(insumo.estoque) || 0;


    /* NÃO DEIXAR ESTOQUE FICAR NEGATIVO */

    if (quantidade > estoqueAnterior) {

        alert(
            `Estoque insuficiente.\n\n` +
            `Estoque atual: ${estoqueAnterior} ${insumo.unidade}`
        );

        return;

    }


    const estoquePosterior =
        estoqueAnterior - quantidade;


    /* ATUALIZA ESTOQUE */

    insumo.estoque = estoquePosterior;

    insumo.atualizadoEm =
        new Date().toISOString();


    insumos[index] = insumo;


    localStorage.setItem(
        STORAGE_INSUMOS,
        JSON.stringify(insumos)
    );


    /* =====================================================
       DADOS DA OS
    ====================================================== */

    let osId = null;
    let osNumero = null;


    if (vincularOS.value === "sim") {

        if (!selectOS.value) {

            alert(
                "Selecione a Ordem de Serviço."
            );

            /* DESFAZ A BAIXA */

            insumo.estoque =
                estoqueAnterior;

            insumos[index] = insumo;

            localStorage.setItem(
                STORAGE_INSUMOS,
                JSON.stringify(insumos)
            );

            return;

        }


        const os = ordensServico.find(
            item =>
                String(item.id) ===
                String(selectOS.value)
        );


        if (!os) {

            alert(
                "Ordem de Serviço não encontrada."
            );

            /* DESFAZ A BAIXA */

            insumo.estoque =
                estoqueAnterior;

            insumos[index] = insumo;

            localStorage.setItem(
                STORAGE_INSUMOS,
                JSON.stringify(insumos)
            );

            return;

        }


        osId = os.id;

        osNumero = os.numero;

    }


    /* =====================================================
       REGISTRO DA MOVIMENTAÇÃO
    ====================================================== */

    const novaMovimentacao = {

        id: Date.now(),

        itemTipo: "insumo",

        tipo: "saida",

        codigo: insumo.codigo,

        item: insumo.nome,

        quantidade: quantidade,

        unidade: insumo.unidade,

        valorUnitario:
            Number(insumo.valorUnitario) || 0,

        valorTotal:
            quantidade *
            (Number(insumo.valorUnitario) || 0),

        estoqueAnterior,

        estoquePosterior,

        responsavel: "Administrador",

        osId,

        osNumero,

        observacao:
            observacao.value.trim(),

        data:
            new Date().toISOString()

    };


    movimentacoes.push(
        novaMovimentacao
    );


    localStorage.setItem(
        STORAGE_MOVIMENTACOES,
        JSON.stringify(movimentacoes)
    );


    fecharDepoisDeSalvar();

}


/* =========================================================
   EMPRÉSTIMO DE FERRAMENTA
========================================================= */

function registrarEmprestimoFerramenta() {

    const ferramentaNome =
        selectFerramenta.value;

    const colaboradorNome =
        selectColaborador.value;


    if (!ferramentaNome) {

        alert(
            "Selecione uma ferramenta."
        );

        return;

    }


    if (!colaboradorNome) {

        alert(
            "Selecione um colaborador."
        );

        return;

    }


    const ferramenta =
        ferramentas.find(
            ferramenta =>
                ferramenta.nome ===
                ferramentaNome
        );


    const colaborador =
        colaboradores.find(
            colaborador =>
                colaborador.nome ===
                colaboradorNome
        );


    if (!ferramenta) {

        alert(
            "Ferramenta não encontrada."
        );

        return;

    }


    if (!colaborador) {

        alert(
            "Colaborador não encontrado."
        );

        return;

    }


    if (
        ferramenta.status ===
        "Em uso"
    ) {

        alert(
            "Esta ferramenta já está em uso."
        );

        return;

    }


    /* =====================================================
       MOVIMENTAÇÃO
    ====================================================== */

    const novaMovimentacao = {

        id: Date.now(),

        itemTipo: "ferramenta",

        ferramenta:
            ferramenta.nome,

        item:
            ferramenta.nome,

        colaborador:
            colaborador.nome,

        tipo:
            "emprestimo",

        quantidade: 1,

        devolucao:
            dataDevolucao.value,

        observacao:
            observacao.value.trim(),

        data:
            new Date().toISOString()

    };


    /* ATUALIZA FERRAMENTA */

    ferramenta.status = "Em uso";

    ferramenta.colaborador =
        colaborador.nome;


    /* ATUALIZA COLABORADOR */

    colaborador.ferramentas =
        (colaborador.ferramentas || 0) + 1;


    /* SALVAR */

    movimentacoes.push(
        novaMovimentacao
    );


    localStorage.setItem(
        STORAGE_FERRAMENTAS,
        JSON.stringify(ferramentas)
    );


    localStorage.setItem(
        STORAGE_COLABORADORES,
        JSON.stringify(colaboradores)
    );


    localStorage.setItem(
        STORAGE_MOVIMENTACOES,
        JSON.stringify(movimentacoes)
    );


    fecharDepoisDeSalvar();

}


/* =========================================================
   MOSTRAR MOVIMENTAÇÕES
========================================================= */

function mostrarMovimentacoes() {

    atualizarDados();

    lista.innerHTML = "";


    let resultados =
        movimentacoes.slice();


    /* =====================================================
       PESQUISA
    ====================================================== */

    const texto =
        pesquisa.value
            .toLowerCase()
            .trim();


    if (texto) {

        resultados =
            resultados.filter(
                item => {

                    const itemNome =
                        (
                            item.item ||
                            item.ferramenta ||
                            ""
                        )
                        .toLowerCase();


                    const colaborador =
                        (
                            item.colaborador ||
                            ""
                        )
                        .toLowerCase();


                    const os =
                        (
                            item.osNumero ||
                            ""
                        )
                        .toLowerCase();


                    return (
                        itemNome.includes(texto) ||
                        colaborador.includes(texto) ||
                        os.includes(texto)
                    );

                }
            );

    }


    /* =====================================================
       FILTRO
    ====================================================== */

    const filtroAtual =
        filtro.value;


    if (filtroAtual !== "todos") {

        resultados =
            resultados.filter(
                item => {

                    if (
                        filtroAtual ===
                        "ferramentas"
                    ) {

                        return item.itemTipo ===
                            "ferramenta";

                    }


                    if (
                        filtroAtual ===
                        "insumos"
                    ) {

                        return item.itemTipo ===
                            "insumo";

                    }


                    if (
                        filtroAtual ===
                        "emprestimos"
                    ) {

                        return item.tipo ===
                            "emprestimo";

                    }


                    if (
                        filtroAtual ===
                        "devolucoes"
                    ) {

                        return item.tipo ===
                            "devolucao";

                    }


                    if (
                        filtroAtual ===
                        "saidas"
                    ) {

                        return (
                            item.itemTipo ===
                            "insumo" &&
                            item.tipo ===
                            "saida"
                        );

                    }


                    return true;

                }
            );

    }


    /* =====================================================
       ORDENAR MAIS RECENTE PRIMEIRO
    ====================================================== */

    resultados.sort(
        (a, b) =>
            new Date(b.data) -
            new Date(a.data)
    );


    /* =====================================================
       ESTADO VAZIO
    ====================================================== */

    if (resultados.length === 0) {

        lista.innerHTML = `

            <tr>

                <td
                    colspan="9"
                    style="text-align:center; padding:30px;"
                >

                    Nenhuma movimentação encontrada.

                </td>

            </tr>

        `;

        total.textContent = "0";

        return;

    }


    /* =====================================================
       RENDERIZAR
    ====================================================== */

    resultados.forEach(
        (item) => {

            const index =
                movimentacoes.indexOf(item);


            const linha =
                document.createElement("tr");


            /* =================================================
               INSUMO
            ================================================== */

            if (
                item.itemTipo ===
                "insumo"
            ) {

                linha.innerHTML = `

                    <td>
                        ${formatarDataHora(item.data)}
                    </td>

                    <td>
                        ${escaparHTML(item.item)}
                    </td>

                    <td>
                        <span class="tipo">
                            Insumo
                        </span>
                    </td>

                    <td>
                        <span class="tipo saida">
                            Saída
                        </span>
                    </td>

                    <td>
                        ${item.quantidade}
                        ${escaparHTML(item.unidade || "")}
                    </td>

                    <td>
                        ${escaparHTML(item.responsavel || "-")}
                    </td>

                    <td>
                        ${
                            item.osNumero
                                ? `OS ${escaparHTML(item.osNumero)}`
                                : "-"
                        }
                    </td>

                    <td>
                        <span class="status disponivel">
                            Registrada
                        </span>
                    </td>

                    <td class="acoes">

                        <button
                            title="Excluir"
                            onclick="excluirMovimentacao(${index})"
                        >

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </td>

                `;

            }


            /* =================================================
               FERRAMENTA
            ================================================== */

            else {

                const isEmprestimo =
                    item.tipo ===
                    "emprestimo";


                linha.innerHTML = `

                    <td>
                        ${formatarDataHora(item.data)}
                    </td>

                    <td>
                        ${escaparHTML(
                            item.item ||
                            item.ferramenta ||
                            "-"
                        )}
                    </td>

                    <td>
                        <span class="tipo">
                            Ferramenta
                        </span>
                    </td>

                    <td>

                        <span class="tipo ${
                            isEmprestimo
                                ? "emprestimo"
                                : "devolucao"
                        }">

                            ${
                                isEmprestimo
                                    ? "Empréstimo"
                                    : "Devolução"
                            }

                        </span>

                    </td>

                    <td>
                        1
                    </td>

                    <td>
                        ${escaparHTML(
                            item.colaborador ||
                            "-"
                        )}
                    </td>

                    <td>
                        -
                    </td>

                    <td>

                        <span class="status ${
                            isEmprestimo
                                ? "uso"
                                : "disponivel"
                        }">

                            ${
                                isEmprestimo
                                    ? "Em uso"
                                    : "Devolvida"
                            }

                        </span>

                    </td>

                    <td class="acoes">

                        ${
                            isEmprestimo
                                ? `
                                    <button
                                        title="Devolver"
                                        onclick="devolverFerramenta(${index})"
                                    >

                                        <i class="fa-solid fa-arrow-rotate-left"></i>

                                    </button>
                                `
                                : ""
                        }

                        <button
                            title="Excluir"
                            onclick="excluirMovimentacao(${index})"
                        >

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </td>

                `;

            }


            lista.appendChild(
                linha
            );

        }
    );


    total.textContent =
        resultados.length;

}


/* =========================================================
   DEVOLVER FERRAMENTA
========================================================= */

function devolverFerramenta(index) {

    atualizarDados();


    const movimentacao =
        movimentacoes[index];


    if (!movimentacao) {

        return;

    }


    if (
        movimentacao.itemTipo !==
        "ferramenta"
    ) {

        return;

    }


    if (
        movimentacao.tipo !==
        "emprestimo"
    ) {

        return;

    }


    const ferramenta =
        ferramentas.find(
            item =>
                item.nome ===
                (
                    movimentacao.ferramenta ||
                    movimentacao.item
                )
        );


    const colaborador =
        colaboradores.find(
            item =>
                item.nome ===
                movimentacao.colaborador
        );


    if (ferramenta) {

        ferramenta.status =
            "Disponível";

        ferramenta.colaborador =
            "";

    }


    if (colaborador) {

        colaborador.ferramentas =
            Math.max(
                0,
                (colaborador.ferramentas || 0) - 1
            );

    }


    movimentacao.tipo =
        "devolucao";


    movimentacao.dataDevolucaoReal =
        new Date().toISOString();


    localStorage.setItem(
        STORAGE_FERRAMENTAS,
        JSON.stringify(ferramentas)
    );


    localStorage.setItem(
        STORAGE_COLABORADORES,
        JSON.stringify(colaboradores)
    );


    localStorage.setItem(
        STORAGE_MOVIMENTACOES,
        JSON.stringify(movimentacoes)
    );


    mostrarMovimentacoes();

}


/* =========================================================
   EXCLUIR MOVIMENTAÇÃO
========================================================= */

function excluirMovimentacao(index) {

    atualizarDados();


    const movimentacao =
        movimentacoes[index];


    if (!movimentacao) {

        return;

    }


    /* =====================================================
       SEGURANÇA PARA INSUMOS

       Não vamos devolver estoque automaticamente ao excluir.
       A exclusão apenas remove o registro histórico.
    ====================================================== */

    const confirmar =
        confirm(
            "Deseja realmente excluir esta movimentação?"
        );


    if (!confirmar) {

        return;

    }


    movimentacoes.splice(
        index,
        1
    );


    localStorage.setItem(
        STORAGE_MOVIMENTACOES,
        JSON.stringify(movimentacoes)
    );


    mostrarMovimentacoes();

}


/* =========================================================
   LIMPAR FORMULÁRIO
========================================================= */

function limparFormulario() {

    form.reset();

    tipoItem.value =
        "insumo";

    vincularOS.value =
        "nao";

    campoOS.hidden =
        true;

    quantidadeInsumo.value =
        "";

    atualizarTipoItem();

}


/* =========================================================
   FINALIZAR SALVAMENTO
========================================================= */

function fecharDepoisDeSalvar() {

    mostrarMovimentacoes();

    form.reset();

    tipoItem.value =
        "insumo";

    vincularOS.value =
        "nao";

    campoOS.hidden =
        true;

    atualizarTipoItem();

    modal.style.display =
        "none";

}


/* =========================================================
   PESQUISA
========================================================= */

pesquisa.addEventListener(
    "input",
    mostrarMovimentacoes
);


/* =========================================================
   FILTRO
========================================================= */

filtro.addEventListener(
    "change",
    mostrarMovimentacoes
);


/* =========================================================
   FORMATAÇÃO DE DATA
========================================================= */

function formatarDataHora(data) {

    if (!data) {

        return "-";

    }


    const dataObj =
        new Date(data);


    if (Number.isNaN(
        dataObj.getTime()
    )) {

        return data;

    }


    return dataObj.toLocaleString(
        "pt-BR"
    );

}


/* =========================================================
   SEGURANÇA HTML
========================================================= */

function escaparHTML(valor) {

    return String(valor ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

carregarInsumos();

carregarFerramentas();

carregarColaboradores();

carregarOS();

atualizarTipoItem();

mostrarMovimentacoes();
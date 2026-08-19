/* =========================================================
   ALMOXCONTROL
   MÓDULO: INSUMOS

   Responsabilidades:
   - Carregar insumos
   - Salvar insumos
   - Renderizar tabela
   - Atualizar indicadores
   - Pesquisar
   - Cadastrar pelo modal
   - Editar
   - Excluir
   - Visualizar
   - Preparar movimentações
   - Preparar integração com outros módulos
========================================================= */


/* =========================================================
   STORAGE
========================================================= */

const STORAGE_INSUMOS = "insumos";
const STORAGE_MOVIMENTACOES = "movimentacoes";
const STORAGE_COLABORADORES = "colaboradores";
const STORAGE_FERRAMENTAS = "ferramentas";


/* =========================================================
   ESTADO
========================================================= */

let insumos = [];

let filtroAtual = "";


/* =========================================================
   ELEMENTOS DO HTML
========================================================= */

const tabela = document.querySelector(".insumos-table tbody");

const campoBusca = document.querySelector(".search-box input");

const botaoNovoInsumo = document.querySelector(".btn-primary");

const botaoFiltro = document.querySelector(".btn-filter");

const modalInsumo = document.querySelector("#modalInsumo");

const fecharModal = document.querySelector("#fecharModal");

const cancelarModal = document.querySelector("#cancelarModal");

const formInsumo = document.querySelector("#formInsumo");


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    carregarInsumos();

    renderizarInsumos();

    atualizarDashboard();

    configurarEventos();

});


/* =========================================================
   CARREGAR INSUMOS
========================================================= */

function carregarInsumos() {

    const dados = localStorage.getItem(STORAGE_INSUMOS);


    if (!dados) {

        insumos = [];

        return;

    }


    try {

        const dadosConvertidos = JSON.parse(dados);


        if (Array.isArray(dadosConvertidos)) {

            insumos = dadosConvertidos;

        } else {

            console.warn(
                "O storage de insumos não possui um array válido."
            );

            insumos = [];

        }

    } catch (erro) {

        console.error(
            "Erro ao carregar insumos:",
            erro
        );

        insumos = [];

    }

}


/* =========================================================
   SALVAR INSUMOS
========================================================= */

function salvarInsumos() {

    localStorage.setItem(
        STORAGE_INSUMOS,
        JSON.stringify(insumos)
    );

}


/* =========================================================
   CONFIGURAR EVENTOS
========================================================= */

function configurarEventos() {


    /* =========================================
       NOVO INSUMO
    ========================================= */

    if (botaoNovoInsumo) {

        botaoNovoInsumo.addEventListener(
            "click",
            abrirModalInsumo
        );

    }


    /* =========================================
       FECHAR MODAL
    ========================================= */

    if (fecharModal) {

        fecharModal.addEventListener(
            "click",
            fecharModalInsumo
        );

    }


    /* =========================================
       CANCELAR
    ========================================= */

    if (cancelarModal) {

        cancelarModal.addEventListener(
            "click",
            fecharModalInsumo
        );

    }


    /* =========================================
       FORMULÁRIO
    ========================================= */

    if (formInsumo) {

        formInsumo.addEventListener(
            "submit",
            cadastrarInsumo
        );

    }


    /* =========================================
       CLICAR FORA DO MODAL
    ========================================= */

    if (modalInsumo) {

        modalInsumo.addEventListener(
            "click",
            (evento) => {

                if (
                    evento.target === modalInsumo
                ) {

                    fecharModalInsumo();

                }

            }
        );

    }


    /* =========================================
       ESC PARA FECHAR
    ========================================= */

    document.addEventListener(
        "keydown",
        (evento) => {

            if (
                evento.key === "Escape" &&
                modalInsumo?.classList.contains("active")
            ) {

                fecharModalInsumo();

            }

        }
    );


    /* =========================================
       PESQUISA
    ========================================= */

    if (campoBusca) {

        campoBusca.addEventListener(
            "input",
            (evento) => {

                filtroAtual = evento.target.value
                    .trim()
                    .toLowerCase();

                renderizarInsumos();

            }
        );

    }


    /* =========================================
       FILTRO
    ========================================= */

    if (botaoFiltro) {

        botaoFiltro.addEventListener(
            "click",
            abrirFiltros
        );

    }


    /* =========================================
       AÇÕES DA TABELA
    ========================================= */

    if (tabela) {

        tabela.addEventListener(
            "click",
            (evento) => {

                const botao =
                    evento.target.closest("button");


                if (!botao) {
                    return;
                }


                const linha =
                    botao.closest("tr");


                if (!linha) {
                    return;
                }


                const codigo =
                    linha.dataset.codigo;


                const acao =
                    botao.dataset.acao;


                if (!codigo || !acao) {
                    return;
                }


                switch (acao) {

                    case "visualizar":

                        visualizarInsumo(codigo);

                        break;


                    case "editar":

                        editarInsumo(codigo);

                        break;


                    case "movimentar":

                        movimentarInsumo(codigo);

                        break;


                    case "excluir":

                        excluirInsumo(codigo);

                        break;

                }

            }
        );

    }

}


/* =========================================================
   ABRIR MODAL
========================================================= */

function abrirModalInsumo() {

    if (!modalInsumo) {
        return;
    }


    modalInsumo.classList.add("active");


    const campoCodigo =
        document.querySelector("#codigoInsumo");


    if (campoCodigo) {

        setTimeout(() => {

            campoCodigo.focus();

        }, 100);

    }

}


/* =========================================================
   FECHAR MODAL
========================================================= */

function fecharModalInsumo() {

    if (!modalInsumo) {
        return;
    }


    modalInsumo.classList.remove("active");


    if (formInsumo) {

        formInsumo.reset();

    }

}


/* =========================================================
   CADASTRAR INSUMO
========================================================= */

function cadastrarInsumo(evento) {

    evento.preventDefault();


    /* =========================================
       PEGAR DADOS
    ========================================= */

    const codigo =
        document
            .querySelector("#codigoInsumo")
            .value
            .trim();


    const nome =
        document
            .querySelector("#nomeInsumo")
            .value
            .trim();


    const categoria =
        document
            .querySelector("#categoriaInsumo")
            .value;


    const unidade =
        document
            .querySelector("#unidadeInsumo")
            .value;


    const estoque =
        Number(
            document
                .querySelector("#estoqueInsumo")
                .value
        );


    const estoqueMinimo =
        Number(
            document
                .querySelector("#estoqueMinimoInsumo")
                .value
        );


    const valorUnitario =
        Number(
            document
                .querySelector("#valorInsumo")
                .value
        ) || 0;


    const localizacao =
        document
            .querySelector("#localizacaoInsumo")
            .value
            .trim();


    const fornecedor =
        document
            .querySelector("#fornecedorInsumo")
            .value
            .trim();


    /* =========================================
       VALIDAÇÕES
    ========================================= */

    if (!codigo) {

        alert("Informe o código do insumo.");

        return;

    }


    if (!nome) {

        alert("Informe o nome do insumo.");

        return;

    }


    if (!categoria) {

        alert("Selecione uma categoria.");

        return;

    }


    if (!unidade) {

        alert("Selecione uma unidade.");

        return;

    }


    if (estoque < 0 || Number.isNaN(estoque)) {

        alert("Informe um estoque inicial válido.");

        return;

    }


    if (
        estoqueMinimo < 0 ||
        Number.isNaN(estoqueMinimo)
    ) {

        alert("Informe um estoque mínimo válido.");

        return;

    }


    /* =========================================
       CÓDIGO DUPLICADO
    ========================================= */

    const codigoExiste =
        insumos.some((insumo) => {

            return (
                String(insumo.codigo)
                    .toLowerCase()
                    ===
                codigo.toLowerCase()
            );

        });


    if (codigoExiste) {

        alert(
            "Já existe um insumo com esse código."
        );

        return;

    }


    /* =========================================
       CRIAR OBJETO
    ========================================= */

    const novoInsumo = {

        id: gerarID(),

        codigo: codigo,

        nome: nome,

        categoria: categoria,

        estoque: estoque,

        estoqueMinimo: estoqueMinimo,

        unidade: unidade,

        localizacao:
            localizacao ||
            "Não informado",

        valorUnitario:
            valorUnitario >= 0
                ? valorUnitario
                : 0,

        fornecedor:
            fornecedor ||
            "Não informado",

        criadoEm:
            new Date().toISOString(),

        atualizadoEm:
            new Date().toISOString()

    };


    /* =========================================
       ADICIONAR
    ========================================= */

    insumos.push(novoInsumo);


    /* =========================================
       SALVAR
    ========================================= */

    salvarInsumos();


    /* =========================================
       ATUALIZAR INTERFACE
    ========================================= */

    renderizarInsumos();

    atualizarDashboard();


    /* =========================================
       FECHAR
    ========================================= */

    fecharModalInsumo();


    /* =========================================
       MENSAGEM
    ========================================= */

    alert(
        `Insumo "${novoInsumo.nome}" cadastrado com sucesso!`
    );

}


/* =========================================================
   RENDERIZAR INSUMOS
========================================================= */

function renderizarInsumos() {

    if (!tabela) {
        return;
    }


    tabela.innerHTML = "";


    const resultados =
        insumos.filter((insumo) => {

            if (!filtroAtual) {

                return true;

            }


            const textoPesquisa = `

                ${insumo.codigo || ""}

                ${insumo.nome || ""}

                ${insumo.categoria || ""}

                ${insumo.localizacao || ""}

                ${insumo.unidade || ""}

                ${insumo.fornecedor || ""}

            `.toLowerCase();


            return textoPesquisa
                .includes(filtroAtual);

        });


    if (resultados.length === 0) {

        mostrarTabelaVazia();

        return;

    }


    resultados.forEach((insumo) => {

        const linha =
            criarLinhaInsumo(insumo);


        tabela.appendChild(linha);

    });

}


/* =========================================================
   CRIAR LINHA
========================================================= */

function criarLinhaInsumo(insumo) {

    const linha =
        document.createElement("tr");


    linha.dataset.codigo =
        insumo.codigo;


    const status =
        calcularStatus(insumo);


    linha.innerHTML = `

        <td>
            ${escaparHTML(insumo.codigo)}
        </td>

        <td>
            ${escaparHTML(insumo.nome)}
        </td>

        <td>
            ${escaparHTML(insumo.categoria)}
        </td>

        <td>
            ${formatarNumero(insumo.estoque)}
        </td>

        <td>
            ${formatarNumero(insumo.estoqueMinimo)}
        </td>

        <td>
            ${escaparHTML(insumo.unidade)}
        </td>

        <td>
            ${escaparHTML(insumo.localizacao)}
        </td>

        <td>

            <span class="status ${status.classe}">
                ${status.texto}
            </span>

        </td>

        <td>

            <div class="table-actions">

                <button
                    type="button"
                    title="Visualizar"
                    data-acao="visualizar"
                >
                    <i class="fa-solid fa-eye"></i>
                </button>

                <button
                    type="button"
                    title="Editar"
                    data-acao="editar"
                >
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button
                    type="button"
                    title="Movimentar"
                    data-acao="movimentar"
                >
                    <i class="fa-solid fa-arrow-right-arrow-left"></i>
                </button>

            </div>

        </td>

    `;


    return linha;

}


/* =========================================================
   STATUS DO ESTOQUE
========================================================= */

function calcularStatus(insumo) {

    const estoque =
        Number(insumo.estoque) || 0;


    const minimo =
        Number(insumo.estoqueMinimo) || 0;


    if (estoque <= 0) {

        return {

            texto: "Sem estoque",

            classe: "status-danger"

        };

    }


    if (estoque <= minimo) {

        return {

            texto: "Estoque baixo",

            classe: "status-warning"

        };

    }


    return {

        texto: "Em estoque",

        classe: "status-ok"

    };

}


/* =========================================================
   ATUALIZAR CARDS
========================================================= */

function atualizarDashboard() {


    /* TOTAL */

    const total =
        insumos.length;


    /* ESTOQUE BAIXO */

    const estoqueBaixo =
        insumos.filter((insumo) => {

            const estoque =
                Number(insumo.estoque) || 0;


            const minimo =
                Number(insumo.estoqueMinimo) || 0;


            return (
                estoque > 0 &&
                estoque <= minimo
            );

        }).length;


    /* SEM ESTOQUE */

    const semEstoque =
        insumos.filter((insumo) => {

            return (
                Number(insumo.estoque) <= 0
            );

        }).length;


    /* VALOR TOTAL */

    const valorEstoque =
        insumos.reduce(
            (total, insumo) => {

                const quantidade =
                    Number(insumo.estoque) || 0;


                const valor =
                    Number(insumo.valorUnitario) || 0;


                return (
                    total +
                    quantidade * valor
                );

            },
            0
        );


    const cards =
        document.querySelectorAll(
            ".insumo-card strong"
        );


    if (cards.length >= 4) {

        cards[0].textContent =
            formatarNumero(total);


        cards[1].textContent =
            formatarNumero(estoqueBaixo);


        cards[2].textContent =
            formatarNumero(semEstoque);


        cards[3].textContent =
            formatarMoeda(valorEstoque);

    }

}


/* =========================================================
   VISUALIZAR
========================================================= */

function visualizarInsumo(codigo) {

    const insumo =
        encontrarInsumo(codigo);


    if (!insumo) {

        alert("Insumo não encontrado.");

        return;

    }


    alert(`

Código: ${insumo.codigo}

Nome: ${insumo.nome}

Categoria: ${insumo.categoria}

Estoque: ${insumo.estoque} ${insumo.unidade}

Estoque mínimo: ${insumo.estoqueMinimo}

Localização: ${insumo.localizacao}

Fornecedor: ${insumo.fornecedor}

Valor unitário: ${formatarMoeda(
        insumo.valorUnitario
    )}

    `);

}


/* =========================================================
   EDITAR
========================================================= */

function editarInsumo(codigo) {

    const insumo =
        encontrarInsumo(codigo);


    if (!insumo) {

        alert("Insumo não encontrado.");

        return;

    }


    const novoNome =
        prompt(
            "Nome do insumo:",
            insumo.nome
        );


    if (!novoNome) {
        return;
    }


    const novaCategoria =
        prompt(
            "Categoria:",
            insumo.categoria
        );


    if (!novaCategoria) {
        return;
    }


    const novoMinimo =
        Number(
            prompt(
                "Estoque mínimo:",
                insumo.estoqueMinimo
            )
        );


    const novaLocalizacao =
        prompt(
            "Localização:",
            insumo.localizacao
        );


    insumo.nome =
        novoNome.trim();


    insumo.categoria =
        novaCategoria.trim();


    if (!Number.isNaN(novoMinimo)) {

        insumo.estoqueMinimo =
            Math.max(0, novoMinimo);

    }


    if (novaLocalizacao) {

        insumo.localizacao =
            novaLocalizacao.trim();

    }


    insumo.atualizadoEm =
        new Date().toISOString();


    salvarInsumos();

    renderizarInsumos();

    atualizarDashboard();


    alert(
        "Insumo atualizado com sucesso."
    );

}


/* =========================================================
   EXCLUIR
========================================================= */

function excluirInsumo(codigo) {

    const insumo =
        encontrarInsumo(codigo);


    if (!insumo) {

        alert("Insumo não encontrado.");

        return;

    }


    const confirmar =
        confirm(
            `Deseja excluir o insumo "${insumo.nome}"?`
        );


    if (!confirmar) {
        return;
    }


    insumos =
        insumos.filter((item) => {

            return item.codigo !== codigo;

        });


    salvarInsumos();

    renderizarInsumos();

    atualizarDashboard();

}


/* =========================================================
   MOVIMENTAR
========================================================= */

function movimentarInsumo(codigo) {

    const insumo =
        encontrarInsumo(codigo);


    if (!insumo) {

        alert("Insumo não encontrado.");

        return;

    }


    /*
        FUTURA INTEGRAÇÃO

        Aqui vamos trabalhar com:

        localStorage["movimentacoes"]

        Tipos:

        - ENTRADA
        - SAÍDA
        - DEVOLUÇÃO
        - AJUSTE

        A movimentação irá atualizar
        automaticamente o estoque.
    */


    alert(
        `Movimentação de "${insumo.nome}" será implementada na próxima etapa.`
    );

}


/* =========================================================
   FILTRO
========================================================= */

function abrirFiltros() {

    alert(
        "Filtros avançados serão adicionados em uma próxima versão."
    );

}


/* =========================================================
   ENCONTRAR INSUMO
========================================================= */

function encontrarInsumo(codigo) {

    return insumos.find((insumo) => {

        return insumo.codigo === codigo;

    });

}


/* =========================================================
   TABELA VAZIA
========================================================= */

function mostrarTabelaVazia() {

    tabela.innerHTML = `

        <tr>

            <td
                colspan="9"
                style="
                    text-align: center;
                    padding: 40px;
                    color: #9ca3af;
                "
            >

                <i
                    class="fa-solid fa-box-open"
                    style="
                        font-size: 28px;
                        margin-bottom: 10px;
                        display: block;
                    "
                ></i>

                Nenhum insumo encontrado.

            </td>

        </tr>

    `;

}


/* =========================================================
   FORMATAR MOEDA
========================================================= */

function formatarMoeda(valor) {

    return Number(valor || 0).toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


/* =========================================================
   FORMATAR NÚMERO
========================================================= */

function formatarNumero(valor) {

    return Number(valor || 0).toLocaleString(
        "pt-BR"
    );

}


/* =========================================================
   ESCAPAR HTML
========================================================= */

function escaparHTML(valor) {

    if (
        valor === null ||
        valor === undefined
    ) {

        return "";

    }


    return String(valor)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   GERAR ID
========================================================= */

function gerarID() {

    return (
        Date.now().toString(36) +
        Math.random()
            .toString(36)
            .substring(2, 9)
    );

}


/* =========================================================
   FUNÇÕES PÚBLICAS
   PREPARADAS PARA FUTURA INTEGRAÇÃO
========================================================= */

/*
    Outros módulos poderão utilizar essas funções
    futuramente para consultar os insumos.
*/


function obterInsumos() {

    return [...insumos];

}


function obterInsumoPorCodigo(codigo) {

    return encontrarInsumo(codigo);

}


/* =========================================================
   FIM DO MÓDULO
========================================================= */
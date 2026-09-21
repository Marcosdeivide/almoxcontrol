/* =========================================================
ORDENS DE SERVIÇO
ALMOXCONTROL
========================================================= */

const STORAGE_KEY = "ordensServico";

// =========================================================
// ELEMENTOS
// =========================================================

const modal = document.getElementById("modalOS");

const btnNovaOS = document.getElementById("btnNovaOS");

const btnFecharModal =
document.getElementById("btnFecharModal");

const btnCancelar =
document.getElementById("btnCancelar");

const formOS =
document.getElementById("formOS");

const listaOS =
document.getElementById("listaOS");

const estadoVazio =
document.getElementById("estadoVazio");

const campoBusca =
document.getElementById("campoBusca");

const filtroStatus =
document.getElementById("filtroStatus");

const tituloModal =
document.getElementById("tituloModal");

// CAMPOS

const osId =
document.getElementById("osId");

const numeroOS =
document.getElementById("numeroOS");

const dataOS =
document.getElementById("dataOS");

const clienteOS =
document.getElementById("clienteOS");

const veiculoOS =
document.getElementById("veiculoOS");

const responsavelOS =
document.getElementById("responsavelOS");

const valorOS =
document.getElementById("valorOS");

const statusOS =
document.getElementById("statusOS");

const descricaoOS =
document.getElementById("descricaoOS");

// =========================================================
// DADOS
// =========================================================

let ordensServico =
JSON.parse(
localStorage.getItem(STORAGE_KEY)
) || [];

// =========================================================
// INICIALIZAÇÃO
// =========================================================

document.addEventListener(
"DOMContentLoaded",
() => {

    definirDataAtual();

    renderizarOS();

    atualizarCards();

}

);

// =========================================================
// DATA
// =========================================================

function definirDataAtual() {

const hoje = new Date();

const ano =
    hoje.getFullYear();

const mes =
    String(
        hoje.getMonth() + 1
    ).padStart(2, "0");

const dia =
    String(
        hoje.getDate()
    ).padStart(2, "0");

dataOS.value =
    `${ano}-${mes}-${dia}`;

}

// =========================================================
// ABRIR MODAL
// =========================================================

btnNovaOS.addEventListener(
"click",
() => {

    limparFormulario();

    tituloModal.textContent =
        "Nova Ordem de Serviço";

    modal.classList.add("show");

    numeroOS.focus();

}

);

// =========================================================
// FECHAR MODAL
// =========================================================

function fecharModal() {

modal.classList.remove("show");

limparFormulario();

}

btnFecharModal.addEventListener(
"click",
fecharModal
);

btnCancelar.addEventListener(
"click",
fecharModal
);

// CLICAR FORA

modal.addEventListener(
"click",
(event) => {

    if (event.target === modal) {

        fecharModal();

    }

}

);

// ESC

document.addEventListener(
"keydown",
(event) => {

    if (
        event.key === "Escape" &&
        modal.classList.contains("show")
    ) {

        fecharModal();

    }

}

);

// =========================================================
// SALVAR
// =========================================================

formOS.addEventListener(
"submit",
(event) => {

    event.preventDefault();


    const idAtual =
        osId.value;


    const dadosOS = {

        id: idAtual
            ? Number(idAtual)
            : Date.now(),

        numero:
            numeroOS.value.trim(),

        data:
            dataOS.value,

        cliente:
            clienteOS.value.trim(),

        veiculo:
            veiculoOS.value.trim(),

        responsavel:
            responsavelOS.value.trim(),

        valor:
            Number(valorOS.value) || 0,

        status:
            statusOS.value,

        descricao:
            descricaoOS.value.trim()

    };


    // EDITAR

    if (idAtual) {

        ordensServico =
            ordensServico.map(
                (os) => {

                    if (
                        os.id ===
                        Number(idAtual)
                    ) {

                        return dadosOS;

                    }

                    return os;

                }
            );

    }


    // NOVA

    else {

        ordensServico.push(
            dadosOS
        );

    }


    salvarDados();

    renderizarOS();

    atualizarCards();

    fecharModal();

}

);

// =========================================================
// LOCAL STORAGE
// =========================================================

function salvarDados() {

localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(
        ordensServico
    )
);

}

// =========================================================
// RENDERIZAR
// =========================================================

function renderizarOS() {

const busca =
    campoBusca.value
        .toLowerCase()
        .trim();

const statusSelecionado =
    filtroStatus.value;


const resultados =
    ordensServico.filter(
        (os) => {

            const correspondeBusca =

                os.numero
                    .toLowerCase()
                    .includes(busca)

                ||

                os.cliente
                    .toLowerCase()
                    .includes(busca)

                ||

                os.veiculo
                    .toLowerCase()
                    .includes(busca)

                ||

                os.responsavel
                    .toLowerCase()
                    .includes(busca);


            const correspondeStatus =

                statusSelecionado ===
                "todos"

                ||

                os.status ===
                statusSelecionado;


            return (
                correspondeBusca &&
                correspondeStatus
            );

        }
    );


listaOS.innerHTML = "";


if (
    resultados.length === 0
) {

    estadoVazio.classList.add(
        "show"
    );

    return;

}


estadoVazio.classList.remove(
    "show"
);


resultados
    .sort(
        (a, b) =>
            b.id - a.id
    )
    .forEach(
        (os) => {

            const linha =
                document.createElement(
                    "tr"
                );


            linha.innerHTML = `

                <td>
                    <strong>
                        ${escaparHTML(os.numero)}
                    </strong>
                </td>

                <td>
                    ${escaparHTML(os.cliente)}
                </td>

                <td>
                    ${escaparHTML(os.veiculo)}
                </td>

                <td>
                    ${escaparHTML(os.responsavel)}
                </td>

                <td>
                    ${formatarData(os.data)}
                </td>

                <td>
                    ${formatarMoeda(os.valor)}
                </td>

                <td>
                    ${criarStatus(os.status)}
                </td>

                <td>

                    <div class="os-acoes">

                        <button
                            type="button"
                            class="os-acao editar"
                            title="Editar"
                            onclick="editarOS(${os.id})"
                        >

                            <i class="fa-solid fa-pen"></i>

                        </button>


                        <button
                            type="button"
                            class="os-acao excluir"
                            title="Excluir"
                            onclick="excluirOS(${os.id})"
                        >

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </div>

                </td>

            `;


            listaOS.appendChild(
                linha
            );

        }
    );

}

// =========================================================
// STATUS
// =========================================================

function criarStatus(status) {

const nomes = {

    aberta:
        "Aberta",

    andamento:
        "Em andamento",

    concluida:
        "Concluída",

    cancelada:
        "Cancelada"

};


return `

    <span class="status status-${status}">

        ${nomes[status] || status}

    </span>

`;

}

// =========================================================
// EDITAR
// =========================================================

function editarOS(id) {

const os =
    ordensServico.find(
        (item) =>
            item.id === id
    );


if (!os) {

    return;

}


tituloModal.textContent =
    "Editar Ordem de Serviço";


osId.value =
    os.id;

numeroOS.value =
    os.numero;

dataOS.value =
    os.data;

clienteOS.value =
    os.cliente;

veiculoOS.value =
    os.veiculo;

responsavelOS.value =
    os.responsavel;

valorOS.value =
    os.valor;

statusOS.value =
    os.status;

descricaoOS.value =
    os.descricao || "";


modal.classList.add(
    "show"
);

}

// =========================================================
// EXCLUIR
// =========================================================

function excluirOS(id) {

const os =
    ordensServico.find(
        (item) =>
            item.id === id
    );


if (!os) {

    return;

}


const confirmar =
    confirm(
        `Deseja realmente excluir a OS ${os.numero}?`
    );


if (!confirmar) {

    return;

}


ordensServico =
    ordensServico.filter(
        (item) =>
            item.id !== id
    );


salvarDados();

renderizarOS();

atualizarCards();

}

// =========================================================
// CARDS
// =========================================================

function atualizarCards() {

const total =
    ordensServico.length;


const abertas =
    ordensServico.filter(
        (os) =>
            os.status === "aberta"
    ).length;


const andamento =
    ordensServico.filter(
        (os) =>
            os.status === "andamento"
    ).length;


const concluidas =
    ordensServico.filter(
        (os) =>
            os.status === "concluida"
    ).length;


document.getElementById(
    "totalOS"
).textContent = total;


document.getElementById(
    "osAbertas"
).textContent = abertas;


document.getElementById(
    "osAndamento"
).textContent = andamento;


document.getElementById(
    "osConcluidas"
).textContent = concluidas;

}

// =========================================================
// LIMPAR FORMULÁRIO
// =========================================================

function limparFormulario() {

formOS.reset();

osId.value = "";

statusOS.value =
    "aberta";

definirDataAtual();

}

// =========================================================
// DATA
// =========================================================

function formatarData(data) {

if (!data) {

    return "-";

}


const partes =
    data.split("-");


if (
    partes.length !== 3
) {

    return data;

}


return `
    ${partes[2]}/${partes[1]}/${partes[0]}
`;

}

// =========================================================
// MOEDA
// =========================================================

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

// =========================================================
// SEGURANÇA
// =========================================================

function escaparHTML(valor) {

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

// =========================================================
// BUSCA
// =========================================================

campoBusca.addEventListener(
"input",
renderizarOS
);

// =========================================================
// FILTRO
// =========================================================

filtroStatus.addEventListener(
"change",
renderizarOS
);
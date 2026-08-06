// ===============================
// ELEMENTOS
// ===============================

const btnNovo = document.getElementById("btnNovoColaborador");

const modal = document.getElementById("modalColaborador");

const fechar = document.getElementById("fecharModalColaborador");

const form = document.getElementById("formColaborador");

const lista = document.getElementById("listaColaboradores");

const total = document.getElementById("totalDeColaboradores");

const filtro = document.getElementById("filtroColaboradores");

// INPUTS

const nome = document.getElementById("nomeColaborador");

const matricula = document.getElementById("matriculaColaborador");

const setor = document.getElementById("setorColaborador");

const telefone = document.getElementById("telefoneColaborador");

const status = document.getElementById("statusColaborador");

const observacao = document.getElementById("observacaoColaborador");

const pesquisa = document.getElementById("pesquisaColaborador");

// ===============================
// DADOS
// ===============================

let colaboradores = JSON.parse(
    localStorage.getItem("colaboradores")
) || [];

let colaboradorEditando = null;

// ===============================
// MODAL
// ===============================

btnNovo.addEventListener("click", () => {

    colaboradorEditando = null;

    form.reset();

    modal.style.display = "flex";

});

fechar.addEventListener("click", () => {

    modal.style.display = "none";

});

window.addEventListener("click", (e) => {

    if (e.target === modal) {

        modal.style.display = "none";

    }

});

// ===============================
// SALVAR
// ===============================

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const dados = {

        nome: nome.value,

        matricula: matricula.value,

        setor: setor.value,

        telefone: telefone.value,

        status: status.value,

        observacao: observacao.value

    };

    const matriculaExiste = colaboradores.some((colaborador, index) => {

    return colaborador.matricula === matricula.value &&
           index !== colaboradorEditando;

});

if (matriculaExiste) {

    alert("Já existe um colaborador com essa matrícula.");

    return;

}

    if (colaboradorEditando !== null) {

        colaboradores[colaboradorEditando] = {

            ...colaboradores[colaboradorEditando],

            ...dados

        };

    } else {

        dados.ferramentas = 0;

        colaboradores.push(dados);

    }

    localStorage.setItem(

        "colaboradores",

        JSON.stringify(colaboradores)

    );

    mostrarColaboradores();

    form.reset();

    colaboradorEditando = null;

    modal.style.display = "none";

});

// ===============================
// LISTAR
// ===============================

function mostrarColaboradores() {

    lista.innerHTML = "";

    const textoPesquisa = pesquisa.value
        .toLowerCase()
        .trim();

    const setorSelecionado = filtro.value;

    let totalExibidos = 0;

    colaboradores.forEach((item, index) => {

        // Pesquisa por nome
        if (!item.nome.toLowerCase().includes(textoPesquisa)) {

            return;

        }

        // Filtro por setor
        if (
            setorSelecionado !== "Todos os setores" &&
            item.setor !== setorSelecionado
        ) {

            return;

        }

        totalExibidos++;

        lista.innerHTML += `

        <tr>

            <td>${item.nome}</td>

            <td>${item.matricula}</td>

            <td>${item.setor}</td>

            <td>${item.telefone}</td>

            <td>${item.ferramentas || 0}</td>

            <td>

                <span class="status ${item.status}">

                    ${item.status}

                </span>

            </td>

            <td class="acoes">

                <button
                    class="btn-editar"
                    onclick="editarColaborador(${index})"
                >

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button
                    class="btn-excluir"
                    onclick="excluirColaborador(${index})"
                >

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

    total.innerHTML = totalExibidos;

}

// ===============================
// PESQUISA
// ===============================

pesquisa.addEventListener("input", () => {

    mostrarColaboradores();

});

filtro.addEventListener("change", () => {

    mostrarColaboradores();

});

// ===============================
// EXCLUIR
// ===============================

function excluirColaborador(index) {

    if (confirm("Deseja excluir este colaborador?")) {

        colaboradores.splice(index, 1);

        localStorage.setItem(

            "colaboradores",

            JSON.stringify(colaboradores)

        );

        mostrarColaboradores();

    }

}

// ===============================
// EDITAR
// ===============================

function editarColaborador(index) {

    const item = colaboradores[index];

    nome.value = item.nome;

    matricula.value = item.matricula;

    setor.value = item.setor;

    telefone.value = item.telefone;

    status.value = item.status;

    observacao.value = item.observacao;

    colaboradorEditando = index;

    modal.style.display = "flex";

}

// ===============================
// INICIAR
// ===============================

mostrarColaboradores();
// ===============================
// ELEMENTOS
// ===============================

const btnNovo = document.getElementById("btnNovoColaborador");

const modal = document.getElementById("modalColaborador");

const fechar = document.getElementById("fecharModalColaborador");

const form = document.getElementById("formColaborador");

const lista = document.getElementById("listaColaboradores");

const total = document.getElementById("totalDeColaboradores");


// INPUTS

const nome = document.getElementById("nomeColaborador");

const matricula = document.getElementById("matriculaColaborador");

const setor = document.getElementById("setorColaborador");

const telefone = document.getElementById("telefoneColaborador");

const status = document.getElementById("statusColaborador");

const observacao = document.getElementById("observacaoColaborador");


// ===============================
// DADOS
// ===============================

let colaboradores = JSON.parse(
    localStorage.getItem("colaboradores")
) || [];


// controla edição
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

    if(e.target === modal){

        modal.style.display = "none";

    }

});


// ===============================
// CADASTRAR / SALVAR EDIÇÃO
// ===============================

form.addEventListener("submit", (e)=>{

    e.preventDefault();


    let dados = {

        nome: nome.value,

        matricula: matricula.value,

        setor: setor.value,

        telefone: telefone.value,

        status: status.value,

        observacao: observacao.value

    };


    // EDITAR EXISTENTE

    if(colaboradorEditando !== null){


        colaboradores[colaboradorEditando] = {

            ...colaboradores[colaboradorEditando],

            ...dados

        };


    }


    // NOVO COLABORADOR

    else{


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

function mostrarColaboradores(){


    lista.innerHTML = "";


    colaboradores.forEach((item,index)=>{


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


    total.innerHTML = colaboradores.length;


}


// ===============================
// EXCLUIR
// ===============================

function excluirColaborador(index){


    if(confirm("Deseja excluir este colaborador?")){


        colaboradores.splice(index,1);


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

function editarColaborador(index){


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
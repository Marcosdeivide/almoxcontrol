// ===============================
// PEGAR ELEMENTOS DO HTML
// ===============================

const totalFerramentas = document.getElementById("ferramentas");
const disponivel = document.getElementById("disponivel");
const uso = document.getElementById("uso");
const manutencao = document.getElementById("manutencao");
const colaboradores = document.getElementById("colaboradores");

const listaUltimasMovimentacoes = document.getElementById(
  "listaUltimasMovimentacoes"
);


// ===============================
// PEGAR DADOS DO LOCALSTORAGE
// ===============================

let ferramentas = JSON.parse(
  localStorage.getItem("ferramentas")
) || [];


let movimentacoes = JSON.parse(
  localStorage.getItem("movimentacoes")
) || [];



// ===============================
// ATUALIZAR CARDS
// ===============================

function atualizarCards(){

    totalFerramentas.innerHTML = ferramentas.length;


    let qtdDisponivel = 0;
    let qtdUso = 0;
    let qtdManutencao = 0;


    ferramentas.forEach((item) => {

    if (item.status === "disponivel") {
        qtdDisponivel++;
    }

    if (item.status === "em-uso") {
        qtdUso++;
    }

    if (item.status === "manutencao") {
        qtdManutencao++;
    }

});


    disponivel.innerHTML = qtdDisponivel;

    uso.innerHTML = qtdUso;

    manutencao.innerHTML = qtdManutencao;



    // contar colaboradores

    let nomes = [];


    movimentacoes.forEach((item)=>{

        if(!nomes.includes(item.colaborador)){

            nomes.push(item.colaborador);

        }

    });


    colaboradores.innerHTML = nomes.length;

}



// ===============================
// MOSTRAR ÚLTIMAS MOVIMENTAÇÕES
// ===============================

function mostrarUltimas(){


    listaUltimasMovimentacoes.innerHTML = "";


    let ultimas = movimentacoes
        .slice(-3)
        .reverse();



    ultimas.forEach((item)=>{


        listaUltimasMovimentacoes.innerHTML += `

        <div class="movimento">

            <div>

                <h3>
                    ${item.ferramenta}
                </h3>


                <p>
                    ${item.colaborador}
                </p>

            </div>


            <span>
                ${item.tipo}
            </span>


        </div>

        `;


    });


}



// ===============================
// INICIAR DASHBOARD
// ===============================

atualizarCards();

mostrarUltimas();

console.log(verificarNotificacoes());

// ======================================
// SISTEMA VISUAL DE NOTIFICAÇÕES
// ======================================

const btnNotificacao =
    document.getElementById("btnNotificacao");

const contadorNotificacao =
    document.getElementById("contadorNotificacao");

const painelNotificacao =
    document.getElementById("painelNotificacao");

const listaNotificacoes =
    document.getElementById("listaNotificacoes");


// ======================================
// MOSTRAR NOTIFICAÇÕES
// ======================================

function mostrarNotificacoes() {

    const notificacoes = verificarNotificacoes();

    contadorNotificacao.innerHTML = notificacoes.length;

    listaNotificacoes.innerHTML = "";


    if (notificacoes.length === 0) {

        listaNotificacoes.innerHTML = `

            <div class="sem-notificacao">

                <i class="fa-solid fa-circle-check"></i>

                <p>Nenhuma notificação.</p>

            </div>

        `;

        return;
    }


    notificacoes.forEach((item) => {

        listaNotificacoes.innerHTML += `

            <div class="notificacao ${item.tipo}">

                <h4>

                    ${item.tipo === "atrasada"
                        ? "🔴"
                        : "🟡"
                    }

                    ${item.titulo}

                </h4>

                <p>
                    ${item.mensagem}
                </p>

                <p>
                    Data: ${item.data}
                </p>

            </div>

        `;

    });

}


// ======================================
// ABRIR / FECHAR PAINEL
// ======================================

btnNotificacao.addEventListener("click", () => {

    painelNotificacao.classList.toggle("aberto");

});


// ======================================
// INICIAR NOTIFICAÇÕES
// ======================================

mostrarNotificacoes();
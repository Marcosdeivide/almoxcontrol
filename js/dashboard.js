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


    ferramentas.forEach((item)=>{

        if(item.status === "disponivel"){
            qtdDisponivel++;
        }


        if(item.status === "uso"){
            qtdUso++;
        }


        if(item.status === "manutencao"){
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
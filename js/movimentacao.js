// ELEMENTOS

const btnNova = document.getElementById("btnNovaMovimentacao");

const modal = document.getElementById("modalMovimentacao");

const fechar = document.getElementById("fecharModalMovimentacao");

const form = document.getElementById("formMovimentacao");

const lista = document.getElementById("listaMovimentacoes");

const total = document.getElementById("totalMovimentacoes");

const selectColaborador =
    document.getElementById("colaboradorMovimentacao");

const selectFerramenta = document.getElementById(
    "ferramentaMovimentacao"
);



// INPUTS

const colaborador = document.getElementById(
    "colaboradorMovimentacao"
);

const tipo = document.getElementById(
    "tipoMovimentacao"
);

const devolucao = document.getElementById(
    "dataDevolucao"
);

const observacao = document.getElementById(
    "observacaoMovimentacao"
);



// PEGAR DADOS

let ferramentas = JSON.parse(
    localStorage.getItem("ferramentas")
) || [];


let movimentacoes = JSON.parse(
    localStorage.getItem("movimentacoes")
) || [];

let colaboradores = JSON.parse(
    localStorage.getItem("colaboradores")
) || [];




// ABRIR MODAL

btnNova.addEventListener("click",()=>{

    modal.style.display = "flex";

    carregarFerramentas();

});

btnNova.addEventListener("click",()=>{

    modal.style.display = "flex";

    carregarFerramentas();

    carregarColaboradores();

});




// FECHAR MODAL

fechar.addEventListener("click",()=>{

    modal.style.display = "none";

});





// CARREGAR FERRAMENTAS NO SELECT

function carregarFerramentas(){


    selectFerramenta.innerHTML = "";


    ferramentas.forEach((item)=>{


        selectFerramenta.innerHTML += `

        <option value="${item.nome}">
            ${item.nome}
        </option>

        `;


    });


}

function carregarColaboradores(){

    selectColaborador.innerHTML = "";

    colaboradores.forEach((item)=>{

        selectColaborador.innerHTML += `
            <option value="${item.nome}">
                ${item.nome}
            </option>
        `;

    });

}





// SALVAR MOVIMENTAÇÃO


form.addEventListener("submit",(e)=>{


    e.preventDefault();



    let novaMovimentacao = {


        ferramenta:
        selectFerramenta.value,


        colaborador:
        selectColaborador.value,


        tipo:
        tipo.value,


        devolucao:
        devolucao.value,


        observacao:
        observacao.value,


        data:
        new Date().toLocaleString()


    };



    movimentacoes.push(novaMovimentacao);



    localStorage.setItem(
        "movimentacoes",
        JSON.stringify(movimentacoes)
    );



    mostrarMovimentacoes();



    form.reset();



    modal.style.display="none";


});






// MOSTRAR NA TABELA


function mostrarMovimentacoes(){


    lista.innerHTML="";


    movimentacoes.forEach((item,index)=>{


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

        <span class="status uso">

        Em uso

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


function excluirMovimentacao(index){


    movimentacoes.splice(index,1);



    localStorage.setItem(
        "movimentacoes",
        JSON.stringify(movimentacoes)
    );



    mostrarMovimentacoes();


}





// DEVOLVER FERRAMENTA

function devolverFerramenta(index){


    movimentacoes[index].tipo = "devolucao";


    localStorage.setItem(
        "movimentacoes",
        JSON.stringify(movimentacoes)
    );


    mostrarMovimentacoes();


}
// INICIAR

mostrarMovimentacoes();
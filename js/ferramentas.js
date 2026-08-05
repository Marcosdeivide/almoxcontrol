// PEGANDO ELEMENTOS

const btnAdicionar = document.getElementById("btnAdicionarFerramenta");

const modal = document.getElementById("modalFerramenta");

const fecharModal = document.getElementById("fecharModal");

const form = document.getElementById("formFerramenta");

const lista = document.getElementById("listaFerramentas");

const total = document.getElementById("totalFerramentas");

const pesquisa = document.getElementById("pesquisaFerramenta");


// BANCO

let ferramentas = JSON.parse(localStorage.getItem("ferramentas")) || [];

let editarId = null;



// ABRIR MODAL NOVO

btnAdicionar.addEventListener("click",()=>{

    editarId = null;

    form.reset();

    modal.style.display="flex";

});



// FECHAR MODAL

fecharModal.addEventListener("click",()=>{

    modal.style.display="none";

});




// SALVAR

form.addEventListener("submit",(e)=>{

    e.preventDefault();


    let ferramenta = {

        nome: document.getElementById("nomeFerramenta").value,

        codigo: document.getElementById("codigoFerramenta").value,

        categoria: document.getElementById("categoriaFerramenta").value,

        status: document.getElementById("statusFerramenta").value

    };



    // EDITAR

    if(editarId !== null){

        ferramentas[editarId] = ferramenta;

        editarId = null;


    }

    // NOVO

    else{

        ferramentas.push(ferramenta);

    }



    salvar();

    mostrar();


    form.reset();

    modal.style.display="none";


});




// MOSTRAR TABELA

function mostrar(){


    lista.innerHTML="";


    ferramentas.forEach((item,index)=>{


        lista.innerHTML += `


        <tr>

            <td>${item.codigo}</td>

            <td>${item.nome}</td>

            <td>${item.categoria}</td>


            <td>

                <span class="status ${item.status}">

                ${item.status}

                </span>

            </td>


            <td class="acoes">


                <button onclick="editarFerramenta(${index})">

                    <i class="fa-solid fa-pen"></i>

                </button>



                <button onclick="excluirFerramenta(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>


            </td>


        </tr>


        `;


    });


    total.innerHTML = ferramentas.length;


}





// EDITAR

function editarFerramenta(index){


    let ferramenta = ferramentas[index];


    editarId = index;


    modal.style.display="flex";


    document.getElementById("nomeFerramenta").value = ferramenta.nome;


    document.getElementById("codigoFerramenta").value = ferramenta.codigo;


    document.getElementById("categoriaFerramenta").value = ferramenta.categoria;


    document.getElementById("statusFerramenta").value = ferramenta.status;


}




// EXCLUIR

function excluirFerramenta(index){


    let confirmar = confirm("Excluir ferramenta?");


    if(confirmar){


        ferramentas.splice(index,1);


        salvar();


        mostrar();

    }


}




// PESQUISA

pesquisa.addEventListener("input",()=>{


    let texto = pesquisa.value.toLowerCase();


    document.querySelectorAll("#listaFerramentas tr")
    .forEach((linha)=>{


        if(linha.textContent.toLowerCase().includes(texto)){

            linha.style.display="";

        }else{

            linha.style.display="none";

        }


    });


});




// SALVAR

function salvar(){

    localStorage.setItem(
        "ferramentas",
        JSON.stringify(ferramentas)
    );

}



// INICIAR

mostrar();
/**
 * ==========================================
 * AlmoxControl
 * Arquivo: app.js
 * Inicialização do sistema
 * ==========================================
 */

const App = {

    iniciar() {

        console.clear();

        console.log("===============================");
        console.log(CONFIG.sistema.nome);
        console.log("Versão:", CONFIG.sistema.versao);
        console.log("===============================");

        // Inicia o LocalStorage
        Storage.iniciar();

        // Descobre qual página está aberta
        this.identificarPagina();

    },

    identificarPagina() {

        const pagina = window.location.pathname.split("/").pop();

        switch (pagina) {

            case "":
            case "index.html":

                console.log("Dashboard carregado");

                if (typeof Dashboard !== "undefined") {
                    Dashboard.iniciar();
                }

                break;

            case "ferramentas.html":

                console.log("Página Ferramentas");

                if (typeof Ferramentas !== "undefined") {
                    Ferramentas.iniciar();
                }

                break;

            case "movimentacao.html":

                console.log("Página Movimentação");

                if (typeof Movimentacao !== "undefined") {
                    Movimentacao.iniciar();
                }

                break;

            default:

                console.log("Página não reconhecida.");

        }

    }

};

// Espera o HTML carregar completamente
document.addEventListener("DOMContentLoaded", () => {

    App.iniciar();

});
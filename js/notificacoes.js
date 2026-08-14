// ======================================
// SISTEMA DE NOTIFICAÇÕES
// ======================================

function verificarNotificacoes() {

    let movimentacoes =
        JSON.parse(localStorage.getItem("movimentacoes")) || [];

    let notificacoes = [];

    const hoje = new Date();

    // ======================================
    // VERIFICAR DEVOLUÇÕES
    // ======================================

    movimentacoes.forEach((item) => {

        // Só interessa empréstimo
        if (item.tipo !== "emprestimo") {
            return;
        }

        // Se não tiver data de devolução, ignora
        if (!item.devolucao) {
            return;
        }

        // Data da devolução
        const dataDevolucao = new Date(item.devolucao + "T23:59:59");

        // ======================================
        // DEVOLUÇÃO ATRASADA
        // ======================================

        if (dataDevolucao < hoje) {

            notificacoes.push({

                tipo: "atrasada",

                titulo: "Devolução atrasada",

                mensagem:
                    `${item.ferramenta} - ${item.colaborador}`,

                data: item.devolucao

            });

        }

        // ======================================
        // DEVOLUÇÃO HOJE
        // ======================================

        else {

            const hojeString =
                hoje.toISOString().split("T")[0];

            if (item.devolucao === hojeString) {

                notificacoes.push({

                    tipo: "hoje",

                    titulo: "Devolução vence hoje",

                    mensagem:
                        `${item.ferramenta} - ${item.colaborador}`,

                    data: item.devolucao

                });

            }

        }

    });

    return notificacoes;
}
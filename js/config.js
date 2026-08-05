/**
 * ==========================================
 * AlmoxControl - Configurações Gerais
 * Arquivo: config.js
 * ==========================================
 */

const CONFIG = {

    // Informações do sistema
    sistema: {
        nome: "AlmoxControl",
        versao: "1.0.0",
        desenvolvedor: "Marcos Deivide"
    },

    // Chaves utilizadas no LocalStorage
    storage: {
        ferramentas: "almox_ferramentas",
        movimentacoes: "almox_movimentacoes",
        funcionarios: "almox_funcionarios",
        configuracoes: "almox_configuracoes"
    },

    // Status possíveis das ferramentas
    status: {
        DISPONIVEL: "Disponível",
        EM_USO: "Em Uso",
        MANUTENCAO: "Manutenção"
    },

    // Tipos de movimentação
    movimentacao: {
        RETIRADA: "Retirada",
        DEVOLUCAO: "Devolução"
    },

    // Mensagens padrão
    mensagens: {
        cadastroSucesso: "Ferramenta cadastrada com sucesso!",
        edicaoSucesso: "Ferramenta atualizada com sucesso!",
        exclusaoSucesso: "Ferramenta removida com sucesso!",
        retiradaSucesso: "Ferramenta retirada com sucesso!",
        devolucaoSucesso: "Ferramenta devolvida com sucesso!",
        erro: "Ocorreu um erro inesperado."
    }

};

// Evita alterações acidentais na configuração
Object.freeze(CONFIG);
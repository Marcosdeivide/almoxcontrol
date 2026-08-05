/**
 * ==========================================
 * AlmoxControl
 * Arquivo: storage.js
 * Responsável por toda comunicação com o
 * LocalStorage
 * ==========================================
 */

const Storage = {

    // ===============================
    // Inicialização
    // ===============================

    iniciar() {

        if (!localStorage.getItem(CONFIG.storage.ferramentas)) {
            localStorage.setItem(
                CONFIG.storage.ferramentas,
                JSON.stringify([])
            );
        }

        if (!localStorage.getItem(CONFIG.storage.movimentacoes)) {
            localStorage.setItem(
                CONFIG.storage.movimentacoes,
                JSON.stringify([])
            );
        }

        if (!localStorage.getItem(CONFIG.storage.funcionarios)) {
            localStorage.setItem(
                CONFIG.storage.funcionarios,
                JSON.stringify([])
            );
        }

        if (!localStorage.getItem(CONFIG.storage.configuracoes)) {
            localStorage.setItem(
                CONFIG.storage.configuracoes,
                JSON.stringify({})
            );
        }

        console.log("✅ LocalStorage iniciado.");
    },

    // ===============================
    // FERRAMENTAS
    // ===============================

    getFerramentas() {
        return JSON.parse(
            localStorage.getItem(CONFIG.storage.ferramentas)
        ) || [];
    },

    salvarFerramentas(lista) {
        localStorage.setItem(
            CONFIG.storage.ferramentas,
            JSON.stringify(lista)
        );
    },

    adicionarFerramenta(ferramenta) {

        const ferramentas = this.getFerramentas();

        ferramentas.push(ferramenta);

        this.salvarFerramentas(ferramentas);

    },

    removerFerramenta(id) {

        const ferramentas = this
            .getFerramentas()
            .filter(item => item.id !== id);

        this.salvarFerramentas(ferramentas);

    },

    atualizarFerramenta(id, novosDados) {

        const ferramentas = this.getFerramentas();

        const indice = ferramentas.findIndex(f => f.id === id);

        if (indice !== -1) {

            ferramentas[indice] = {
                ...ferramentas[indice],
                ...novosDados
            };

            this.salvarFerramentas(ferramentas);

        }

    },

    buscarFerramenta(id) {

        return this
            .getFerramentas()
            .find(item => item.id === id);

    },

    // ===============================
    // MOVIMENTAÇÕES
    // ===============================

    getMovimentacoes() {

        return JSON.parse(
            localStorage.getItem(CONFIG.storage.movimentacoes)
        ) || [];

    },

    salvarMovimentacoes(lista) {

        localStorage.setItem(
            CONFIG.storage.movimentacoes,
            JSON.stringify(lista)
        );

    },

    adicionarMovimentacao(movimentacao) {

        const lista = this.getMovimentacoes();

        lista.unshift(movimentacao);

        this.salvarMovimentacoes(lista);

    },

    // ===============================
    // FUNCIONÁRIOS
    // ===============================

    getFuncionarios() {

        return JSON.parse(
            localStorage.getItem(CONFIG.storage.funcionarios)
        ) || [];

    },

    salvarFuncionarios(lista) {

        localStorage.setItem(
            CONFIG.storage.funcionarios,
            JSON.stringify(lista)
        );

    },

    adicionarFuncionario(funcionario) {

        const lista = this.getFuncionarios();

        lista.push(funcionario);

        this.salvarFuncionarios(lista);

    },

    // ===============================
    // CONFIGURAÇÕES
    // ===============================

    getConfiguracoes() {

        return JSON.parse(
            localStorage.getItem(CONFIG.storage.configuracoes)
        ) || {};

    },

    salvarConfiguracoes(config) {

        localStorage.setItem(
            CONFIG.storage.configuracoes,
            JSON.stringify(config)
        );

    },

    // ===============================
    // BACKUP
    // ===============================

    exportar() {

        return {

            versao: CONFIG.sistema.versao,

            dataBackup: new Date(),

            ferramentas: this.getFerramentas(),

            movimentacoes: this.getMovimentacoes(),

            funcionarios: this.getFuncionarios(),

            configuracoes: this.getConfiguracoes()

        };

    },

    importar(dados) {

        if (dados.ferramentas)
            this.salvarFerramentas(dados.ferramentas);

        if (dados.movimentacoes)
            this.salvarMovimentacoes(dados.movimentacoes);

        if (dados.funcionarios)
            this.salvarFuncionarios(dados.funcionarios);

        if (dados.configuracoes)
            this.salvarConfiguracoes(dados.configuracoes);

    },

    // ===============================
    // LIMPAR TUDO
    // ===============================

    limparSistema() {

        localStorage.removeItem(CONFIG.storage.ferramentas);

        localStorage.removeItem(CONFIG.storage.movimentacoes);

        localStorage.removeItem(CONFIG.storage.funcionarios);

        localStorage.removeItem(CONFIG.storage.configuracoes);

        this.iniciar();

    }

};
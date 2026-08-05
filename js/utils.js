/**
 * ==========================================
 * AlmoxControl
 * Arquivo: utils.js
 * Funções auxiliares do sistema
 * ==========================================
 */

const Utils = {

    /**
     * Gera um ID único
     */
    gerarId() {
        return Date.now() + Math.floor(Math.random() * 1000);
    },

    /**
     * Gera um código automático
     * Ex: FER0001
     */
    gerarCodigo() {

        const ferramentas = Storage.getFerramentas();

        const numero = ferramentas.length + 1;

        return "FER" + numero.toString().padStart(4, "0");

    },

    /**
     * Retorna a data atual
     */
    dataAtual() {

        return new Date().toLocaleDateString("pt-BR");

    },

    /**
     * Retorna a hora atual
     */
    horaAtual() {

        return new Date().toLocaleTimeString("pt-BR");

    },

    /**
     * Retorna data e hora
     */
    dataHoraAtual() {

        return new Date().toLocaleString("pt-BR");

    },

    /**
     * Formata números
     */
    formatarNumero(valor) {

        return Number(valor).toLocaleString("pt-BR");

    },

    /**
     * Mostrar mensagem
     */
    sucesso(msg) {

        alert(msg);

    },

    erro(msg) {

        alert(msg);

    },

    /**
     * Confirmação
     */
    confirmar(msg) {

        return confirm(msg);

    },

    /**
     * Campo vazio?
     */
    vazio(valor) {

        return valor === "" ||
               valor === null ||
               valor === undefined;

    },

    /**
     * Procura ferramenta pelo código
     */
    procurarCodigo(codigo) {

        return Storage
            .getFerramentas()
            .find(item => item.codigo === codigo);

    },

    /**
     * Procura ferramenta pelo ID
     */
    procurarId(id) {

        return Storage
            .getFerramentas()
            .find(item => item.id === id);

    },

    /**
     * Pesquisa por nome
     */
    pesquisar(texto) {

        texto = texto.toLowerCase();

        return Storage
            .getFerramentas()
            .filter(item =>

                item.nome.toLowerCase().includes(texto) ||

                item.codigo.toLowerCase().includes(texto)

            );

    },

    /**
     * Conta ferramentas disponíveis
     */
    totalDisponivel() {

        return Storage
            .getFerramentas()
            .filter(item => item.status === CONFIG.status.DISPONIVEL)
            .length;

    },

    /**
     * Conta ferramentas em uso
     */
    totalEmUso() {

        return Storage
            .getFerramentas()
            .filter(item => item.status === CONFIG.status.EM_USO)
            .length;

    },

    /**
     * Conta ferramentas em manutenção
     */
    totalManutencao() {

        return Storage
            .getFerramentas()
            .filter(item => item.status === CONFIG.status.MANUTENCAO)
            .length;

    },

    /**
     * Total de ferramentas cadastradas
     */
    totalFerramentas() {

        return Storage.getFerramentas().length;

    },

    /**
     * Ordena ferramentas por nome
     */
    ordenarNome(lista) {

        return lista.sort((a, b) =>
            a.nome.localeCompare(b.nome)
        );

    },

    /**
     * Limpa formulário
     */
    limparFormulario(form) {

        form.reset();

    }

};
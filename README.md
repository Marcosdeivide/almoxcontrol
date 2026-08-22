# 🛠️ AlmoxControl

> **Sistema de gerenciamento de almoxarifado, ferramentas, insumos e movimentações.**

O **AlmoxControl** é uma aplicação web desenvolvida para organizar e digitalizar processos de almoxarifado, oferecendo controle de ferramentas, insumos, colaboradores, movimentações e localização dos materiais.

O projeto nasceu a partir de uma **necessidade real observada em ambiente de almoxarifado**, com o objetivo de reduzir perdas, melhorar a organização, facilitar a localização de materiais e aumentar a rastreabilidade das movimentações.

> 🚧 **Status:** Em desenvolvimento
> O projeto está sendo construído gradualmente, começando pelo frontend e evoluindo para uma arquitetura completa com backend e banco de dados.

---

## 🎯 Objetivo

O objetivo do AlmoxControl é transformar processos que normalmente são controlados por planilhas, anotações ou sistemas pouco específicos em uma plataforma centralizada para gerenciamento de almoxarifado.

O sistema busca responder perguntas como:

* 📦 O que temos em estoque?
* 🔎 Onde determinado item está?
* 👤 Quem está utilizando uma ferramenta?
* 🔄 Quando um item foi retirado ou devolvido?
* 🛠️ Quais ferramentas estão em manutenção?
* ⚠️ Quais materiais estão abaixo do estoque mínimo?
* 🗂️ Quais itens estão em quarentena?
* 📋 Qual é o histórico de movimentações?

---

# 🚀 Funcionalidades

## 📊 Dashboard

Painel principal para visualização rápida das informações do almoxarifado.

Possui como objetivo apresentar indicadores como:

* Total de ferramentas
* Ferramentas disponíveis
* Ferramentas em uso
* Ferramentas em manutenção
* Total de insumos
* Estoque baixo
* Itens em quarentena
* Movimentações recentes

O dashboard será alimentado progressivamente pelos dados reais do sistema.

---

## 🔧 Gestão de Ferramentas

Controle das ferramentas existentes no almoxarifado.

Possibilidades previstas:

* Cadastro de ferramentas
* Identificação por código
* Categoria
* Status
* Localização
* Responsável
* Controle de utilização
* Manutenção
* Devolução
* Histórico

### Status previstos

* 🟢 Disponível
* 🔵 Em uso
* 🟡 Em manutenção
* 🔴 Danificada
* ⚫ Perdida
* 🟠 Quarentena

---

## 📦 Gestão de Insumos

Controle de materiais de consumo e itens armazenados no almoxarifado.

Exemplos:

* Filtros
* Óleo
* Parafusos
* Peças
* Materiais diversos
* Insumos de manutenção

Informações previstas:

* Código
* Nome
* Categoria
* Quantidade
* Unidade
* Estoque mínimo
* Localização
* Fornecedor
* Status

---

## 👥 Colaboradores

Cadastro e gerenciamento dos colaboradores que utilizam ou movimentam materiais.

Informações previstas:

* Nome
* Matrícula
* Setor
* Cargo
* Ferramentas em posse
* Histórico de movimentações

A relação entre colaborador e ferramenta permitirá identificar rapidamente quem está responsável por determinado item.

---

## 🔄 Movimentações

Módulo responsável pelo registro das movimentações realizadas no almoxarifado.

Tipos de movimentação previstos:

* ➕ Entrada
* ➖ Saída
* 🔧 Retirada de ferramenta
* ↩️ Devolução
* 🔀 Transferência
* 📝 Ajuste
* 🗑️ Baixa

Cada movimentação poderá registrar informações como:

* Item
* Quantidade
* Responsável
* Data
* Tipo de movimentação
* Origem
* Destino
* Observação

A intenção é garantir **rastreabilidade das alterações realizadas no estoque**.

---

## 📍 Localização dos Materiais

Uma das funcionalidades planejadas é permitir representar a localização física dos materiais.

Exemplo:

```text
Container 1
└── Prateleira A
    └── Posição 03
        └── Filtro de óleo
```

A ideia é permitir localizar fisicamente um item através do sistema.

---

## ⚠️ Área de Quarentena

O sistema também considera uma área específica para materiais que não devem permanecer no estoque disponível.

Exemplos:

* Peças danificadas
* Peças quebradas
* Materiais antigos
* Itens aguardando avaliação
* Materiais com problemas

Cada item poderá futuramente possuir:

* Status de quarentena
* Motivo
* Data
* Responsável
* Observações
* Histórico

---

# 🧠 Regras de negócio

Um dos principais objetivos do projeto é fazer com que o estoque seja consequência das movimentações realizadas.

Por exemplo:

```text
Estoque inicial
10 unidades

Entrada
+5

Estoque
15 unidades

Saída
-3

Estoque
12 unidades

Devolução
+1

Estoque final
13 unidades
```

Da mesma forma, uma ferramenta retirada por um colaborador deverá deixar de ser considerada disponível e passar a estar vinculada ao responsável.

Isso permitirá manter maior consistência entre:

**Itens → Estoque → Movimentações → Colaboradores → Localização**

---

# 🏗️ Arquitetura planejada

O projeto está sendo desenvolvido de forma incremental.

### Etapa atual

```text
Frontend
├── HTML
├── CSS
└── JavaScript
```

### Evolução planejada

```text
┌──────────────────────┐
│      Frontend        │
│   HTML / CSS / JS    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│       Backend        │
│      API / Node      │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│      PostgreSQL      │
│       Database       │
└──────────────────────┘
```

Futuramente o projeto poderá incorporar:

* API REST
* PostgreSQL
* Prisma ORM
* Autenticação
* Controle de acesso
* Permissões
* Auditoria
* Relatórios
* Logs
* Dashboard baseado em dados reais

---

# 💾 Armazenamento

Durante a fase inicial de desenvolvimento, o projeto utiliza ou utilizou **LocalStorage** para persistência dos dados no navegador.

Essa abordagem permite validar rapidamente a interface e as regras básicas do sistema.

Porém, o objetivo futuro é utilizar um banco de dados centralizado.

### Protótipo

```text
Frontend
   ↓
LocalStorage
```

### Arquitetura futura

```text
Frontend
   ↓
API
   ↓
Backend
   ↓
PostgreSQL
```

A migração será realizada gradualmente para evitar reconstruir o projeto inteiro de uma única vez.

---

# 🖥️ Tecnologias

### Atualmente

* HTML5
* CSS3
* JavaScript
* LocalStorage
* Git
* GitHub

### Planejadas / em evolução

* Node.js
* API REST
* PostgreSQL
* Prisma
* Docker
* Docker Compose
* Autenticação
* Controle de permissões

---

# 📂 Estrutura atual

A estrutura atual do projeto inclui:

```text
AlmoxControl/
│
├── assets/
│   └── img/
│
├── css/
│
├── js/
│
├── index.html
├── dashboard.html
├── ferramentas.html
├── movimentacao.html
├── almoxarifado.html
├── colaboradores.html
│
└── README.md
```

A estrutura poderá ser reorganizada conforme o projeto evoluir para uma arquitetura com frontend, backend e banco de dados.

---

# 🔐 Segurança

A segurança será implementada progressivamente conforme o sistema evoluir.

Entre os recursos planejados:

* Autenticação de usuários
* Controle de permissões
* Validação de dados
* Proteção das APIs
* Variáveis de ambiente
* Controle de acesso
* Registro de alterações
* Auditoria de movimentações

---

# 📈 Roadmap

## 🟢 Fase 1 — Frontend

* [x] Estrutura inicial
* [x] Dashboard
* [x] Ferramentas
* [x] Movimentações
* [x] Colaboradores
* [x] Almoxarifado
* [ ] Refinamento das funcionalidades
* [ ] Padronização do JavaScript
* [ ] Melhorias de responsividade

## 🟡 Fase 2 — Regras de negócio

* [ ] Cadastro completo de ferramentas
* [ ] Cadastro de insumos
* [ ] Controle de estoque
* [ ] Retirada
* [ ] Devolução
* [ ] Entrada e saída
* [ ] Controle de colaboradores
* [ ] Histórico
* [ ] Controle de localização
* [ ] Quarentena
* [ ] Alertas de estoque mínimo

## 🟠 Fase 3 — Backend

* [ ] Estrutura do backend
* [ ] API
* [ ] Modelagem do banco
* [ ] PostgreSQL
* [ ] Prisma
* [ ] Integração frontend/backend

## 🔵 Fase 4 — Usuários e segurança

* [ ] Login
* [ ] Cadastro de usuários
* [ ] Permissões
* [ ] Controle de acesso
* [ ] Auditoria
* [ ] Logs

## 🟣 Fase 5 — Recursos avançados

* [ ] Relatórios
* [ ] Exportação de dados
* [ ] Dashboard avançado
* [ ] Filtros avançados
* [ ] Histórico completo
* [ ] Indicadores de estoque
* [ ] Melhorias de UX/UI

---

# 🎨 Interface

A interface do AlmoxControl busca seguir alguns princípios:

* Simplicidade
* Organização
* Clareza
* Rapidez de utilização
* Responsividade
* Aparência de sistema corporativo

A interface está sendo desenvolvida pensando principalmente na utilização em ambientes de almoxarifado, onde o usuário precisa encontrar informações rapidamente.

---

# 🧪 Desenvolvimento

O projeto está sendo desenvolvido de maneira incremental.

A prioridade é:

```text
Entender
   ↓
Planejar
   ↓
Implementar
   ↓
Testar
   ↓
Corrigir
   ↓
Melhorar
```

A intenção não é simplesmente criar uma interface bonita, mas desenvolver um sistema que represente processos reais de um almoxarifado.

---

# 🎓 Objetivo de aprendizado

O AlmoxControl também faz parte da minha evolução como desenvolvedor.

Através do projeto estou praticando:

* HTML
* CSS
* JavaScript
* Manipulação do DOM
* Lógica de programação
* Git e GitHub
* Organização de projetos
* Regras de negócio
* APIs
* Banco de dados
* Backend
* Docker
* Arquitetura de sistemas

O projeto também serve como **projeto de portfólio**, demonstrando a evolução da minha capacidade de desenvolver uma aplicação baseada em uma necessidade real.

---

# 👨‍💻 Desenvolvedor

Desenvolvido por **Marcos Deivide**

🎓 Estudante de Análise e Desenvolvimento de Sistemas

💻 Desenvolvedor Web em formação

📍 São Bernardo do Campo — SP, Brasil

---

# 🌐 Projeto

**Repositório:**
[github.com/Marcosdeivide/almoxcontrol](https://github.com/Marcosdeivide/almoxcontrol?utm_source=chatgpt.com)

**Aplicação:**
[AlmoxControl — versão online](https://almoxcontrol-alxa.vercel.app/)

---

## ⭐ Status

**🚧 AlmoxControl está em desenvolvimento.**

O projeto está evoluindo de um protótipo frontend para uma aplicação completa de gerenciamento de almoxarifado.

> Construído com código, aprendizado e experiência de um almoxarifado real.

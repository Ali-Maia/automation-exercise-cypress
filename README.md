# PGATS - Automação de Testes Web com Cypress

Projeto de automação de testes *end-to-end* (E2E) desenvolvido para a aplicação fictícia [Automation Exercise](https://www.automationexercise.com/) como Trabalho de Conclusão do curso de Pós-Graduação em Automação de Testes de Software (PGATS).

## Escopo e Casos de Teste Atendidos

Validar fluxos principais da aplicacao web com foco em:
- **Caso 1:** Cadastrar usuário com sucesso
- **Caso 2:** Login de usuário com e-mail e senha corretos
- **Caso 3:** Login de usuário com e-mail e senha incorretos
- **Caso 4:** Logout de usuário
- **Caso 5:** Tentar cadastrar usuário com e-mail já existente
- **Caso 8:** Navegar para todos os produtos e página de detalhes
- **Caso 9:** Buscar produtos por nome
- **Caso 10:** Verificar assinatura (*subscription*) na página inicial
- **Caso 15:** Realizar pedido: Cadastrar antes do checkout (*Place Order*)
- **Caso 16:** Realizar pedido: Fazer login antes do checkout (*Place Order*)

## Stack e Ferramentas

- **Linguagem:** JavaScript (Node.js v20+)
- **Framework de Testes:** Cypress 13
- **Relatórios:** Mochawesome Reporter
- **Seletores Auxiliares:** Cypress XPath
- **CI/CD:** GitHub Actions

## Estrutura do Projeto

```text
.
├── .github/workflows/       # Pipeline de CI/CD (GitHub Actions)
├── cypress/
│   ├── e2e/                 # Specs de teste
│   │   └── automation-exercise/
│   │       ├── automation-execise-modules.cy.js   # Suíte Principal Modularizada (Page Objects)
│   │       ├── automation-exercise.cy.js          # Execução com seletores CSS nativos
│   │       └── automation-exercise-xpath.cy.js    # Execução utilizando XPath
│   ├── fixtures/            # Massas de dados estáticas
│   ├── modules/             # Page Objects e separação de responsabilidades (Actions e Assertions)
│   │   ├── cadastro/
│   │   ├── carrinho/
│   │   ├── home/
│   │   ├── login/
│   │   └── produto/
│   └── support/             # Comandos customizados e configurações de ambiente
├── cypress.config.js        # Configurações globais do Cypress e relatórios
└── package.json             # Scripts de execução e dependências
```

## Pre-requisitos

- Node.js 20 ou superior
- NPM

## Instalacao

1. Clonar o repositório e instalar dependências:
```bash
  git clone https://github.com/Ali-Maia/automation-exercise-cypress.git
  cd automation-exercise-cypress
  npm install
```

## Execucao dos Testes

1. Rodar suite principal modular:
  ```bash
    npm test
  ```

2. Rodar todos os cenarios:
  ```bash
    npm run test:all
  ```

3. Abrir Cypress em modo interativo:
  ```bash
    npm run test-ui
  ```

## Relatorios e Evidencias

- Relatorio mochawesome:
  - pasta mochawesome-report
- Evidencias do Cypress:
  - screenshots em cypress/screenshots
  - videos em cypress/videos

Observacao:
A pasta de relatorios gerados e ignorada no versionamento para manter o repositorio limpo.

## Integracao Continua

O workflow de CI esta em:
- .github/workflows/cypress-tests.yml

Esse pipeline:
- executa em push para main
- executa em pull request para main
- permite execucao manual
- instala dependencias com npm ci
- roda os testes com npm test
- publica o relatorio mochawesome como artefato

## Boas praticas adotadas

- Separacao de responsabilidades por modulos
- Reaproveitamento de acoes e assercoes
- Nomes de testes descritivos
- Uso de dados dinamicos em cenarios de cadastro para reduzir conflitos

## Próximos passos

- Parametrizar ambientes e baseUrl no Cypress
- Melhorar gerenciamento de dados de teste com fixtures dedicadas por fluxo
- Adicionar smoke tests e tags para execucao seletiva
- Padronizar strategy de limpeza de dados de conta criada em execucoes de cadastro

Aqui está a nova versão do seu README, considerando a utilização do Docker Compose e a estrutura atual:

---

# Task Organizer - Prolog

Este projeto é um organizador de tarefas desenvolvido em **Prolog** e executado dentro de contêineres **Docker**, com **Docker Compose** para facilitar o gerenciamento dos contêineres.

Projeto desenvolvido como parte da matéria de **Inteligência Artificial** no curso de **Bacharelado em Ciência da Computação** da **Universidade Federal do Agreste de Pernambuco (UFAPE)**.

## Requisitos

- [Docker](https://www.docker.com/get-started) instalado na máquina
- [Docker Compose](https://docs.docker.com/compose/install/) instalado na máquina

## Estrutura do Projeto

```
- docker-compose.yaml    # Arquivo de configuração do Docker Compose
- Dockerfile             # Arquivo Dockerfile para criar a imagem do contêiner
- index.js               # Código JavaScript para interagir com Prolog via Node.js
- tasks.pl               # Código Prolog com os predicados para organização de tarefas
- README.md              # Este arquivo
```

## Configuração e Execução

### 1. Configuração do Docker Compose

Certifique-se de ter o **Docker Compose** instalado em sua máquina e, em seguida, crie e inicie os contêineres usando o seguinte comando:

```sh
docker-compose up --build
```

Este comando irá construir a imagem e iniciar os contêineres automaticamente. O serviço estará disponível na porta **3000**.

### 2. Interação com o Prolog via Node.js

O arquivo **index.js** é responsável por interagir com o código Prolog, executando tarefas como adicionar e listar as tarefas. Ele chama o Prolog para ordenar as tarefas e exibir os resultados em um formato web.

- O arquivo **tasks.pl** contém a lógica de Prolog, incluindo predicados para adicionar e ordenar tarefas.
- O **Node.js** é usado para executar o Prolog, capturar a saída e exibir as tarefas ordenadas em um servidor web simples.

### 3. Acessando as Tarefas

Após iniciar os contêineres, você pode acessar o servidor web em [http://localhost:3000](http://localhost:3000) para visualizar as tarefas ordenadas.

## Predicados Disponíveis no Prolog

- `listar_tarefas.` - Exibe todas as tarefas armazenadas.
- `adicionar_tarefa(Nome, Prioridade, Prazo, Concluida, PesoDias, DataAdicao).` - Adiciona uma nova tarefa à base de dados.
- `listar_pendentes.` - Exibe todas as tarefas pendentes (não concluídas).

## Considerações

- O código local é montado diretamente no contêiner, o que permite editar o código e ver as mudanças sem precisar rebuildar a imagem Docker.
- O contêiner roda em modo interativo, permitindo que você use comandos Prolog diretamente dentro do ambiente.
  
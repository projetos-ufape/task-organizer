# Task Organizer - Prolog

Este projeto é um organizador de tarefas escrito em **Prolog** e executado dentro de um contêiner **Docker**.

Projeto elabora para uma atividade na matéria de Iteligência Artificial no curso de Bacharelado em Ciência da Computação na Universidade Federal do Agreste de Pernambuco(UFAPE).

## Requisitos

- [Docker](https://www.docker.com/get-started) instalado na máquina

## Configuração e Execução

### 1. Construir a imagem Docker
Execute o seguinte comando na raiz do projeto para criar a imagem:

```sh
docker build -t prolog-task-organizer .
```

### 2. Iniciar o contêiner e carregar o script automaticamente
O script `script.pl` será carregado automaticamente ao iniciar o contêiner:

```sh
docker run -it --rm -v $(pwd):/app prolog-task-organizer
```

Ou no **Windows (PowerShell)**:

```sh
docker run -it --rm -v ${PWD}:/app prolog-task-organizer
```

Você pode começar a usar os predicados disponíveis diretamente:

```prolog
?- listar_tarefas.
?- adicionar_tarefa('Nova Tarefa', alta, '2024-02-18', 3, '2024-02-17').
?- listar_pendentes.
```

### 3. Sair do SWI-Prolog
Para sair do Prolog, use:

```prolog
?- halt.
```

Ou pressione `Ctrl + D`.


## Considerações
- O código é montado no contêiner via `-v $(pwd):/app`, permitindo alterações no código sem precisar reconstruir a imagem.
- O contêiner roda no modo **interativo**, facilitando o uso de comandos Prolog.

---
Agora você está pronto para organizar suas tarefas com Prolog e Docker! 🚀


:- encoding(utf8).
:- dynamic(tarefa/6).

% Ler tarefas da entrada e adicioná-las dinamicamente
ler_tarefas :-
    read(Tarefas),  % Lê uma lista de fatos do input
    adicionar_tarefas(Tarefas).

% Adicionar lista de tarefas à base de dados
adicionar_tarefas([]).
adicionar_tarefas([tarefa(Nome, Prioridade, Prazo, Concluida, PesoDias, DataAdicao) | Resto]) :-
    assertz(tarefa(Nome, Prioridade, Prazo, Concluida, PesoDias, DataAdicao)),
    adicionar_tarefas(Resto).

% Ordenar tarefas usando keysort
ordenar_tarefas(ListaOrdenada) :-
    findall(tarefa(Nome, Prioridade, Prazo, Concluida, PesoDias, DataAdicao),
            tarefa(Nome, Prioridade, Prazo, Concluida, PesoDias, DataAdicao),
            Tarefas),
    maplist(task_to_pair, Tarefas, Pairs),
    keysort(Pairs, SortedPairs),
    pairs_values(SortedPairs, ListaOrdenada).

% Converter tarefa para par chave-valor
task_to_pair(tarefa(Nome, Prioridade, Prazo, Concluida, PesoDias, DataAdicao), Key-tarefa(Nome, Prioridade, Prazo, Concluida, PesoDias, DataAdicao)) :-
    prioridade_valor(Prioridade, Valor),
    Key = (Valor, Prazo, DataAdicao, PesoDias).

% Valores numéricos para prioridades
prioridade_valor(alta, 1).
prioridade_valor(media, 2).
prioridade_valor(baixa, 3).

% Ordenar tarefas e imprimir no formato padrão de Prolog
ordenar_e_exibir :-
    ler_tarefas,
    ordenar_tarefas(TarefasOrdenadas),
    write(TarefasOrdenadas),
    halt.

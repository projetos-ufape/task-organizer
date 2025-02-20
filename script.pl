:- dynamic(tarefa/6).

% Fatos iniciais com novos campos: peso_em_dias e data_adicao
tarefa('Estudar Prolog', alta, '2023-10-15', nao, 3, '2023-10-01').
tarefa('Fazer compras', media, '2023-10-10', nao, 1, '2023-10-02').
tarefa('Lavar o carro', baixa, '2023-10-12', nao, 2, '2023-10-01').

% Adicionar tarefa com novos campos
adicionar_tarefa(Nome, Prioridade, Prazo, PesoDias, DataAdicao) :-
    assertz(tarefa(Nome, Prioridade, Prazo, nao, PesoDias, DataAdicao)).

% Remover tarefa
remover_tarefa(Nome) :-
    retract(tarefa(Nome, _, _, _, _, _)).

% Listar todas as tarefas
listar_tarefas :-
    findall(tarefa(Nome, Prioridade, Prazo, Concluida, PesoDias, DataAdicao),
            tarefa(Nome, Prioridade, Prazo, Concluida, PesoDias, DataAdicao),
            Tarefas),
    write('Tarefas:'), nl,
    imprimir_tarefas(Tarefas).

% Função auxiliar para imprimir tarefas
imprimir_tarefas([]).
imprimir_tarefas([tarefa(Nome, Prioridade, Prazo, Concluida, PesoDias, DataAdicao) | Resto]) :-
    write('Nome: '), write(Nome), nl,
    write('Prioridade: '), write(Prioridade), nl,
    write('Prazo: '), write(Prazo), nl,
    write('Concluida: '), write(Concluida), nl,
    write('Peso (dias): '), write(PesoDias), nl,
    write('Data de adicao: '), write(DataAdicao), nl, nl,
    imprimir_tarefas(Resto).

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

% Marcar tarefa como concluída
marcar_concluida(Nome) :-
    retract(tarefa(Nome, Prioridade, Prazo, _, PesoDias, DataAdicao)),
    assertz(tarefa(Nome, Prioridade, Prazo, sim, PesoDias, DataAdicao)).

% Listar tarefas pendentes
listar_pendentes :-
    findall(tarefa(Nome, Prioridade, Prazo, Concluida, PesoDias, DataAdicao),
            (tarefa(Nome, Prioridade, Prazo, Concluida, PesoDias, DataAdicao), Concluida == nao),
            Tarefas),
    write('Tarefas Pendentes:'), nl,
    imprimir_tarefas(Tarefas).

% Extrair valores dos pares (caso pairs_values/2 não esteja definido)
pairs_values([], []).
pairs_values([_-V | Rest], [V | Vs]) :-
    pairs_values(Rest, Vs).

% Predicado principal para execução
main :-
    write('Listando tarefas originais:'), nl,
    listar_tarefas,
    nl,
    write('Adicionando nova tarefa...'), nl,
    adicionar_tarefa('Ler um livro', media, '2023-11-15', 2, '2023-10-05'),
    nl,
    write('Listando tarefas atualizadas:'), nl,
    listar_tarefas,
    nl,
    ordenar_tarefas(Ordenadas),
    write('Tarefas ordenadas:'), nl,
    imprimir_tarefas(Ordenadas),
    halt. 

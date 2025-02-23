
export class TaskRepository {
    #tasks = [
      { nome: 'Fazer compras', prioridade: 'media', prazo: '2025-02-10', concluida: 'nao', pesoDias: 1, dataAdicao: '2025-02-02' },
      { nome: 'Estudar Prolog', prioridade: 'alta', prazo: '2025-02-15', concluida: 'sim', pesoDias: 3, dataAdicao: '2025-02-01' },
      { nome: 'Lavar a moto', prioridade: 'baixa', prazo: '2025-02-12', concluida: 'nao', pesoDias: 2, dataAdicao: '2025-02-01' },
      { nome: 'Lavar o carro', prioridade: 'baixa', prazo: '2025-02-12', concluida: 'nao', pesoDias: 2, dataAdicao: '2025-02-01' },
    ];
  
    async getAll() {
      return structuredClone(this.#tasks);
    }
  
    async create(task) {
      this.#tasks.push(task);
  
      return task;
    }
  }
  
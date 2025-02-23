const { spawn } = require('child_process');
const { parsePrologOutput } = require('./utils');
const { TaskRepository } = require('./repository');

class TaskService {
  constructor() {
    this.repository = new TaskRepository();
  }

  async getSortedTasks() {
    const tasks = await this.repository.getAll();
    const prologInput = this.formatTasksForProlog(tasks);

    return new Promise((resolve, reject) => {
      const prologProcess = spawn('swipl', ['-s', 'tasks.pl', '-g', 'ordenar_e_exibir', '-t', 'halt']);

      prologProcess.stdin.write(prologInput + '.\n');
      prologProcess.stdin.end();

      let output = '';
      prologProcess.stdout.on('data', (data) => {
        output += data.toString();
      });

      prologProcess.stderr.on('data', (data) => {
        console.error(`Erro: ${data}`);
      });

      prologProcess.on('close', (code) => {
        if (code !== 0) {
          return reject(new Error(`Processo Prolog falhou com código ${code}`));
        }
        try {
          const tasks = parsePrologOutput(output.trim());
          resolve(tasks);
        } catch (err) {
          reject(new Error('Erro ao processar saída do Prolog'));
        }
      });
    });
  }

  formatTasksForProlog(tarefas) {
    return JSON.stringify(
      tarefas.map(t => `tarefa('${t.nome}', ${t.prioridade}, '${t.prazo}', ${t.concluida}, ${t.pesoDias}, '${t.dataAdicao}')`)
    ).replace(/"/g, '');
  }

  async createTask(task) {
    try {
      if (!task || !task.nome || !task.prioridade || !task.prazo || task.pesoDias === undefined || !task.dataAdicao) {
        throw new Error('Dados da tarefa inválidos');
      }

      return await this.repository.create(task);
    } catch (error) {
      throw new Error(`Erro ao criar tarefa: ${error.message}`);
    }
  }
}

module.exports = { TaskService };

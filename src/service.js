const { spawn } = require('child_process');
const { parsePrologOutput } = require('./utils');

function getSortedTasksFromService() {
  return new Promise((resolve, reject) => {
    const tarefas = [
      { nome: 'Fazer compras', prioridade: 'media', prazo: '2023-10-10', concluida: 'nao', pesoDias: 1, dataAdicao: '2023-10-02' },
      { nome: 'Estudar Prolog', prioridade: 'alta', prazo: '2023-10-15', concluida: 'sim', pesoDias: 3, dataAdicao: '2023-10-01' },
      { nome: 'Lavar o carro', prioridade: 'baixa', prazo: '2023-10-12', concluida: 'nao', pesoDias: 2, dataAdicao: '2023-10-01' }
    ];

    const prologInput = formatTarefasForProlog(tarefas);

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

function formatTarefasForProlog(tarefas) {
  return JSON.stringify(
    tarefas.map(t => `tarefa('${t.nome}', ${t.prioridade}, '${t.prazo}', ${t.concluida}, ${t.pesoDias}, '${t.dataAdicao}')`)
  ).replace(/"/g, '');
}

module.exports = { getSortedTasksFromService };

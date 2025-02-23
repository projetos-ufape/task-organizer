const { spawn } = require('child_process');
const http = require('http');

/**
 * 
 * @example
 * const prologOutput = "[tarefa(Estudar Prolog,alta,2023-10-15,nao,3,2023-10-01),tarefa(Fazer compras,media,2023-10-10,nao,1,2023-10-02),tarefa(Lavar o carro,baixa,2023-10-12,nao,2,2023-10-01)]";
 * console.log(parsePrologOutput(prologOutput));
 *  
 */
function parsePrologOutput(prologOutput) {
    const cleanOutput = prologOutput.replace(/\s+/g, ' ').trim();
    
    const regex = /tarefa\(([^,]*),\s*([^,]*),\s*([^\)]+),\s*([^,]*),\s*(\d+),\s*([^\)]+)\)/g;
    
    let match;
    const tasks = [];
  
    while ((match = regex.exec(cleanOutput)) !== null) {
      tasks.push({
        nome: match[1].trim(),
        prioridade: match[2].trim(),
        prazo: match[3].trim(),
        concluida: match[4].trim(),
        pesoDias: parseInt(match[5], 10),
        dataAdicao: match[6].trim(),
      });
    }
  
    return tasks;
  }

function getSortedTasks() {
  return new Promise((resolve, reject) => {
    const tarefas = [
      { nome: 'Estudar Prolog', prioridade: 'alta', prazo: '2023-10-15', concluida: 'nao', pesoDias: 3, dataAdicao: '2023-10-01' },
      { nome: 'Fazer compras', prioridade: 'media', prazo: '2023-10-10', concluida: 'nao', pesoDias: 1, dataAdicao: '2023-10-02' },
      { nome: 'Lavar o carro', prioridade: 'baixa', prazo: '2023-10-12', concluida: 'nao', pesoDias: 2, dataAdicao: '2023-10-01' }
    ];

    const prologInput = JSON.stringify(
      tarefas.map(t => `tarefa('${t.nome}', ${t.prioridade}, '${t.prazo}', ${t.concluida}, ${t.pesoDias}, '${t.dataAdicao}')`)
    ).replace(/"/g, '');

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

// Criar um servidor HTTP para exibir as tarefas no navegador
http.createServer(async (req, res) => {
  if (req.url === '/') {
    try {
      const tasks = await getSortedTasks();
      let html = `
        <html>
        <head>
          <title>Lista de Tarefas</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .task { border: 1px solid #ddd; padding: 10px; margin: 10px 0; border-radius: 5px; }
            .alta { background-color: #ffcccc; }
            .media { background-color: #fff3cd; }
            .baixa { background-color: #d4edda; }
          </style>
        </head>
        <body>
          <h1>Tarefas Ordenadas</h1>
          ${tasks
            .map(
              (task) => `
            <div class="task ${task.prioridade}">
              <h2>${task.nome}</h2>
              <p><strong>Prioridade:</strong> ${task.prioridade}</p>
              <p><strong>Prazo:</strong> ${task.prazo}</p>
              <p><strong>Concluída:</strong> ${task.concluida}</p>
              <p><strong>Peso (dias):</strong> ${task.pesoDias}</p>
              <p><strong>Data de Adição:</strong> ${task.dataAdicao}</p>
            </div>
          `
            )
            .join('')}
        </body>
        </html>
      `;

      res.writeHead(200, { 
        'Content-Type': 'text/html; charset=utf-8' 
      });      
      res.end(html);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(`Erro: ${err.message}`);
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Página não encontrada');
  }
}).listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});

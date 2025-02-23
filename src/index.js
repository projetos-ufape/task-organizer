const http = require('http');
const { getSortedTasks } = require('./controller');

const server = http.createServer(async (req, res) => {
  if (req.url === '/') {
    try {
      const tasks = await getSortedTasks();
      let html = generateHTML(tasks);
      
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(`Erro: ${err.message}`);
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Página não encontrada');
  }
});

server.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});

function generateHTML(tasks) {
  return `
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
      ${tasks.map(task => generateTaskHTML(task)).join('')}
    </body>
    </html>
  `;
}

function generateTaskHTML(task) {
  return `
    <div class="task ${task.prioridade}">
      <h2>${task.nome}</h2>
      <p><strong>Prioridade:</strong> ${task.prioridade}</p>
      <p><strong>Prazo:</strong> ${task.prazo}</p>
      <p><strong>Concluída:</strong> ${task.concluida}</p>
      <p><strong>Peso (dias):</strong> ${task.pesoDias}</p>
      <p><strong>Data de Adição:</strong> ${task.dataAdicao}</p>
    </div>
  `;
}

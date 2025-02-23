const http = require('http');
const { getSortedTasks, createTask } = require('./controller');
const { listTasksView } = require('./views/list_tasks');
const { createTaskView } = require('./views/create_task');

const server = http.createServer(async (req, res) => {
  if (req.url === '/') {
    try {
      const tasks = await getSortedTasks();
      let html = listTasksView(tasks);
      
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`Erro: ${err.message}`);
    }
  } else if (req.url === '/task' && req.method === 'GET') {
    try {
      let html = createTaskView();
      
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`Erro: ${err.message}`);
    }
  } else if (req.url === '/task' && req.method === 'POST') { 
    let body = '';
    
    req.on('data', chunk => {
      body += chunk;
    });
    
    req.on('end', async () => {
      try {         
        const formData = new URLSearchParams(body);
        await createTask(Object.fromEntries(formData.entries()));
  
        res.writeHead(302, { 'Location': '/' });
        res.end();
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`Erro: ${err.message}`);
      }
    });
    
    req.on('error', (err) => {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`Erro: ${err.message}`);
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Página não encontrada');
  }
});

server.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});

const { ButtonComponent } = require("./components/button");

function createTaskView() {
  return `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Formulário de Tarefas</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
        }

        .header { display: flex; justify-content: space-between; align-items: center; }

        form {
          max-width: 400px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 5px;
          background-color:rgb(255, 255, 255);
        }

        label {
          display: block;
          margin-bottom: 8px;
        }

        input[type="text"],
        input[type="date"],
        input[type="number"],
        select {
          width: 100%;
          padding: 8px;
          margin-bottom: 15px;
          border: 1px solid #ddd;
          border-radius: 5px;
          box-sizing: border-box;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Adicionar Tarefa</h1>
        <a href="/">${ButtonComponent("Voltar", "#6c757d")}</a>
      </div>
    
      <form action="/task" method="POST">
        <label for="nome">Nome</label>
        <input type="text" id="nome" name="nome" required>
    
        <label for="prioridade">Prioridade</label>
        <select id="prioridade" name="prioridade" required>
          <option value="alta">Alta</option>
          <option value="media">Média</option>
          <option value="baixa">Baixa</option>
        </select>
    
        <label for="prazo">Prazo</label>
        <input type="date" id="prazo" name="prazo" required>
    
        <label for="concluida">Concluída</label>
        <select id="concluida" name="concluida" required>
          <option value="nao">Não</option>
          <option value="sim">Sim</option>
        </select>
    
        <label for="pesoDias">Peso Dias</label>
        <input type="number" id="pesoDias" name="pesoDias" required min="1">
    
        <label for="dataAdicao">Data de Adição</label>
        <input type="date" id="dataAdicao" name="dataAdicao" required>
    
        ${ButtonComponent("Salvar tarefa", "#007bff", true)}
      </form>

    </body>
    </html>
    `;
}

module.exports = { createTaskView };

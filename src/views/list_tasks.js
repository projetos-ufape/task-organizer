const { ButtonComponent } = require("./components/button");
const { taskComponent } = require("./components/task");

function listTasksView(tasks) {
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
          .header { display: flex; justify-content: space-between; align-items: center; }
        </style>
      </head>
      <body>
        <div class="header">
            <h1>Tarefas Ordenadas</h1>
            <a href="/task">${ButtonComponent("Adicionar tarefa", "#007bff")}</a>
        </div>
        ${tasks.map((task) => taskComponent(task)).join("")}
      </body>
      </html>
    `;
}

module.exports = { listTasksView };

const { TaskService } = require('./service');

const service = new TaskService();

async function getSortedTasks() {
  try {
    return await service.getSortedTasks();
  } catch (err) {
    throw new Error('Erro ao obter tarefas: ' + err.message);
  }
}

module.exports = { getSortedTasks };

const { TaskService } = require('./service');

const service = new TaskService();

async function getSortedTasks() {
  try {
    return await service.getSortedTasks();
  } catch (err) {
    throw new Error('Erro ao obter tarefas: ' + err.message);
  }
}

async function createTask(task) {
  try {
    return await service.createTask(task);
  } catch (err) {
    throw new Error('Erro ao criar tarefa: ' + err.message);
  }
}

module.exports = { getSortedTasks, createTask };

const { getSortedTasksFromService } = require('./service');

async function getSortedTasks() {
  try {
    return await getSortedTasksFromService();
  } catch (err) {
    throw new Error('Erro ao obter tarefas: ' + err.message);
  }
}

module.exports = { getSortedTasks };

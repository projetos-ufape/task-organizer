function taskComponent(task) {
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

module.exports = { taskComponent };

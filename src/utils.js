/**
 * Parse a string with Prolog output to a list of tasks.
 * @param {string} prologOutput The output string from Prolog.
 * @returns {Array} List of tasks.
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
  
  module.exports = { parsePrologOutput };
  
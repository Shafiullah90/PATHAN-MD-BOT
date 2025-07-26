const fs = require('fs');

function loadSudo() {
  try {
    const data = fs.readFileSync('./sudo.json');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveSudo(list) {
  fs.writeFileSync('./sudo.json', JSON.stringify(list, null, 2));
}

module.exports = { loadSudo, saveSudo };

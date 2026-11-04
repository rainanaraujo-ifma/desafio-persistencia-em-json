// main.js — PROCESSO PRINCIPAL da Lista de Compras

const { app, BrowserWindow } = require('electron');
const path = require('node:path');

function criarJanela() {
  const janela = new BrowserWindow({
    width: 720,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  janela.loadFile(path.join(__dirname, 'src', 'index.html'));
}

app.whenReady().then(criarJanela);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

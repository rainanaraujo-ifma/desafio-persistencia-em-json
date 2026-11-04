// preload.js — o preload já está registrado na janela.
// O window.api começa vazio: você vai acrescentar as funções.

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
});

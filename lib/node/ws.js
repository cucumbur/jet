const vm = require('./vm');
const WebSocket = require('ws');

let ws;
module.exports = {
  start() {
    if(!ws) {
      ws = new WebSocket(
        'ws://localhost:8081/debugger-proxy?role=debugger&name=Chrome'
      );

      vm.send = obj => ws.send(JSON.stringify(obj));

      ws.onmessage = message => vm.message(JSON.parse(message.data));

      ws.onclose = event =>
        !event.wasClean ? console.error('Bridge WS Error', event.message) : '';
    }
  },
  stop() {
    if (ws) {
      try {
        ws.close();
      } catch (e) {
        // do nothing
      }
    }
  }
};
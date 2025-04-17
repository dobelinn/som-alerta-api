const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

// 🔧 CONFIGURAÇÕES CUSTOMIZÁVEIS
const ALERT_THRESHOLD = 541;
const DELTA_MINIMO = 10;
// const TEMPO_RESET_MS = 15000; // tempo para resetar último valor (15 segundos)
const TEMPO_RESET_MS = 2000;

let ultimoValor = ALERT_THRESHOLD;
let timeoutReset = null;

app.post('/api/som', (req, res) => {
  const { valor } = req.body;
  console.log(`Recebido: ${valor}`);

  // lógica de alerta
  if (valor > ALERT_THRESHOLD && valor - ultimoValor > DELTA_MINIMO) {
    console.log('Emitindo alerta!');
    io.emit('alerta', { mensagem: 'PERIGO' });
  }

  // atualizar último valor e reiniciar o timeout
  ultimoValor = valor;

  if (timeoutReset) clearTimeout(timeoutReset);
  timeoutReset = setTimeout(() => {
    console.log('Resetando ultimoValor para padrão');
    ultimoValor = ALERT_THRESHOLD;
  }, TEMPO_RESET_MS);

  res.sendStatus(200);
});

server.listen(3000, '0.0.0.0', () => console.log('Servidor rodando na porta 3000'));

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*"
  }
});

app.use(cors());
app.use(express.json());

let ultimoValor = 515;

app.post('/api/som', (req, res) => {
  const { valor } = req.body;
  console.log(`Recebido: ${valor}`);

  if (valor > 515 && valor - ultimoValor > 5) {
    console.log('Emitindo alerta!');
    io.emit('alerta', { mensagem: 'PERIGO' });
  }

  ultimoValor = valor;
  res.sendStatus(200);
});

server.listen(3000, () => console.log('Servidor rodando na porta 3000'));


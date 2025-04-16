curl -X POST https://som-alerta-api.onrender.com/api/som -H "Content-Type: application/json" -d '{"valor": 512}'
sleep 1
curl -X POST https://som-alerta-api.onrender.com/api/som -H "Content-Type: application/json" -d '{"valor": 516}'
sleep 1
curl -X POST https://som-alerta-api.onrender.com/api/som -H "Content-Type: application/json" -d '{"valor": 530}'
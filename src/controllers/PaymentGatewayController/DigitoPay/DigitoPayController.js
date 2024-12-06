const DigitoPayCore = require('../../../core/PaymentGateways/DigitoPay/DigitoPay');
const url = require('url');
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
const sessionMap = new Map(); 

wss.on('connection', (ws, req) => {
    const params = new URLSearchParams(url.parse(req.url).query);
    const sessionId = params.get('sessionId'); // Obtém o ID da sessão a partir dos parâmetros de consulta
  
    if (sessionId) {
      sessionMap.set(sessionId, ws);
      console.log('Cliente conectado com ID de sessão:', sessionId);
  
      ws.on('message', (message) => {
        console.log('Mensagem recebida do cliente:', message);
      });
  
      ws.on('close', () => {
        sessionMap.delete(sessionId);
        console.log('Cliente desconectado do WebSocket:', sessionId);
      });
    } else {
      console.error('ID de sessão ausente. Conexão WebSocket rejeitada.');
      ws.close(1008, 'ID de sessão obrigatório'); // Código 1008: Violação de política
    }
  });


  exports.generatePixController = async function (req, res) {
    try {
        const header_Token_auth = req.headers['t'];

        // Extrai o sessionId no formato desejado
        const sessionIdObj = JSON.parse(header_Token_auth); // Exemplo: {"f90":"0775897943124897"}
        const sessionId = Object.entries(sessionIdObj)
            .map(([key, value]) => `${key}:${value}`) // Converte para "f90:0775897943124897"
            .join('');

        console.log('Session ID processado:', sessionId);

        const { person, value } = req.body;

        if (!person || !value) {
            return res.status(400).json({ status: false, data: "Campos obrigatórios faltando no payload" });
        }

        if (!person.cpf || !person.name) {
            return res.status(400).json({ status: false, data: "Dados da pessoa (CPF e Nome) são obrigatórios." });
        }

        if (value <= 0) {
            return res.status(400).json({ status: false, data: "O valor deve ser maior que zero." });
        }

        const digitoPay = new DigitoPayCore();
        await digitoPay.init();

        // Preparar os detalhes do pagamento, incluindo o sessionId
        const depositDetails = {
            cpf: person.cpf,
            name: person.name,
            amount: value,
            sessionId, // Inclui o sessionId aqui
        };

        // Executar o depósito/pix
        await digitoPay.makeDeposit(depositDetails, res);

    } catch (error) {
        console.error("Erro ao gerar Pix no DigitoPay:", error.message);
        res.status(500).json({ status: false, data: "Erro ao gerar Pix" });
    }
};



exports.webhookDeposit = async function (req, res) {
  try {
      const sessionId = req.query.sessionId ;

      console.log(sessionId)

      if (!sessionId) {
          return res.status(400).json({ status: false, data: 'ID de sessão ausente.' });
      }

      if (!req.body || req.body.status != "REALIZADO") {
          return res.status(400).json({ status: false, data: 'Dados inválidos ou operação não sucedida.' });
      }

      const client = sessionMap.get(sessionId);
      console.log('Cliente WebSocket encontrado:', client);

      if (client && client.readyState === WebSocket.OPEN) {
          const { status, valor } = req.body;
          const message = { status, valor, message: 'Webhook de depósito recebido' };

          client.send(JSON.stringify(message));
          console.log('Mensagem enviada ao cliente WebSocket:', message);

          client.close();
          sessionMap.delete(sessionId);
      } else {
          console.warn('Cliente WebSocket não encontrado ou conexão fechada:', sessionId);
      }

      res.status(200).json({ status: true, message: 'Webhook de depósito processado com sucesso.' });
  } catch (error) {
      console.error('Erro ao processar webhook de depósito (POST):', error);
      res.status(500).json({ mensagem: 'Erro ao processar webhook de depósito.' });
  }
};


exports.withdrawController = async function (req, res) {
    try {
        const header_Token_auth = req.headers['t'];

 

        const digitoPay = new DigitoPayCore();
        await digitoPay.init();

        const withdrawDetails = {
            pixKeyTypes: req.body.pixKeyTypes,
            pixKey: req.body.pixKey,
            name: req.body.name,
            amount: req.body.amount,
            endToEndId: req.body.endToEndId || null,
            splitConfiguration: req.body.splitConfiguration || null,
        };

        await digitoPay.withdraw(withdrawDetails, res);
    } catch (error) {
        console.error("Erro ao realizar saque no DigitoPay:", error.message);
        res.status(500).json({ status: false, data: "Erro ao realizar saque" });
    }




};

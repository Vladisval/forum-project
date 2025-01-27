import  WebSocket, {WebSocketServer}  from "ws";

interface ChatMessage {
  id: number;
  message: string;
}

const wss = new WebSocketServer({ port: 8080 });

console.log('WebSocket сервер запущен на порту 8080');

// Хранилище подключений
const clients: Map<number, WebSocket> = new Map();

// Обработка подключения клиента
wss.on('connection', (ws: WebSocket) => {
  const id = Date.now();
  clients.set(id, ws);

  console.log(`Клиент подключился: ${id}`);

  // Обработка входящих сообщений от клиента
  ws.on('message', (message: string) => {
    console.log(`Получено сообщение от клиента ${id}: ${message}`);

    const parsedData: ChatMessage = JSON.parse(message);


    // Рассылка сообщения всем подключенным клиентам
    // @ts-ignore
    for (const [, clientWs] of clients) {
      if (clientWs.readyState === WebSocket.OPEN) {
        const messageToSend: ChatMessage = { id, message: parsedData.message };
        clientWs.send(JSON.stringify(messageToSend));
      }
    }
  });

  // Обработка закрытия соединения
  ws.on('close', () => {
    console.log(`Клиент отключился: ${id}`);
    clients.delete(id);
  });

  // Отправляем клиенту сообщение после подключения
  ws.send(JSON.stringify({ message: 'Добро пожаловать в чат!' }));
});
module.exports = {
  command: 'pagal',
  handler: async (sock, chatId, message) => {
    await sock.sendMessage(chatId, { text: 'when you smile, it feels like everything will be alright. Your crazy lover ' });
  }
};
```

const settings = require("../settings");

function runtime(seconds) {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `dd{h}h mm{s}s`;
}

async function aliveCommand(sock, chatId, message) {
    try {
        const up = runtime(process.uptime());
        const text = `🟢 *Bot is Alive!*
👤 Owner: settings.botOwner || 'Unknown'
⏱ Uptime:{up}
📅 Time: new Date().toLocaleString()
📶 Speed: 100ms
📦 Version: v{settings.version || '1.0.0'}
        `;

        await sock.sendMessage(chatId, { text }, { quoted: message });

    } catch (err) {
[25/07, 12:24 pm] ChatGPT: console.error('Alive Error:', err);
        await sock.sendMessage(chatId, { text: '❌ Alive error occurred.' });
    }
}

module.exports = aliveCommand;
```

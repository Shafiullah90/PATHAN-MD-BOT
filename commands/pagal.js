async function pagalCommand(sock, chatId, message) {
    try {
        const text = `🌹 *Pagli Halimah* 🌹\n\n"When you smile, it feels like everything will be alright." 💖\n\n— Your crazy lover 🤭`;

        await sock.sendMessage(chatId, { text }, { quoted: message });

    } catch (err) {
        console.error('Pagal command error:', err);
        await sock.sendMessage(chatId, { text: '❌ Error in pagal command.' });
    }
}

module.exports = pagalCommand;
```

async function helloCommand(sock, chatId, message) {
    try {
        const reply = '👋 Hello there! Hope you\'re doing great!';
        await sock.sendMessage(chatId, { text: reply }, { quoted: message });
    } catch (error) {
        console.error('Error in hello command:', error);
        await sock.sendMessage(chatId, { text: '❌ Failed to say hello. Please try again.' }, { quoted: message });
    }
}

module.exports = { helloCommand };

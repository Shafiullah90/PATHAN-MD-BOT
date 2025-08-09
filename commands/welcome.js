const { handleWelcome } = require('../lib/welcome');

async function welcomeCommand(sock, chatId, message, match) {
    // Ensure command is used in a group
    if (!chatId.endsWith('@g.us')) {
        await sock.sendMessage(chatId, { 
            text: '🛑 This command can only be used in *group chats*.\n🔰 *IMRAN BOT WELCOME SYSTEM*'
        });
        return;
    }

    // Extract match text after the command
    const text = message.message?.conversation || 
                 message.message?.extendedTextMessage?.text || '';
                 
    const matchText = text.split(' ').slice(1).join(' ');

    await handleWelcome(sock, chatId, message, matchText);
}

module.exports = welcomeCommand;

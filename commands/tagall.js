const isAdmin = require('../lib/isAdmin'); // Admin check helper

async function tagAllCommand(sock, chatId, senderId) {
    try {
        const { isSenderAdmin, isBotAdmin } = await isAdmin(sock, chatId, senderId);

        if (!isSenderAdmin) {
            return await sock.sendMessage(chatId, {
                text: '❌ *Only group admins can use this command!*'
            });
        }

        if (!isBotAdmin) {
            return await sock.sendMessage(chatId, {
                text: '❌ *Bot must be admin to mention all members!*'
            });
        }

        const groupMetadata = await sock.groupMetadata(chatId);
        const participants = groupMetadata.participants;

        if (!participants || participants.length === 0) {
            return await sock.sendMessage(chatId, {
                text: '⚠️ *No members found in this group!*'
            });
        }

        // Format mention message
        let message = '🔊 *Tagging All Members:*\n\n';
        for (const p of participants) {
            message += `@${p.id.split('@')[0]}\n`;
        }

        message += `\n🤖 _Powered by IMRAN-BOT_`;

        await sock.sendMessage(chatId, {
            text: message,
            mentions: participants.map(p => p.id)
        });

    } catch (error) {
        console.error('Error in tagall command:', error);
        await sock.sendMessage(chatId, {
            text: '❌ *Failed to tag all members. Please try again later.*'
        });
    }
}

module.exports = tagAllCommand;

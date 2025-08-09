const fs = require('fs');
const path = require('path');
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');

async function setProfilePicture(sock, chatId, msg) {
    try {
        // Owner check
        const isOwner = msg.key.fromMe;
        if (!isOwner) {
            return await sock.sendMessage(chatId, {
                text: '❌ *Only the bot owner can change the profile picture!*'
            });
        }

        // Quoted message check
        const quotedMsg = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        if (!quotedMsg || !quotedMsg.imageMessage) {
            return await sock.sendMessage(chatId, {
                text: '_❗ Please reply to an image message using this command!_'
            });
        }

        // Create temporary directory
        const tmpDir = path.join(__dirname, '../tmp');
        if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

        const filePath = path.join(tmpDir, `pp_${Date.now()}.jpg`);

        // Download image
        const stream = await downloadContentFromMessage(quotedMsg.imageMessage, 'image');
        let buffer = Buffer.from([]);

        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        fs.writeFileSync(filePath, buffer);

        // Update bot's profile picture
        await sock.updateProfilePicture(sock.user.id, { url: filePath });

        // Delete temp image
        fs.unlinkSync(filePath);

        await sock.sendMessage(chatId, {
            text: '✅ *Profile picture updated successfully!*\n🤖 _Powered by IMRAN-BOT_'
        });

    } catch (error) {
        console.error('❌ Error setting profile picture:', error);
        await sock.sendMessage(chatId, {
            text: '❌ *Failed to update profile picture. Please try again later!*'
        });
    }
}

module.exports = setProfilePicture;

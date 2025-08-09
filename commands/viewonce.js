const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const fs = require('fs');
const path = require('path');

// Channel info for forwarded context
const channelInfo = {
    contextInfo: {
        forwardingScore: 1,
        isForwarded: false,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '@newsletter',
            newsletterName: '𝐈𝐌𝐑𝐀𝐍-𝐁𝐎𝐓',
            serverMessageId: -1
        }
    }
};

async function viewOnceCommand(sock, chatId, message) {
    try {
        const quotedMessage = message.message?.extendedTextMessage?.contextInfo?.quotedMessage ||
            message.message?.imageMessage || message.message?.videoMessage;

        if (!quotedMessage) {
            return await sock.sendMessage(chatId, {
                text: '⚠️ _Please reply to a view-once message (image or video)!_',
                ...channelInfo
            });
        }

        const isViewOnceImage =
            quotedMessage.imageMessage?.viewOnce ||
            quotedMessage.viewOnceMessage?.message?.imageMessage ||
            message.message?.viewOnceMessage?.message?.imageMessage;

        const isViewOnceVideo =
            quotedMessage.videoMessage?.viewOnce ||
            quotedMessage.viewOnceMessage?.message?.videoMessage ||
            message.message?.viewOnceMessage?.message?.videoMessage;

        let mediaMessage;

        if (isViewOnceImage) {
            mediaMessage = quotedMessage.imageMessage ||
                quotedMessage.viewOnceMessage?.message?.imageMessage ||
                message.message?.viewOnceMessage?.message?.imageMessage;
        } else if (isViewOnceVideo) {
            mediaMessage = quotedMessage.videoMessage ||
                quotedMessage.viewOnceMessage?.message?.videoMessage ||
                message.message?.viewOnceMessage?.message?.videoMessage;
        }

        if (!mediaMessage) {
            return await sock.sendMessage(chatId, {
                text: '❌ Could not detect any view-once content. Make sure it’s a view-once *image* or *video*!',
                ...channelInfo
            });
        }

        // View Once Image Handler
        if (isViewOnceImage) {
            try {
                const stream = await downloadContentFromMessage(mediaMessage, 'image');
                let buffer = Buffer.from([]);
                for await (const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk]);
                }

                const caption = mediaMessage.caption || '';

                await sock.sendMessage(chatId, {
                    image: buffer,
                    caption: `🔓 *View-Once Image Unlocked!*\n\n💬 ${caption || 'UNLOCKED BY IMRAN BOT.'}`,
                    ...channelInfo
                });
            } catch (err) {
                console.error('Image download error:', err);
                await sock.sendMessage(chatId, {
                    text: '❌ Failed to unlock the view-once image!',
                    ...channelInfo
                });
            }
            return;
        }

        // View Once Video Handler
        if (isViewOnceVideo) {
            try {
                const tempDir = path.join(__dirname, '../temp');
                if (!fs.existsSync(tempDir)) {
                    fs.mkdirSync(tempDir);
                }

                const tempFile = path.join(tempDir, `video_${Date.now()}.mp4`);
                const stream = await downloadContentFromMessage(mediaMessage, 'video');
                const writeStream = fs.createWriteStream(tempFile);

                for await (const chunk of stream) {
                    writeStream.write(chunk);
                }
                writeStream.end();

                await new Promise(resolve => writeStream.on('finish', resolve));

                const caption = mediaMessage.caption || '';

                await sock.sendMessage(chatId, {
                    video: fs.readFileSync(tempFile),
                    caption: `🔓 *View-Once Video Unlocked!*\n\n💬 ${caption || 'No caption provided.'}`,
                    ...channelInfo
                });

                fs.unlinkSync(tempFile);
            } catch (err) {
                console.error('Video download error:', err);
                await sock.sendMessage(chatId, {
                    text: '❌ Failed to unlock the view-once video!',
                    ...channelInfo
                });
            }
            return;
        }

        // Not a view once
        await sock.sendMessage(chatId, {
            text: '⚠️ The message is not view-once. Please reply to a valid view-once image or video.',
            ...channelInfo
        });

    } catch (error) {
        console.error('View once command error:', error);
        await sock.sendMessage(chatId, {
            text: '❌ An error occurred while processing the view-once message.',
            ...channelInfo
        });
    }
}

module.exports = viewOnceCommand;

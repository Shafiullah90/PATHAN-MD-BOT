const fs = require('fs');
const path = require('path');
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const webp = require('node-webpmux');
const crypto = require('crypto');

async function takeCommand(sock, chatId, message, args) {
    try {
        const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;

        if (!quoted?.stickerMessage) {
            return await sock.sendMessage(chatId, { 
                text: '❌ Reply to a sticker with `.take <packname>`'
            });
        }

        const packname = args.join(' ') || 'IMRAN-BOT';

        // Download sticker
        const stream = await downloadContentFromMessage(quoted.stickerMessage, 'sticker');
        let buffer = Buffer.from([]);

        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        // Load sticker into webpmux
        const img = new webp.Image();
        await img.load(buffer);

        const metadata = {
            'sticker-pack-id': crypto.randomBytes(16).toString('hex'),
            'sticker-pack-name': packname,
            'sticker-pack-publisher': 'IMRAN-BOT',
            'emojis': ['🤖']
        };

        const exifAttr = Buffer.from([
            0x49, 0x49, 0x2A, 0x00,
            0x08, 0x00, 0x00, 0x00,
            0x01, 0x00, 0x41, 0x57,
            0x07, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x16, 0x00,
            0x00, 0x00
        ]);

        const jsonBuffer = Buffer.from(JSON.stringify(metadata), 'utf8');
        const exif = Buffer.concat([exifAttr, jsonBuffer]);
        exif.writeUIntLE(jsonBuffer.length, 14, 4);
        img.exif = exif;

        const finalSticker = await img.save(null);

        // Send new sticker with custom pack name
        await sock.sendMessage(chatId, {
            sticker: finalSticker
        }, {
            quoted: message
        });

    } catch (err) {
        console.error('Error in .take command:', err);
        await sock.sendMessage(chatId, {
            text: '❌ Failed to process sticker. Try again with a valid sticker.'
        });
    }
}

module.exports = takeCommand;

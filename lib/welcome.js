/**
 * 🔰 PATHAN BOT - Welcome & Goodbye Handler
 * Manages welcome and goodbye messages in WhatsApp groups.
 * 
 * Powered by: Baileys WhatsApp Library
 * Author: PATHAN Hacks
 */

const { addWelcome, delWelcome, isWelcomeOn, addGoodbye, delGoodBye, isGoodByeOn } = require('../lib/index');
const { delay } = require('@whiskeysockets/baileys');

async function handleWelcome(sock, chatId, message, match) {
    if (!match) {
        return sock.sendMessage(chatId, {
            text: `🔰 *PATHAN BOT - Welcome System*\n\n📥 *Commands:*\n\n✅ *.welcome on* — Enable welcome messages\n🛠️ *.welcome set [your message]* — Set a custom welcome message\n🚫 *.welcome off* — Disable welcome messages\n\n📌 *Available Variables:*\n• {user} - Mentions the new member\n• {group} - Shows group name\n• {description} - Shows group description`,
            quoted: message
        });
    }

    const [command, ...args] = match.trim().split(' ');
    const lowerCommand = command.toLowerCase();
    const customMessage = args.join(' ');

    if (lowerCommand === 'on') {
        if (await isWelcomeOn(chatId)) {
            return sock.sendMessage(chatId, { text: '⚠️ Welcome messages are *already enabled*.', quoted: message });
        }
        await addWelcome(chatId, true, null);
        return sock.sendMessage(chatId, { text: '✅ Welcome messages *enabled*! Use *.welcome set [your message]* to customize.', quoted: message });
    }

    if (lowerCommand === 'off') {
        if (!(await isWelcomeOn(chatId))) {
            return sock.sendMessage(chatId, { text: '⚠️ Welcome messages are *already disabled*.', quoted: message });
        }
        await delWelcome(chatId);
        return sock.sendMessage(chatId, { text: '✅ Welcome messages *disabled* for this group.', quoted: message });
    }

    if (lowerCommand === 'set') {
        if (!customMessage) {
            return sock.sendMessage(chatId, { text: '⚠️ Please provide a custom welcome message.\nExample: *.welcome set Welcome to {group}, {user}!*', quoted: message });
        }
        await addWelcome(chatId, true, customMessage);
        return sock.sendMessage(chatId, { text: '✅ Custom welcome message *set successfully!*', quoted: message });
    }

    return sock.sendMessage(chatId, {
        text: `❌ Invalid command!\n\nUse:\n*.welcome on* — Enable\n*.welcome set [message]* — Set message\n*.welcome off* — Disable`,
        quoted: message
    });
}

async function handleGoodbye(sock, chatId, message, match) {
    const lower = match?.toLowerCase();

    if (!match) {
        return sock.sendMessage(chatId, {
            text: `🔰 *PATHAN BOT - Goodbye System*\n\n📤 *Commands:*\n\n✅ *.goodbye on* — Enable goodbye messages\n🛠️ *.goodbye [your message]* — Set a custom goodbye message\n🚫 *.goodbye off* — Disable goodbye messages\n\n📌 *Available Variables:*\n• {user} - Mentions the leaving member\n• {group} - Shows group name`,
            quoted: message
        });
    }

    if (lower === 'on') {
        if (await isGoodByeOn(chatId)) {
            return sock.sendMessage(chatId, { text: '⚠️ Goodbye messages are *already enabled*.', quoted: message });
        }
        await addGoodbye(chatId, true, null);
        return sock.sendMessage(chatId, { text: '✅ Goodbye messages *enabled*! Use *.goodbye [your message]* to customize.', quoted: message });
    }

    if (lower === 'off') {
        if (!(await isGoodByeOn(chatId))) {
            return sock.sendMessage(chatId, { text: '⚠️ Goodbye messages are *already disabled*.', quoted: message });
        }
        await delGoodBye(chatId);
        return sock.sendMessage(chatId, { text: '✅ Goodbye messages *disabled* for this group.', quoted: message });
    }

    // Set custom goodbye message
    await delay(1000);
    await addGoodbye(chatId, true, match);
    return sock.sendMessage(chatId, { text: '✅ Custom goodbye message *set successfully!*', quoted: message });
}

module.exports = { handleWelcome, handleGoodbye };

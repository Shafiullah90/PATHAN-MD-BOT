const axios = require('axios');
const { sleep } = require('../lib/myfunc');

async function pairCommand(sock, chatId, message, q) {
    // Shared context info with IMRAN-BOT branding
    const newsletterMeta = {
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '@newsletter',
            newsletterName: '🛠️ IMRAN-BOT',
            serverMessageId: -1
        }
    };

    try {
        if (!q) {
            return await sock.sendMessage(chatId, {
                text: "📞 Please provide a valid WhatsApp number.\nExample: `.pair 923001234567`",
                contextInfo: newsletterMeta
            });
        }

        const numbers = q.split(',')
            .map((v) => v.replace(/[^0-9]/g, ''))
            .filter((v) => v.length > 5 && v.length < 20);

        if (numbers.length === 0) {
            return await sock.sendMessage(chatId, {
                text: "❌ Invalid number format. Please use something like `923001234567`.",
                contextInfo: newsletterMeta
            });
        }

        for (const number of numbers) {
            const whatsappID = number + '@s.whatsapp.net';
            const result = await sock.onWhatsApp(whatsappID);

            if (!result[0]?.exists) {
                return await sock.sendMessage(chatId, {
                    text: `❗ The number *${number}* is not registered on WhatsApp.`,
                    contextInfo: newsletterMeta
                });
            }

            await sock.sendMessage(chatId, {
                text: "⏳ Please wait while we fetch the pairing code...",
                contextInfo: newsletterMeta
            });

            try {
                const response = await axios.get(`https://knight-bot-paircode.onrender.com/code?number=${number}`);
                
                if (response.data && response.data.code) {
                    const code = response.data.code;
                    if (code === "Service Unavailable") throw new Error('Service Unavailable');

                    await sleep(3000);

                    await sock.sendMessage(chatId, {
                        text: `✅ *Pairing Code:* \`${code}\`\nUse this code in terminal when prompted.`,
                        contextInfo: newsletterMeta
                    });
                } else {
                    throw new Error('Invalid response from server');
                }

            } catch (apiError) {
                console.error('API Error:', apiError);
                const errorMessage = apiError.message === 'Service Unavailable'
                    ? "🚫 Service is currently unavailable. Please try again later."
                    : "⚠️ Failed to generate pairing code. Please try again later.";

                await sock.sendMessage(chatId, {
                    text: errorMessage,
                    contextInfo: newsletterMeta
                });
            }
        }

    } catch (error) {
        console.error('Unexpected Error:', error);
        await sock.sendMessage(chatId, {
            text: "❌ An unexpected error occurred. Please try again later.",
            contextInfo: newsletterMeta
        });
    }
}

module.exports = pairCommand;

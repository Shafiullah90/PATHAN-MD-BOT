// commands/whoisgay.js
async function whoisgayCommand(sock, chatId, message, isGroup) {
    try {
        if (!isGroup) {
            return await sock.sendMessage(chatId, { text: "❌ This command only works in *groups*!" }, { quoted: message });
        }

        const groupMetadata = await sock.groupMetadata(chatId);
        const participants = groupMetadata.participants;

        if (!participants || participants.length === 0) {
            return await sock.sendMessage(chatId, { text: "❌ Could not find any members in this group." }, { quoted: message });
        }

        // Pick random member
        const randomUser = participants[Math.floor(Math.random() * participants.length)];
        const tagUser = randomUser.id;

        // Funny lines
        const funnyReplies = [
            "🌈 you are 200% confirmed gay! 😂",
            "🌈 Confirmed gay 🤣",
            "🌈 Certified gay by *PATHAN-MD BOT* 💯",
            "🌈 Rainbow hunter spotted 😂",
            "🌈 Gay energy detected 🌟",
            "🌈 Not straight at all 🏳️‍🌈"
        ];
        const randomReply = funnyReplies[Math.floor(Math.random() * funnyReplies.length)];

        await sock.sendMessage(chatId, {
            text: `👀 The gay in this group is 👉 @${tagUser.split('@')[0]}\n\n${randomReply}`,
            mentions: [tagUser]
        }, { quoted: message });

    } catch (error) {
        console.error('Error in whoisgayCommand:', error);
        await sock.sendMessage(chatId, { text: '⚠️ Something went wrong with .whoisgay command.' }, { quoted: message });
    }
}

module.exports = { whoisgayCommand };

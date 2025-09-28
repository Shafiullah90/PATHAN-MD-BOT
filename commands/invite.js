// commands/invite.js
async function inviteCommand(sock, chatId, message, isGroup) {
    try {
        if (!isGroup) {
            return await sock.sendMessage(
                chatId,
                { text: "❌ This command only works in *groups*!" },
                { quoted: message }
            );
        }

        // Fetch group metadata
        const groupMetadata = await sock.groupMetadata(chatId);
        const participants = groupMetadata.participants;
        const botNumber = (await sock.decodeJid(sock.user.id));

        // Check if bot is admin
        const botInGroup = participants.find(p => p.id === botNumber);
        const isBotAdmin = botInGroup?.admin !== null && botInGroup?.admin !== undefined;

        if (!isBotAdmin) {
            return await sock.sendMessage(
                chatId,
                { text: "❌ I need to be *admin* to fetch group invite link!" },
                { quoted: message }
            );
        }

        // Get group invite link
        const code = await sock.groupInviteCode(chatId);
        const groupLink = `https://chat.whatsapp.com/${code}`;

        // Styled response
        await sock.sendMessage(chatId, {
            text: `
┏━━━━━━━━━━━━━━━━━━━┓
┃ 🔗 *Group Invite Link*
┗━━━━━━━━━━━━━━━━━━━┛

📌 Group: *${groupMetadata.subject}*
👥 Members: ${groupMetadata.participants.length}

🔗 Link: ${groupLink}

🤖 Invited by: *PATHAN-MD BOT*
            `.trim()
        }, { quoted: message });

    } catch (error) {
        console.error("Error in invite command:", error);
        await sock.sendMessage(
            chatId,
            { text: "❌ Failed to get invite link. Try again later!" },
            { quoted: message }
        );
    }
}

module.exports = { inviteCommand };

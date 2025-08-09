const { isAdmin } = require('../lib/isAdmin');

// Manual promotion via command
async function promoteCommand(sock, chatId, mentionedJids, message) {
    let userToPromote = [];

    if (mentionedJids && mentionedJids.length > 0) {
        userToPromote = mentionedJids;
    } else if (message.message?.extendedTextMessage?.contextInfo?.participant) {
        userToPromote = [message.message.extendedTextMessage.contextInfo.participant];
    }

    if (userToPromote.length === 0) {
        await sock.sendMessage(chatId, {
            text: '🫵 Tag a user or reply to their message to *promote them with IMRAN BOT power!* 🚀'
        });
        return;
    }

    try {
        await sock.groupParticipantsUpdate(chatId, userToPromote, "promote");

        const usernames = await Promise.all(userToPromote.map(async jid => {
            return `@${jid.split('@')[0]}`;
        }));

        const promoterJid = sock.user.id;

        const promotionMessage = `
👑 *ADMIN ALERT FROM IMRAN BOT!* 👑

🎉 ${usernames.length > 1 ? 'Legends' : 'Legend'} Promoted:
${usernames.map(name => `🔺 ${name}`).join('\n')}

📤 Promoted By: @${promoterJid.split('@')[0]}
🕰️ Time: ${new Date().toLocaleString()}

⚡ You're now blessed with ADMIN POWERS.
Use them wisely or prepare for *DEMODIFICATION* 🔨`;

        await sock.sendMessage(chatId, {
            text: promotionMessage,
            mentions: [...userToPromote, promoterJid]
        });

    } catch (error) {
        console.error('Promotion Error:', error);
        await sock.sendMessage(chatId, {
            text: '❌ IMRAN BOT failed to promote the user(s). Maybe try again after praying. 😅'
        });
    }
}

// Auto-promotion detection
async function handlePromotionEvent(sock, groupId, participants, author) {
    try {
        const promotedUsernames = await Promise.all(participants.map(async jid => {
            return `@${jid.split('@')[0]}`;
        }));

        let promotedBy;
        const mentionList = [...participants];

        if (author && author.length > 0) {
            const authorJid = author;
            promotedBy = `@${authorJid.split('@')[0]}`;
            mentionList.push(authorJid);
        } else {
            promotedBy = '⚙️ System';
        }

        const promotionMessage = `
🔔 *IMRAN BOT DETECTED A PROMOTION!* 🔔

🙌 Promoted:
${promotedUsernames.map(name => `✨ ${name}`).join('\n')}

🎯 By: ${promotedBy}
🗓️ On: ${new Date().toLocaleString()}

📢 Congrats, you’re now an admin! 
Welcome to the *Dark Side* – we have commands. 😈`;

        await sock.sendMessage(groupId, {
            text: promotionMessage,
            mentions: mentionList
        });
    } catch (error) {
        console.error('Auto-promotion error:', error);
    }
}

module.exports = { promoteCommand, handlePromotionEvent };

const isOwner = require('../lib/isOwner');
const { addSudoUser } = require('../lib/sudomanager');

async function sudoCommand(sock, chatId, message, args) {
  try {
    if (args[0] === 'add') {
      const sudoUser = message.quoted ? message.quoted.sender : message.mentionedJid[0];
      if (sudoUser && await isOwner(message.sender)) {
        await addSudoUser(sudoUser);
        await sock.sendMessage(chatId, { text: `✅ Added @${sudoUser.split('@')[0]} as sudo user!`, mentions: [sudoUser] });
      } else {
        await sock.sendMessage(chatId, { text: '🚫 Only owners can add sudo users!' });
      }
    }
  } catch (error) {
    console.error('Error in sudo command:', error);
    await sock.sendMessage(chatId, { text: '❌ Failed to add sudo user. Please try again.' });
  }
}

module.exports = { sudoCommand };

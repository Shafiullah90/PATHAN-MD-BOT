const isOwner = require('../lib/isOwner');
const { addSudoUser } = require('../lib/sudomanager');

async function sudoCommand(sock, chatId, message, args) {
  if (args[0] === 'add') {
    const sudoUser = message.quoted ? message.quoted.sender : message.mentionedJid[0];
    if (sudoUser && isOwner(message.sender)) {
      addSudoUser(sudoUser);
      await sock.sendMessage(chatId, { text: `Added @${sudoUser.split('@')[0]} as sudo user!`, mentions: [sudoUser] });
    } else {
      await sock.sendMessage(chatId, { text: 'Only owners can add sudo users!' });
    }
  }
}

module.exports = { sudoCommand };

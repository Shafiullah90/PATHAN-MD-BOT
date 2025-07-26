async function sudoCommand(sock, chatId, message, args) {
  try {
    if (args[0] === 'add') {
      const sudoUser = message.quoted ? message.quoted.sender : message.mentionedJid[0];
      if (sudoUser && isOwner(message.sender)) {
        addSudoUser(sudoUser);
        await sock.sendMessage(chatId, { text: `Added @${sudoUser.split('@')[0]} as sudo user!`, ...channelInfo, mentions: [sudoUser] });
      } else {
        await sock.sendMessage(chatId, { text: 'Only owners can add sudo users!', ...channelInfo });
      }
    }
  } catch (error) {
    console.error('Error in sudo command:', error);
    await sock.sendMessage(chatId, { text: '❌ Failed to execute sudo command. Please try again.' }, { quoted: message });
  }
}

module.exports = { sudoCommand };

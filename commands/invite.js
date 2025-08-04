async function inviteCommand(sock, chatId, senderId, isSenderAdmin, isBotAdmin, message) {
  if (!isSenderAdmin) {
    await sock.sendMessage(chatId, { text: 'Only group admins can get the invite link.' }, { quoted: message });
    return;
  }
  if (!isBotAdmin) {
    await sock.sendMessage(chatId, { text: 'Please make the bot an admin to generate the invite link.' }, { quoted: message });
    return;
  }
  
  try {
    const inviteCode = (await sock.groupInviteCode(chatId));
    const inviteLink = `https://chat.whatsapp.com/inviteCode`;
    await sock.sendMessage(chatId,  text: `Here’s the invite link for this group:{inviteLink}` }, { quoted: message });
  } catch (err) {
    await sock.sendMessage(chatId, { text: 'Failed to get invite link. Make sure the bot is admin.' }, { quoted: message });
  }
}

module.exports = inviteCommand;

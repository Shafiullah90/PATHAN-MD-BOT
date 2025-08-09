const { isAdmin } = require('../lib/isAdmin');

async function antibotCommand(sock, chatId, message) {
  if (!await isAdmin(sock.user.id)) {
    await sock.sendMessage(chatId, { text: 'Only admins can use this command!' });
    return;
  }

  const antibotStatus = await getAntibotStatus(chatId); // You'll need to implement this functionfunction
  if (antibotStatus) {
    await sock.sendMessage(chatId, { text: 'Antibot is already enabled in this group!' });
    return;
  }

  await enableAntibot(chatId); // You'll need to implement this function
  await sock.sendMessage(chatId, { text: 'Antibot enabled successfully!' });
}

async function handleAntibotEvent(sock, groupId, message) {
  const senderId = message.key.remoteJid;
  const isBot = await isBotUser(senderId); // You'll need to implement this functionfunction
  if (isBot && await getAntibotStatus(groupId)) {
    await sock.groupParticipantsUpdate(groupId, [senderId], 'remove');
    await sock.sendMessage(groupId, { text: 'Bot detected and removed!' });
  }
}

module.exports = { antibotCommand, handleAntibotEvent };

let antiBotGroups = {};

async function antibotCommand(sock, chatId, message, args, isGroup, isGroupAdmin) {
  if (!isGroup) return sock.sendMessage(chatId, { text: '❌ This command is for *groups only*.' }, { quoted: message });
  if (!isGroupAdmin) return sock.sendMessage(chatId, { text: '❌ Only *admins* can use this command.' }, { quoted: message });

  const command = args[0]?.toLowerCase();

  if (command === 'on') {
    antiBotGroups[chatId] = true;
    await sock.sendMessage(chatId, { text: '✅ Anti-bot is now *enabled*. Bots will be auto-kicked!' }, { quoted: message });
  } else if (command === 'off') {
    delete antiBotGroups[chatId];
    await sock.sendMessage(chatId, { text: '❎ Anti-bot has been *disabled*.' }, { quoted: message });
  } else {
    await sock.sendMessage(chatId, { text: '⚙️ Use `.antibot on` or `.antibot off`.' }, { quoted: message });
  }
}

async function checkForBots(sock, groupId, participants) {
  if (!antiBotGroups[groupId]) return;

  for (const user of participants) {
 if (!user.isAdmin && user.id.includes('bot') || user.id.includes('@g.us')) {
      await sock.groupParticipantsUpdate(groupId, [user.id], 'remove');
    }
  }
}

module.exports = { antibotCommand, checkForBots };

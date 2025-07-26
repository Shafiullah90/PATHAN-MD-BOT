const { loadSudo, saveSudo } = require('../sudoList'); // adjust path if needed

async function sudoCommand(sock, chatId, message, sender) {
  const senderNumber = sender.split('@')[0];
  const isOwner = senderNumber === '66620925025'; // your number

  if (!isOwner) {
    return await sock.sendMessage(chatId, { text: "❌ Only bot owner can add sudo users." }, { quoted: message });
  }

  const mentioned = message.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
  if (mentioned.length === 0) {
    return await sock.sendMessage(chatId, {
      text: "⚠️ Mention a user to add as sudo.\nExample: `.sudo @user`"
    }, { quoted: message });
  }

  const sudoList = loadSudo();
  const newUser = mentioned[0].split('@')[0];

  if (sudoList.includes(newUser)) {
    return await sock.sendMessage(chatId, { text: "✅ User is already a sudo." }, { quoted: message });
  }

  sudoList.push(newUser);
  saveSudo(sudoList);

  await sock.sendMessage(chatId, { text: `✅ Added @${newUser} as sudo.` }, {
 quoted: message,
    mentions: [mentioned[0]]
  });
}

module.exports = { sudoCommand };

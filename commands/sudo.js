const { loadSudo } = require('./sudo'); // Make sure this is here

async function sudoCommand(sock, chatId, message, sender) {
  const senderNumber = sender.split('@')[0];
  const isOwner = senderNumber === '66620925025'; // Replace with your number

  if (!isOwner) {
[26/07, 10:35 am] ChatGPT: return await sock.sendMessage(chatId, { text: "❌ Only bot owner can add sudo users." }, { quoted: message });
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

  // Add newUser to sudoList and save (you need to implement save logic)
  sudoList.push(newUser);
  // await saveSudo(sudoList); // If you have a save function

  await sock.sendMessage(chatId, { text: `✅ Added @${newUser} as sudo!` }, { quoted: message });
}

module.exports = { sudoCommand };

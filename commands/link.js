async function linkCommand(sock, chatId, message) {
  const groupInviteLink = "https://chat.whatsapp.com/YourGroupInviteCode"; // Replace with your actual invite link

  const buttonMessage = {
    text: "🚀 Join our awesome group by clicking the button below!",
    footer: "Group Invite",
    buttons: [
      { buttonId: 'join_group', buttonText: { displayText: 'Join Group' }, type: 1 }
    ],
    headerType: 1
  };

  await sock.sendMessage(chatId, buttonMessage, { quoted: message });
}

// Handle the button press event somewhere in your main.js or handler:
sock.ev.on('messages.upsert', async (m) => {
  // Your usual message handler here...

  if (m.messages && m.messages[0]) {
    const msg = m.messages[0];
    const chatId = msg.key.remoteJid;
    const sender = msg.key.participant || msg.key.remoteJid;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || '';

    if (text === '.link') {
      await linkCommand(sock, chatId, msg);
      return;
    }
 if (msg.message?.buttonsResponseMessage) {
      if (msg.message.buttonsResponseMessage.selectedButtonId === 'join_group') {
        await sock.sendMessage(chatId, { text: "Here's the invite link: https://chat.whatsapp.com/YourGroupInviteCode" }, { quoted: msg });
      }
    }
  }
});

module.exports = { linkCommand };

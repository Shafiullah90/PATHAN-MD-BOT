// commands/kiss.js
module.exports = {
  name: 'kiss',
  alias: ['kiss', 'muah'],
  description: 'Send a virtual kiss 😘',
  category: 'fun',

  async run({ conn, m, args }) {
    try {
      const sender = m.sender;
      const chatId = m.chat;

      // ✅ Target (the person being kissed)
      const mentionedJid = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : null;

      if (!mentionedJid) {
        return await conn.sendMessage(chatId, { text: "💋 Tag someone to kiss!\nExample: *.kiss @user*" }, { quoted: m });
      }

      // Format sender & target as @username
      const senderTag = "@" + sender.split("@")[0];
      const targetTag = "@" + mentionedJid.split("@")[0];

      // Different kiss lines
      const lines = [
        `😘 ${senderTag} sends a sweet kiss to ${targetTag}!`,
        `💋 ${senderTag} blows a magical kiss toward ${targetTag}!`,
        `😍 ${senderTag} can’t resist and kisses ${targetTag} passionately!`,
        `❤️ ${senderTag} gives ${targetTag} the warmest kiss ever!`,
        `🔥 ${senderTag} kisses ${targetTag} with full love and energy!`
      ];

      const message = lines[Math.floor(Math.random() * lines.length)];

      // ✅ Reply with mention (both sender + target get highlighted)
      await conn.sendMessage(chatId, {
        text: message,
        mentions: [sender, mentionedJid]
      }, { quoted: m });

    } catch (err) {
      console.error("❌ Kiss command error:", err);
      await conn.sendMessage(m.chat, { text: "💔 Oops! Something went wrong with the kiss command." }, { quoted: m });
    }
  }
};

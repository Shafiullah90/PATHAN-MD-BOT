module.exports = {
  name: "crush",
  alias: ["mycrush", "loveletter"],
  description: "Send a fake love confession to your crush 💘",
  category: "fun",
  async run({ conn, m }) {
    const target = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : null);

    if (!target)
      return m.reply("😢 You need to *tag or reply* to someone you have a crush on!");

    const phrases = [
      "💌 *Dear @{user},*\nEver since I saw you typing `.menu`, my heart hasn't been the same.",
      "💘 I don’t need Google anymore… I’ve already found what I’m looking for. It’s you, @{user}.",
      "🫀 My heart goes brrr every time you say 'hi'. Will you be my `.owner`?",
      "❤️‍🔥 You're the only bug in my code I never want to fix. @{user}, you're my crush!",
      "🎯 I was gonna flirt with you in a classy way, but then I remembered this is WhatsApp... So hey @{user}, date me?"
    ];

    const line = phrases[Math.floor(Math.random() * phrases.length)].replace("{user}", target.split("@")[0]);

    await conn.sendMessage(m.chat, {
      text: line,
      mentions: [target]
    }, { quoted: m });
  },
};

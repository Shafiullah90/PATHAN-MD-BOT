module.exports = {
  name: "gaycheck",
  alias: ["gayrate", "howgay"],
  description: "Check how gay someone is 😆",
  category: "fun",
  async run({ conn, m }) {
    const target =
      m.mentionedJid[0] ||
      (m.quoted ? m.quoted.sender : m.sender);

    const percent = Math.floor(Math.random() * 101);

    const captions = [
      "🏳️‍🌈 Gayness Level Detected!",
      "🌈 Whoa! Rainbow vibes spotted!",
      "💅 This one walks with extra sparkle!",
      "😏 Closet: Opened",
      "✨ Certified Fruit Ninja!"
    ];

    const caption = `👨‍❤️‍💋‍👨 *GAY DETECTOR REPORT* 👨‍❤️‍💋‍👨\n\n🧍 Target: @${target.split("@")[0]}\n🌈 Gay Level: *${percent}%*\n\n_${captions[Math.floor(Math.random() * captions.length)]}_`;

    await conn.sendMessage(m.chat, { text: caption, mentions: [target] }, { quoted: m });
  },
};

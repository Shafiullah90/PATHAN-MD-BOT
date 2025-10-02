// commands/virus.js
module.exports = {
  name: "virus",
  alias: ["cutevirus", "lovepocalypse"],
  description: "Playful 'virus' command that spreads love and fun 😍",
  category: "fun",

  async run({ conn, m }) {
    try {
      if (!m.isGroup) {
        return await conn.sendMessage(m.chat, { text: "❌ This command works only in groups!" }, { quoted: m });
      }

      // Get all participants
      const metadata = await conn.groupMetadata(m.chat);
      const participants = metadata.participants.map(p => p.id);

      if (!participants || participants.length === 0) {
        return await conn.sendMessage(m.chat, { text: "⚠️ Could not fetch group members." }, { quoted: m });
      }

      // Pick random “infected” members (1-3 people)
      const infectedCount = Math.min(3, participants.length);
      const shuffled = participants.sort(() => 0.5 - Math.random());
      const infected = shuffled.slice(0, infectedCount);

      // Cute/funny virus lines
      const virusLines = [
        "💖 Spreading LOVE 💖",
        "🌸 Infectious Happiness 🌸",
        "😍 Overload of Sparkles 😍",
        "🌈 Rainbow vibes incoming 🌈",
        "💌 Sending hugs to everyone 💌",
        "✨ Too much cute detected ✨"
      ];

      const messages = infected.map(user => {
        const line = virusLines[Math.floor(Math.random() * virusLines.length)];
        return `⚡ ${line}\n💞 Infected: @${user.split("@")[0]}`;
      });

      // Send all messages
      for (const msg of messages) {
        await conn.sendMessage(m.chat, { text: msg, mentions: infected }, { quoted: m });
      }

    } catch (err) {
      console.error("❌ Virus command error:", err);
      await conn.sendMessage(m.chat, { text: "❌ Something went wrong spreading love-virus 😅" }, { quoted: m });
    }
  }
};

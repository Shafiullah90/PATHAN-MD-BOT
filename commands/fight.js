// commands/fight.js
module.exports = {
  name: "fight",
  alias: ["battle", "vs"],
  description: "Simulate a funny battle between two group members ⚔️😂",
  category: "fun",

  async run({ conn, m }) {
    try {
      if (!m.isGroup) {
        return await conn.sendMessage(m.chat, { text: "❌ This command works only in groups!" }, { quoted: m });
      }

      // Get group participants
      const metadata = await conn.groupMetadata(m.chat);
      const participants = metadata.participants.map(p => p.id);

      if (!participants || participants.length < 2) {
        return await conn.sendMessage(m.chat, { text: "⚠️ Not enough members to fight 😅" }, { quoted: m });
      }

      let fighter1, fighter2;

      // If user mentions 2 people, use them
      if (m.mentionedJid && m.mentionedJid.length >= 2) {
        fighter1 = m.mentionedJid[0];
        fighter2 = m.mentionedJid[1];
      } else if (m.mentionedJid && m.mentionedJid.length === 1) {
        fighter1 = m.sender;
        fighter2 = m.mentionedJid[0];
      } else {
        // Randomly pick 2 members
        const shuffled = participants.sort(() => 0.5 - Math.random());
        fighter1 = shuffled[0];
        fighter2 = shuffled[1];
      }

      // Funny battle outcomes
      const outcomes = [
        `💥 Boom! @${fighter1.split("@")[0]} throws a pie at @${fighter2.split("@")[0]}! 😂`,
        `⚡ Clash! @${fighter2.split("@")[0]} dodges and counters with tickles! 🤣`,
        `🔥 Intense fight! @${fighter1.split("@")[0]} slips on a banana peel! 🍌`,
        `😂 Epic showdown! Both @${fighter1.split("@")[0]} and @${fighter2.split("@")[0]} end up hugging instead 💖`,
        `💪 Final blow! @${fighter2.split("@")[0]} wins by making @${fighter1.split("@")[0]} laugh uncontrollably 🤭`
      ];

      const chosen = outcomes[Math.floor(Math.random() * outcomes.length)];

      await conn.sendMessage(m.chat, {
        text: `⚔️ *GROUP FIGHT ALERT* ⚔️\n\n${chosen}`,
        mentions: [fighter1, fighter2]
      }, { quoted: m });

    } catch (err) {
      console.error("❌ Fight command error:", err);
      await conn.sendMessage(m.chat, { text: "❌ Something went wrong with the fight 😅" }, { quoted: m });
    }
  }
};

const { sendMessage } = require('@whiskeysockets/baileys');
const ghostNames = [
  "Eliza Thorn 1847", "William Black 1792", "Annabelle Crow 1865",
  "Thomas Grin 1821", "Margaret Hollow 1803", "Jacob Mort 1833"
];

function getRandomGhost() {
  return ghostNames[Math.floor(Math.random() * ghostNames.length)];
}

function getRandomUsers(participants, count = 3) {
  const realUsers = participants.filter(p => !p.admin && !p.isSuperAdmin && !p.id.includes("broadcast"));
  return realUsers.sort(() => 0.5 - Math.random()).slice(0, count);
}

module.exports = {
  name: "ghosttrace",
  alias: ["ghost", "ghostdetect", "ghosthunter"],
  description: "Detects and removes fake ghosts from the group (prank)",
  category: "Fun",
  async run({ sock, m, participants, groupMetadata }) {
    const targets = getRandomUsers(participants);

    if (targets.length === 0) {
      return m.reply("No ghostly activity detected in this group. 👻");
    }

    let message = `👻 *GHOST TRACE SYSTEM ONLINE*\n\n`;
    for (const target of targets) {
      const ghostName = getRandomGhost();
      message += `🧠 Detected lost soul: *${ghostName}*\n📍 Attached to: @${target.id.split('@')[0]}\n\n`;
    }

    message += "🛠 Initiating ghost removal sequence...\n";

    await sock.sendMessage(m.chat, {
      text: message,
      mentions: targets.map(u => u.id)
    });

    // Countdown & prank ban
    for (let i = 10; i >= 1; i--) {
      await new Promise(r => setTimeout(r, 700));
      await sock.sendMessage(m.chat, { text: `👁 Removing ghost in ${i}...`, edit: m.key });
    }

    // Fake ban message
    for (const target of targets) {
      await sock.sendMessage(m.chat, {
        text: `✅ Ghost ${getRandomGhost()} successfully exorcised from @${target.id.split('@')[0]}.\n💀 Ghost permanently banned.`,
        mentions: [target.id]
      });
    }

    // Final spooky message
    await sock.sendMessage(m.chat, {
      text: `⚠️ *Ghost threat neutralized.*\n👁 Stay vigilant... they always come back...`,
    });
  }
};

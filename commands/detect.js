module.exports = {
  name: "detect",
  description: "Funny command from IMRAN BOT",
  category: "fun",
  async run({ conn, m, args }) {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const messages = ['Scanning phone for sus files...', 'Found: crush_chat.txt, biryani_memes.mp4, last_seen_hidden.apk', 'Do you want to report yourself to the FBI? [Y/N]'];
    for (const msg of messages) {
      await delay(2000);
      await conn.sendMessage(m.chat, { text: msg }, { quoted: m });
    }
  }
};

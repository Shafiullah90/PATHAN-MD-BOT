const path = require('path');

module.exports = {
  name: 'alive',
  alias: ['bot'],
  category: 'general',
  desc: 'Check if bot is alive',
  async exec({ sock, m }) {
    const audioPath = path.join(__dirname, '../assets/audio1.mp3');
    await sock.sendMessage(m.chat, {
      audio: { url: audioPath },
      mimetype: 'audio/mpeg',
      ptt: true
    }, { quoted: m });
  }
};

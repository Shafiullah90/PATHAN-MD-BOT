const moment = require('moment-timezone');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

async function githubCommand(sock, chatId, message) {
  try {
    const res = await fetch('https://api.github.com/repos/ahmadtech12/IMRAN-BOT');
    if (!res.ok) throw new Error('GitHub API fetch failed');
    const json = await res.json();

    const caption = `
┏━━━━━━━━━━━━━━━🔧
┃    👨‍💻 *IMRAN BOT - GITHUB INFO*
┗━━━━━━━━━━━━━━━🔧

📁 *Repo Name:* ${json.name}
⭐ *Stars:* ${json.stargazers_count}
🍴 *Forks:* ${json.forks_count}
👀 *Watchers:* ${json.watchers_count}
💾 *Repo Size:* ${(json.size / 1024).toFixed(2)} MB
🕘 *Updated:* ${moment(json.updated_at).format('DD/MM/YY - HH:mm:ss')}
🌐 *URL:* ${json.html_url}

✨ _Don’t forget to ⭐ & fork the repo!_

🧠 *Powered by IMRAN BOT*
📍 _Stay curious, stay coding!_
`;

    const imgPath = path.join(__dirname, '../assets/june_menu.jpg'); // Rename your image accordingly
    const imgBuffer = fs.existsSync(imgPath)
      ? fs.readFileSync(imgPath)
      : null;

    if (imgBuffer) {
      await sock.sendMessage(chatId, {
        image: imgBuffer,
        caption: caption.trim(),
        contextInfo: {
          externalAdReply: {
            title: "IMRAN BOT GitHub Repo",
            body: "Star & Fork to Support!",
            thumbnail: imgBuffer,
            mediaType: 1,
            renderLargerThumbnail: true,
            sourceUrl: json.html_url
          }
        }
      }, { quoted: message });
    } else {
      await sock.sendMessage(chatId, { text: caption }, { quoted: message });
    }

  } catch (err) {
    console.error('❌ GitHub Command Error:', err);
    await sock.sendMessage(chatId, {
      text: '❌ *Oops!* Could not fetch repository info.\nCheck your internet or try again later.',
      quoted: message
    });
  }
}

module.exports = githubCommand;

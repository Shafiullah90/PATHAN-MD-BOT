// commands/shafi.js

module.exports = {

  name: 'shafi',

  alias: ['shafi', 'shafipathan', 'pathanking'],

  description: 'Shows stylish, rainbow-colored info and image about Shafi Pathan 😎',

  category: 'fun',

  lastUsed: {},

  async run({ conn, m }) {

    try {

      const chatId = m.chat;

      const sender = m.sender;

      if (!this.lastUsed[chatId]) this.lastUsed[chatId] = {};

      if (!this.lastUsed[chatId][sender]) this.lastUsed[chatId][sender] = 0;

      this.lastUsed[chatId][sender] += 1;

      const rainbow = ['🌈','💖','✨','🔥','💎','🌟','🎉','🧩','🪐','🌹','💫'];

      // Combine ALL stylish messages (previous flirt-style + compliment-style + new)

      const messages = [

        `🌟 *Shafi Pathan* 🌟\nA passionate developer & WhatsApp bot master 🤖\nCreator of PATHAN-BOT 💖\nAlways coding with ❤️ & style ✨`,

        `🔥 *Shafi Pathan* 🔥\nThe king of WhatsApp bots 👑\nFun, utilities & magic in every chat 🎉\nPowered by passion & creativity 🚀`,

        `💎 *Shafi Pathan* 💎\nLegend of coding & emojis 🌈\nYour friendly WhatsApp bot genius 😎\nMaking every chat pop with magic ✨`,

        `🌹 *Shafi Pathan* 🌹\nFlirts with creativity, codes with charm 😘\nEvery command is a piece of art 💻✨`,

        `💫 *Shafi Pathan* 💫\nTurning ideas into magic 🌈\nYour WhatsApp bot hero 🤖\nAlways brightening chats 🎉`,

        `🪐 *Shafi Pathan* 🪐\nInnovator, coder, emoji master 😎\nPATHAN-BOT is the proof 💖\nSpreading fun & utility 🚀`,

        `🎉 *Shafi Pathan* 🎉\nCreator of fun & prank commands 😏\nBringing laughter to WhatsApp groups 💬💖`,

      ];

      // Mix random emojis into text

      const animatedText = messages[Math.floor(Math.random() * messages.length)]

        .split('').map(c => `${rainbow[Math.floor(Math.random()*rainbow.length)]}${c}`).join('');

      if (this.lastUsed[chatId][sender] % 2 === 1) {

        // Odd times: show rainbow-styled message

        await conn.sendMessage(chatId, {

          text: animatedText,

          mentions: [sender],

        }, { quoted: m });

      } else {

        // Even times: show image with rainbow caption

        await conn.sendMessage(chatId, {

          image: { url: 'https://files.catbox.moe/o0nw0z.jpeg' },

          caption: `${rainbow.join('')} Here’s Shafi Pathan in all glory! 😎\nThe creator of PATHAN-BOT 💖\n${rainbow.reverse().join('')}`,

        }, { quoted: m });

      }

    } catch (err) {

      console.error('❌ Shafi command error:', err);

      await conn.sendMessage(m.chat, {

        text: '💔 Oops! Something went wrong while showing Shafi info...',

      }, { quoted: m });

    }

  }

};


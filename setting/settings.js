const fs = require('fs');

//~~~~~~~~~~~ 👑 Owner & Bot Identity ~~~~~~~~~~~//
global.owner = "93703802176";
global.developer = "93703802176";
global.bot = "";
global.devname = "💻 Shafi Hacks";
global.ownername = "👑 Shafi pathan";
global.botname = "🤖 PATHAN BOT";
global.versisc = "2.0.0";
global.packname = "✨PATHAN BOT✨";

//~~~~~~~~~~~ 🌐 Social Links ~~~~~~~~~~~//
global.linkwa = "https://wa.me/93703802176";
global.linkyt = "https://www.youtube.com/@Shafiullah";
global.linktt = "https://tiktok.com/@afghanlion";
global.linktele = "https://t.me/Shafi";

//~~~~~~~~~~~ ⚙️ Bot Settings ~~~~~~~~~~~//
global.prefix = ["", "!", ".", ",", "#", "/", "🎭", "〽️"];
global.autoRecording = false;
global.autoTyping = true;
global.autorecordtype = false;
global.autoread = false;
global.autobio = true;
global.anti92 = false;
global.owneroff = false;
global.autoswview = true;

//~~~~~~~~~~~ 🖼️ Bot Thumbnails ~~~~~~~~~~~//
global.thumbbot = "https://files.catbox.moe/y8hpsw.jpeg";
global.thumbown = "https://files.catbox.moe/y8hpsw.jpeg";

//~~~~~~~~~~~ 📣 Channel Info ~~~~~~~~~~~//
global.idchannel = "120363403266464072@newsletter*";
global.channelname = "🌐 PATHAN BOT UPDATES";
global.channel = "https://chat.whatsapp.com/JvIe71GfSU9IYDBO8YRsDu";

//~~~~~~~~~~~ 💬 Custom Messages ~~~~~~~~~~~//
global.mess = {
  developer: "🛠️ *[ Developer Only ]*\nThis feature is only for bot developers!",
  owner: "👑 *[ Owner Only ]*\nOnly the owner of PATHAN BOT can use this!",
  group: "👥 *[ Group Only ]*\nThis command works in group chats only!",
  private: "📥 *[ Private Chat Only ]*\nUse this in a private chat!",
  admin: "🛡️ *[ Admin Only ]*\nThis command is for group admins only!",
  botadmin: "🤖 *[ Bot Must Be Admin ]*\nI need admin rights to do this!",
  wait: "⏳ *Please wait...*\nProcessing your request...",
  error: "❌ *Oops!*\nAn error occurred, please try again later.",
  done: "✅ *Done!*\nSuccessfully completed your request!"
};

//~~~~~~~~~~~ 🔄 Auto Reload on Save ~~~~~~~~~~~//
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log('\x1b[0;32m' + __filename + ' \x1b[1;32mupdated!\x1b[0m');
  delete require.cache[file];
  require(file);
});

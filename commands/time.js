module.exports = {
  name: "time",
  alias: ["timezone", "clock"],
  description: "Check the current time for any country/timezone 🌍",
  category: "utility",

  async run({ conn, m, args }) {
    try {
      // Must provide timezone
      if (!args[0]) {
        return await conn.sendMessage(m.chat, {
          text: `❗ Usage:\n.time Asia/Kabul\n\n🌍 Example:\n.time Asia/Islamabad\n.time Europe/London\n.time America/New_York\n\n🔰 *PATHAN BOT TIME SYSTEM*`
        }, { quoted: m });
      }

      const timezone = args[0];
      let currentDate;

      try {
        currentDate = new Date().toLocaleString("en-GB", { timeZone: timezone });
      } catch (error) {
        return await conn.sendMessage(m.chat, {
          text: `❌ Invalid timezone!\n\n✅ Example:\n.time Asia/Kabul\n.time Asia/Islamabad\n\n🌍 Find valid timezones here: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones\n\n🔰 *PATHAN BOT TIME SYSTEM*`
        }, { quoted: m });
      }

      await conn.sendMessage(m.chat, {
        text: `🕒 *Current Time in ${timezone}*\n\n📅 Date & Time: ${currentDate}\n\n🔰 *PATHAN BOT TIME SYSTEM*`
      }, { quoted: m });

    } catch (err) {
      console.error("❌ Time command error:", err);
      await conn.sendMessage(m.chat, { text: "❌ Something went wrong while fetching time.\n🔰 *PATHAN BOT TIME SYSTEM*" }, { quoted: m });
    }
  }
};

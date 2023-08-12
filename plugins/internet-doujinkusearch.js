import { doujinkusearch } from "../lib/scraper/doujinku.js";
let handler = async (m, { conn, text }) => {
  if (!text) throw "Judul?";
  try {
    const data = await doujinkusearch(text);
    if (!data.length) {
      m.reply("Not found");
    } else {
      let result = "";
      for (let i of data) {
        const teks = `*Title :* ${i.title}\n*Rating :* ${i.rating}\n*Link :* ${i.link}\n\n`;
        result += teks;
      }
      m.reply(result.trim());
    }
  } catch (err) {
    console.log(err.message);
    m.reply("tar di fix(kalo bisa)");
  }
};
handler.tags = ["internet"];
handler.command = /^doujinku(search)?$/i;
handler.help = ["doujinku"];
export default handler;

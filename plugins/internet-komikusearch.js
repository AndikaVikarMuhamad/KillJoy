import { komiku } from "../lib/scraper/index.mjs";
let handler = async (m, { conn, text }) => {
  if (!text) throw "Nyari apa??";
  try {
    const data = await komiku(text);
    let result = "";
    for (const v of data) {
      const teks = `*Title :* ${v.title}\n*Title Id :* ${v.title_id}\n*Link :* ${v.link}\n*Spoiler :* ${v.spoiler}\n\n`;
      result += teks;
    }
    conn.sendThumb(
      m.chat,
      result,
      data[0].title,
      data[0].title_id,
      data[0].img,
      data[0].link,
      m
    );
  } catch (err) {
    console.log(err.message);
    m.reply("tar di fix(kalo bisa)");
  }
};

handler.tags = ["internet"];
handler.command = /^komik(u)?$/i;
handler.help = ["komiku"];
export default handler;

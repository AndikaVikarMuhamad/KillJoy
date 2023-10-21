import { r34videosearch } from "../lib/scraper/index.mjs";

let handler = async (m, { conn, text }) => {
  if (!text) throw "Nyari apa nyet??\ncontoh: .r34vids furry";
  try {
    const data = await r34videosearch(text);
    let result = `*Pages :* ${data[0].page}\n\n`;
    for (const v of data) {
      const teks = `*Title :* ${v.title}\n*Link :* ${v.link}\n*Image :* ${v.img}\n\n`;
      result += teks;
    }
    conn.sendThumb(
      m.chat,
      result.trimEnd(),
      data[0].title,
      text,
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
handler.command = /^r(ule)?34vid(eo)?s(earch)?$/i;
handler.help = ["r34video"];
handler.alias = ["r34video", "rule34video"];

export default handler;

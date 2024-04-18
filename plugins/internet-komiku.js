import { komikudetail } from "../lib/scraper/index.mjs";

let handler = async (m, { conn, args }) => {
  if (!args) throw "Linknya mana?";
  try {
    const data = await komikudetail(args[0]);
    let genres = "";
    for (const v of data.genres) {
      genres += v + ", ";
    }
    let chapter = "";
    for (const v of data.chapter_list) {
      const teks = `*${v.chapter}*\n*Upload date :* ${v.upload_date}\n*Link :* ${v.link}\n\n`;
      chapter += teks;
    }
    const result =
      `*Title :* ${data.title}\n*Title Id :* ${data.title_id}\n*Jenis :* ${data.jenis}\n*Status :* ${data.status}\n*Author :* ${data.komikus}\n*Sinopsis :* ${data.sinopsis}\n*Genres :* ${genres}\n\n*Chapter list*\n${chapter}`.trim();
    conn.sendThumb(
      m.chat,
      result,
      data.title,
      data.title_id,
      data.img,
      args[0],
      m
    );
  } catch (err) {
    console.log(err.message);
    m.reply("tar di fix(kalo bisa)");
  }
};
handler.tags = ["internet"];
handler.command = /^komik(u)?detail$/i;
handler.help = ["komikudetail"];
export default handler;

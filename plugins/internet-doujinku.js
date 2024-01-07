import { doujinkudetail } from "../lib/scraper/index.mjs";
let handler = async (m, { conn, args }) => {
  if (!args[0]) throw "link?";
  try {
    const data = await doujinkudetail(args[0]);
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
      `*Title :* ${data.title}\n*Alt title :* ${data.alt_title}\n*Released :* ${data.released}\n*Author :* ${data.author}\n*Last Update :* ${data.updated_on}\n*Genres :* ${genres}\n\n*Chapter list*\n${chapter}`.trim();
    conn.sendThumb(
      m.chat,
      result,
      data.title,
      data.alt_title,
      data.thumb,
      args[0],
      m
    );
  } catch (err) {
    console.log(err.message);
    m.reply("tar di fix(kalo bisa)");
  }
};
handler.tags = ["internet"];
handler.command = /^d((oujinku)?detail)$/i;
handler.help = ["doujinkudetail"];
export default handler;
// https://doujinku.co/manga/secret-class/

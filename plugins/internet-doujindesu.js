import { doujindesudetail, getBuffer } from "../lib/scraper/index.mjs";
let handler = async (m, { conn, args }) => {
  if (!args[0]) throw "link?";
  try {
    const data = await doujindesudetail(args[0]);
    let genres = "";
    for (const i of data.genres) {
      genres += i + ", ";
    }
    let chapter = "";
    for (const v of data.chapter_list) {
      const teks = `*${v.chapter}*\n*Link :* ${v.link}\n\n`;
      chapter += teks;
    }
    const result = `*Title :* ${data.title}\n*Alt title :* ${data.alt_title}\n*Status :* ${data.status}\n*Type :* ${data.type}\n*Series :* ${data.series}\n*Group :* ${data.group}\n*Rating :* ${data.rating}\n*Create date :* ${data.create_date}\n*Genres :* ${genres}\n\n*Chapter list*\n\n${chapter}`;
    // conn.sendFile()
    const img = await getBuffer(data.thumb, {
      headers: {
        Referer: "https://212.32.226.234/",
      },
    });

    conn.sendFile(m.chat, img, "", result, m);
  } catch (err) {
    console.log(err.message);
    m.reply("tar di fix(kalo bisa)");
  }
};
handler.tags = ["internet"];
handler.command = /^d((oujind)?esudetail)$/i;
handler.help = ["doujindesudetail"];
export default handler;

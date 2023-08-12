import { doujindesu } from "../lib/scraper/index.mjs";
let handler = async (m, { conn, text }) => {
  if (!text) throw "Query?? jangan pedo pedo tapinya";
  try {
    const data = await doujindesu(text);
    let result = "";
    for (const v of data) {
      result += `*Title :* ${v.title}\n*Type :* ${v.type}\n*Score :* ${v.score}\n*Img :* ${v.img}\n*Link :* ${v.link}\n\n`;
    }
    m.reply(result.trim());
  } catch (err) {
    console.log(err.message);
    m.reply("tar di fix(kalo bisa)");
  }
};
handler.tags = ["internet"];
handler.command = /^(doujin)?desu$/i;
handler.help = ["doujindesu"];
export default handler;

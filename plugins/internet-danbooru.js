import { danbooru } from "../lib/scraper/index.mjs";

let handler = async (m, { conn, text }) => {
  if (!text) throw "Nyari apa nyet??\n contoh : .dbooru glasses";
  try {
    const result = await danbooru(text);
    conn.sendFile(m.chat, result.img, "", text, m);
  } catch (err) {
    m.reply("Emror\nPeriksa kembali tags");
    console.log(err.message);
  }
};
handler.help = ["danbooru"];
handler.tags = ["internet"];
handler.alias = ["danbooru", "dbooru"];
handler.command = /^(d(anbooru|booru))$/i;
export default handler;

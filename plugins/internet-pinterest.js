import { pinterest } from "../lib/scraper/index.mjs";
let handler = async (m, { conn, text }) => {
  if (!text) throw "Nyari apa nyet??\n contoh : .pin anime";
  try {
    const result = await pinterest(text);
    conn.sendFile(m.chat, result.img, "", text, m);
  } catch (err) {
    m.reply("Emror\nPeriksa kembali query");
    console.log(err.message);
  }
};
handler.help = ["pinterest"];
handler.tags = ["internet"];
handler.alias = ["pin", "pinterest"];
handler.command = /^(pin(terest)?)$/i;
export default handler;

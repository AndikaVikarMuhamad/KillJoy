import { instagram } from "../lib/scraper/index.mjs";
let handler = async (m, { conn, args }) => {
  if (!args[0]) throw `Input *URL*`;
  try {
    const result = await instagram(args[0]);
    for (const v of result) {
      conn.sendFile(m.chat, v, "", "", m);
    }
  } catch (err) {
    m.reply("terjadi kesalahan");
    console.log(err);
  }
};
handler.help = ["instagram"];
handler.tags = ["downloader"];
handler.alias = ["ig", "igdl", "instagram", "instagramdl"];
handler.command = /^(ig(dl)?|instagram(dl)?)$/i;
export default handler;

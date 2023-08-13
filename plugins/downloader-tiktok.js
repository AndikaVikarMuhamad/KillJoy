import { tiktokdl } from "../lib/scraper/index.mjs";

let handler = async (m, { conn, args }) => {
  try {
    const result = await tiktokdl(args[0]);
    const text = `*Nickname :* ${result.nickname}\n*Views :* ${result.views}\n*Likes :* ${result.likes}\n*Comments :* ${result.comments}\n*Shares :* ${result.shares}\n*Saved :* ${result.saved}`;
    if (result.type === "slide") {
      await conn.sendFile(m.chat, result.images[0], "", text, m); //Buat anunya ceritanya
      for (let v = 1; v < result.images.length; v++) {
        conn.sendFile(m.chat, result.images[v], "", "", m);
      }
      conn.sendFile(m.chat, result.mp3, "", "", m);
      console.log(result.mp3);
      // m.reply(text);
    } else {
      conn.sendFile(m.chat, result.no_wm, "", text, m);
    }
  } catch (err) {
    m.reply("ada kesalahan");
    console.log(err.message);
  }
};
handler.tags = ["downloader"];
handler.command = /^tt(dl)?|tiktok(dl)?$/i;
handler.help = ["tiktok"];
handler.alias = ["tiktokdl", "ttdl", "tiktok", "tt"];
export default handler;
// https://www.tiktok.com/@cekala/video/7218930293556743430
// https://www.tiktok.com/@cekala/video/7251823389374041345 <--- Slide

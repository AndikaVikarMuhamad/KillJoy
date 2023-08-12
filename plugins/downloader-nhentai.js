import { nhentai, toPDF } from "../lib/scraper/index.mjs";

let handler = async (m, { conn, text }) => {
  if (isNaN(text) || !text) throw "Pake angka blok";
  if (text.length > 6 || text.length < 4)
    throw "Apa coba, min 4 digit & maks 6 digit";
  try {
    const data = await nhentai(text);
    let tags = "";
    for (const v of data.tags) {
      tags += `${v} ,`;
    }
    let teks = `*Title :* ${data.title}\n*Title Japan :* ${data.title_japan}\n*Title Pretty :* ${data.title_pretty}\n*Language :* ${data.language}\n*Tags :* ${tags}`;
    const imagepdf = await toPDF(data.image_links);
    await m.reply(
      "*Downloading...*\n\nJika terlalu lama mungkin filenya terlalu besar"
    );
    conn.sendMessage(
      m.chat,
      {
        document: imagepdf,
        fileName: data.title + ".pdf",
        mimetype: "application/pdf",
        caption: teks,
        contextInfo: {
          externalAdReply: {
            showAdAttribution: true,
            title: data.title,
            body: data.title_pretty,
            thumbnailUrl: data.cover,
            sourceUrl: `https://nhentai.net/g/${text}`,
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      },
      { quoted: m }
    );
  } catch (err) {
    console.log(err.message);
    m.reply("tar di fix(kalo bisa)");
  }
};
handler.tags = ["downloader"];
handler.command = /^nh(entai)?(dl)?$/i;
handler.help = ["nhentai"];
export default handler;

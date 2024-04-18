import { nhsearch, toPDF, pickrandom } from "../lib/scraper/index.mjs";

let handler = async (m, { conn, text }) => {
  const [query, sort = "popular-week", page = 1] = text.split("|");
  if (!text) throw "Nyari apaaaaan";
  try {
    const res = await nhsearch(query, sort, page);
    const data = pickrandom(res);
    let teks = `*Title :* ${data.title}\n*Title Japan :* ${data.title_japan}\n*Title Pretty :* ${data.title_pretty}\n*Language :* ${data.language}\n*Tags :* $`;
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
handler.tags = ["internet"];
handler.command = /^nh(entai)?search$/i;
handler.help = ["nhentaisearch"];
export default handler;

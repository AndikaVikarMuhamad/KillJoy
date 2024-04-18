let handler = async (m, { conn }) => {
  await conn.sendMessage(
    m.chat,
    {
      text: "text",
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          title: "a",
          body: "",
          thumbnailUrl:
            "https://i.pinimg.com/564x/0e/f6/63/0ef6636a81f1758477e24b590ac28efb.jpg",
          sourceUrl: "gc",
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
    },
    { quoted: m }
  );
};
handler.command = /^t(est)?$/i;
// handler.tags = ["a"];
export default handler;

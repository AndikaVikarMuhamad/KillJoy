import axios from "axios";
import { diffusion } from "../lib/scraper/index.mjs";
let handler = async (m, { conn, text }) => {
  if (!text) throw "Masukan prompt nya";
  let [
    prompt,
    negative_prompt = "ng_deepnegative_v1_75t, badhandv4 (worst quality:2), (low quality:2), (normal quality:2), lowres, bad anatomy, bad hands, normal quality, ((monochrome)), ((grayscale))",
    model_name = "majicmixRealistic_v2.safetensors",
  ] = text.split("|");

  //  Ntah lah lagi lucu lucunya
  try {
    let status_code;
    const { img } = await diffusion(prompt, negative_prompt, model_name);
    const v = setTimeout(() => {
      status_code = 200;
      console.log(status_code);
    }, 30000);
    while (status_code !== 200) {
      try {
        const { status } = await axios.get(img);
        status_code = status;
        if (status_code == 200) {
          conn.sendFile(m.chat, img, "", text, m);
          clearTimeout(v);
        }
      } catch (err) {}
    }
  } catch (err) {
    console.log(err.message);
    m.reply("ada yang salah :D");
  }
};
handler.tags = ["internet"];
handler.command = /^(stable)?diffusion|imagine$/i;
handler.help = ["diffusion"];
export default handler;

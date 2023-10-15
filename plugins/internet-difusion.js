import axios from "axios";
import { diffusion } from "../lib/scraper/index.mjs";
let handler = async (m, { conn, text }) => {
  if (!text) throw "Masukan prompt nya";
  let [
    prompt,
    negative_prompt = "lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, artist name",
    version = "09a5805203f4c12da649ec1923bb7729517ca25fcac790e640eaa9ed66573b65",
  ] = text.split("|");
  try {
    //  Ntah lah lagi lucu lucunya

    let ini = null;
    const { result } = await diffusion(prompt);
    const opt = {
      method: "GET",
      headers: {
        cookie: "replicate_anonymous_id=1f86c6e6-bd11-4f6f-a32a-503b616fdf18",
        Cookie:
          "replicate_anonymous_id=3e89b585-6fe7-43b4-b369-b405e907e114; rl_page_init_referrer=RudderEncrypt%3AU2FsdGVkX18C6%2Bhpvh66iZh5rbB%2BYcC11vO8tPdEKudie1WLNq308SNKsJgKuls6; rl_page_init_referring_domain=RudderEncrypt%3AU2FsdGVkX1%2FkaPc2BoAD0tMCDozHVI7f2jykvw5mU28kuHscYE540FZ8YTar%2BNVp; csrftoken=iYVrXRVUVPfSotf3dlB26VBk2T2VSg7v; sessionid=mwrueufcb7n3qrn27pm9sbtzc11ia9ue; rl_trait=RudderEncrypt%3AU2FsdGVkX18RtI1HybtT8Yp1CPaPldAmPfqsUaz9S78%3D; rl_group_id=RudderEncrypt%3AU2FsdGVkX1%2FXy1Eda9BzChXrGRRxrXolAmzR%2BoDeK3Q%3D; rl_group_trait=RudderEncrypt%3AU2FsdGVkX1%2F1TNyj6LUk3Fqpmo9FEtR9deGIVJt47TA%3D; rl_anonymous_id=RudderEncrypt%3AU2FsdGVkX19FsKl9q4i%2FNkqk2nfNHLpp77UU%2FjRaFaPi4NKERl84l9GBTSmrJE4ETPeKh%2FCHJegM02mT3IE8Lw%3D%3D; rl_user_id=RudderEncrypt%3AU2FsdGVkX19NGZkgdsdR27tNNtSj26rWPbFi30m4dhM%3D; rl_session=RudderEncrypt%3AU2FsdGVkX1%2FjZ5rAtxRQcuhM5y3QuMShZXHy8LUUTx0BW1FXfNoiqJT0XNPHlsqM4j3KHCdt82phFQ78tfxSAOfOHb3erOSkKVgP6m8lzM%2Bslm47yfv7wyaZGSjMB%2BDMLR3YLPxX42ytT67UcPeSqg%3D%3D",
      },
    };
    const { data } = await axios(result, opt);
    const v = setTimeout(() => {
      ini = "asdasdasd";
      console.log(ini);
    }, 60000);
    while (data.completed_at == ini) {
      const { data } = await axios(result, opt);
      ini = data.completed_at;
      if (data.completed_at !== null) {
        clearTimeout(v);
        const apal = data.output;
        // console.log(data);
        conn.sendFile(m.chat, apal, "", text, m);
        // console.log(apal);
      }
    }
  } catch (err) {
    console.log(err.message);
    m.reply("ada yang salah :D");
  }
  //  Ntah lah lagi lucu lucunya
  // try {
  //   let status_code;
  //   const { img } = await diffusion(prompt, negative_prompt, model_name);
  //   const v = setTimeout(() => {
  //     status_code = 200;
  //     console.log(status_code);
  //   }, 30000);
  //   while (status_code !== 200) {
  //     try {
  //       const { status } = await axios.get(img);
  //       status_code = status;
  //       if (status_code == 200) {
  //         conn.sendFile(m.chat, img, "", text, m);
  //         clearTimeout(v);
  //       }
  //     } catch (err) {}
  //   }
  // } catch (err) {
  //   console.log(err.message);
  //   m.reply("ada yang salah :D");
  // }
};
handler.tags = ["internet"];
handler.command = /^(stable)?diffusion|imagine$/i;
handler.help = ["diffusion"];
export default handler;

import axios from "axios";
import cheerio from "cheerio";

const tiktokdl = (url) =>
  new Promise((resolve, reject) => {
    axios
      .get("https://ttsave.app/id")
      .then(async (response) => {
        const html = response.data;
        const startTag = "axios.post('";
        const endTag = "', {";
        const startIndex = html.indexOf(startTag) + startTag.length;
        const endIndex = html.indexOf(endTag);
        const tkn = html.substring(startIndex, endIndex);
        const { data } = await axios
          .post(tkn, {
            id: url,
          })
          .catch(reject);
        const C = cheerio.load(data);
        const nickname = C("h2.font-extrabold.text-xl.text-center").text();
        const desc = C("p.text-gray-600.px-2").text().trim();
        const views = C(
          "div.flex.flex-row.items-center.justify-center > :nth-child(1) > span"
        ).text();
        const likes = C(
          "div.flex.flex-row.items-center.justify-center > :nth-child(2) > span"
        ).text();
        const comments = C(
          "div.flex.flex-row.items-center.justify-center > :nth-child(3) > span"
        ).text();
        const saved = C(
          "div.flex.flex-row.items-center.justify-center > :nth-child(4) > span"
        ).text();
        const shares = C(
          "div.flex.flex-row.items-center.justify-center > :nth-child(5) > span"
        ).text();
        const temp = [];
        C("#button-download-ready > a ").each((i, e) => {
          temp.push(C(e).attr("href"));
        });
        let result = {
          nickname,
          desc,
          views,
          likes,
          comments,
          saved,
          shares,
        };
        if (temp.length < 3) {
          result.type = "video";
          result.no_wm = temp[0];
          result.wm = temp[1];
        } else {
          let images = [];
          const img = temp.filter((v) => /jpeg/.test(v));
          for (let i = 0; i < img.length - 1; i++) {
            images.push(img[i]);
          }
          const mp3 = temp.filter((v) => /mp3/.test(v))[0];
          result.type = "slide";
          result.images = images;
          result.mp3 = mp3;
        }
        if (!desc && !views) {
          reject({
            message: "Not found :D",
          });
        }
        resolve(result);
      })
      .catch((err) => {
        resolve(err);
      });
  });

export { tiktokdl };

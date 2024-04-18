import axios from "axios";
import cheerio from "cheerio";
import { pickrandom } from "./allfunc.js";

const konachan = (tags) =>
  new Promise((resolve, reject) => {
    axios
      .get(`https://konachan.net/post?tags=${tags}`)
      .then(async (response) => {
        const html = response.data;
        const C = cheerio.load(html);
        const get_pages = C("#paginator > .pagination > :nth-child(9)").text();
        const pages = Math.floor(Math.random() * Number(get_pages));
        const { data } = await axios.get(
          `https://konachan.net/post?page=${pages}&tags=${tags}`
        );
        const CC = cheerio.load(data);
        const datas = [];
        CC("#post-list-posts > li").each((i, e) => {
          const link = C(e).find("a").attr("href");
          datas.push("https://konachan.net" + link);
        });
        const result = pickrandom(datas);
        const ajg = await axios.get(result);
        const CCC = cheerio.load(ajg.data);
        const img = CCC(".content > div").find("img").attr("src");
        const high_res = CCC(".highres-show").attr("href");
        resolve({
          result,
          img,
          high_res,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
export { konachan };

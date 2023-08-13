import axios from "axios";
import cheerio from "cheerio";
import { pickrandom } from "./allfunc.js";

const danbooru = (tags, rating = "questionable") =>
  new Promise((resolve, reject) => {
    axios
      .get(
        `https://danbooru.donmai.us/posts?tags=rating%3A${rating}+${tags}&z=5`
      )
      .then(async (response) => {
        const html = response.data;
        const C = cheerio.load(html);
        const get_pages = C(
          ".paginator.numbered-paginator > :nth-child(8)"
        ).text();
        let pages;
        if (Number(get_pages) >= 1000) {
          pages = Math.floor(Math.random() * 1000);
        } else if (Number(get_pages) <= 1000) {
          pages = Math.floor(Math.random() * Number(get_pages));
        } else {
          reject({
            message: "Not found",
          });
        }

        const { data } = await axios.get(
          `https://danbooru.donmai.us/posts?page=${pages}&tags=rating%3A${rating}+${tags}`
        );
        const CC = cheerio.load(data);
        const datas = [];
        CC("article").each((i, e) => {
          const link = C(e).find("a").attr("href");
          datas.push(`https://danbooru.donmai.us` + link);
        });
        const result = pickrandom(datas);
        const ajg = await axios.get(result);
        const CCC = cheerio.load(ajg.data);
        const img = CCC("#content > .image-container > picture")
          .find("img")
          .attr("src");
        resolve({
          link: result,
          img,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
const r34 = (tags, rating = "Questionable") =>
  new Promise((resolve, reject) => {
    axios
      .get(
        `https://rule34.xxx?page=dapi&s=post&q=index&limit=100&tags=${encodeURI(
          `${tags}+rating:${rating}`
        )}&json=1`
      )
      .then((response) => {
        const res = pickrandom(response.data);
        if (!res) {
          reject({
            status: false,
            message: "Not Found",
          });
        }
        resolve({
          status: true,
          img: res.file_url,
          tags: res.tags,
          source: res.source,
          upload_by: res.owner,
        });
      })
      .catch((err) => {
        reject(err.message);
      });
  });
export { danbooru, r34 };
// danbooru("milf")
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

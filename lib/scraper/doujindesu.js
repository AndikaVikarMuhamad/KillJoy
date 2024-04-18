import axios from "axios";
import cheerio from "cheerio";
const doujindesudl = (url) =>
  new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(async (response) => {
        const html = response.data;
        const title = cheerio.load(html)("h1").text();
        const id = cheerio.load(html)("#reader").attr("data-id");
        const { data } = await axios(
          "https://doujindesu.tv/themes/ajax/ch.php",
          {
            method: "POST",
            headers: {
              Origin: "https://doujindesu.tv",
              Referer: url,
              "Content-Type": "application/x-www-form-urlencoded",
              "X-Requested-With": "XMLHttpRequest",
            },
            data: new URLSearchParams(
              Object.entries({
                id: id,
              })
            ),
          }
        );
        const C = cheerio.load(data);
        const img = [];
        C("img").each((i, e) => {
          img.push(C(e).attr("src"));
        });
        const result = { title, img };
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });

const doujindesu = (search) =>
  new Promise(async (resolve, reject) => {
    axios
      .get(`https://doujindesu.tv/?s=${search}`)
      .then(async (response) => {
        const html = response.data;
        const C = cheerio.load(html);
        const data = [];
        C("article").each((i, e) => {
          const title = C(e).find(".title").text().trim();
          const img = C(e).find("img").attr("src");
          const score = C(e).find(".score").text().trim();
          const link = C(e).find("a").attr("href");
          const type = C(e).find(".type").text().trim();
          const result = {
            title,
            type,
            score,
            img,
            link: `https://doujindesu.tv${link}`,
          };
          data.push(result);
        });
        if (data.length === 0) {
          const error = {
            message: "Doujin tidak di temukan",
          };
          reject(error);
        }
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
const doujindesudetail = (url) =>
  new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
        // Ntahlah lagi kocak kocaknya XD
        const html = response.data;
        const C = cheerio.load(html);
        const clone = C("h1.title").clone();
        clone.find(".alter").remove();
        const title = clone.text().trim();
        const thumb = C("figure.thumbnail > a > img").attr("src");
        const alt_title = C(".alter").text();
        const status = C("table > tbody > :nth-child(1)").find("a").text();
        const type = C(".magazines").find("a").text();
        const series = C(".parodies").find("a").text();
        const group = C(".pages").find("a").text();
        const rating = C(".rating-prc").text();
        const create_date = C(".created > :nth-child(2)").text();
        const genres = [];
        C(".tags > a").each((i, e) => {
          genres.push(C(e).text().trim());
        });
        const chapter_list = [];
        C("#chapter_list > ul > li").each((i, e) => {
          const chapter = C(e).find("span.eps > a").attr("title");
          const link =
            "https://doujindesu.tv" + C(e).find("span.eps > a").attr("href");
          chapter_list.push({
            chapter,
            link,
          });
        });
        const result = {
          title,
          alt_title,
          thumb,
          status,
          type,
          series,
          group,
          rating,
          create_date,
          genres,
          chapter_list,
        };
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
// doujindesudl(
//   "https://doujindesu.tv/jounetsuteki-na-natsu-no-resort-o-yuigahama-oyako-to/"
// )
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
export { doujindesudl, doujindesu, doujindesudetail };
// load_data
//https://doujindesu.tv/manga/mukuchi-na-koushinchou-joshi-no-gyutto-shasei-kanri/
// https://doujindesu.tv/giji-ja-nai-yatsu-o-shite-kureru-itoko-no-bakunyuu-gradol-oneechan/
//https://doujindesu.tv/jounetsuteki-na-natsu-no-resort-o-yuigahama-oyako-to/

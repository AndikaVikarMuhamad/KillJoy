import axios from "axios";
import cheerio from "cheerio";
const extension = {
  g: "gif",
  j: "jpg",
  p: "png",
};
const a = ["popular-today", "popular-week", "popular"];
const nhsearch = (query, sort = "popular-today", page = 1) =>
  new Promise((resolve, reject) => {
    axios
      .get(
        `http://129.150.63.211:3002/api/galleries/search?query=${query}&sort=${sort}&page=${page}`
      )
      .then(({ data }) => {
        let result = [];
        for (const v of data.result) {
          const { id, media_id } = v;
          const title = v.title.english;
          const title_japan = v.title.japanese;
          const title_pretty = v.title.pretty;
          const language = v.tags.find((x) => x.type === "language").name;
          const cover = `https://external-content.duckduckgo.com/iu/?u=https://t7.nhentai.net/galleries/${
            v.media_id
          }/cover.${extension[v.images.cover.t]}`;
          let tags = [];
          for (const x of v.tags) {
            tags.push(x.name);
          }
          const upload_date = new Date(v.upload_date * 1000).toLocaleDateString(
            "id",
            {
              day: "numeric",
              month: "long",
              year: "numeric",
              timeZone: "Asia/Jakarta",
            }
          );
          const image_links = [];
          const images = v.images.pages.map((v) => v.t);
          for (let i = 0; i < images.length; i++) {
            const link = `https://external-content.duckduckgo.com/iu/?u=https://i.nhentai.net/galleries/${
              v.media_id
            }/${i + 1}.${extension[images[i]]}`;
            image_links.push(link);
          }
          result.push({
            id,
            media_id,
            title,
            title_japan,
            title_pretty,
            upload_date,
            language,
            tags,
            cover,
            image_links,
          });
        }
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
const nhentai = (code) =>
  new Promise((resolve, reject) => {
    if (isNaN(code)) {
      reject({
        message: "code harus angka",
      });
    }

    axios
      .get(`http://129.150.63.211:3002/api/gallery/${code}`)
      .then(({ data }) => {
        const img = data.images.pages;
        const images = img.map((v) => v.t);
        const title = data.title.english;
        const title_japan = data.title.japanese;
        const title_pretty = data.title.pretty;
        const tags = [];
        const language = data.tags.find((x) => x.type === "language").name;
        for (const v of data.tags) {
          tags.push(v.name);
        }
        const cover = `https://external-content.duckduckgo.com/iu/?u=https://t7.nhentai.net/galleries/${
          data.media_id
        }/cover.${extension[data.images.cover.t]}`;
        const image_links = [];
        for (let i = 0; i < images.length; i++) {
          const link = `https://external-content.duckduckgo.com/iu/?u=https://i.nhentai.net/galleries/${
            data.media_id
          }/${i + 1}.${extension[images[i]]}`;
          image_links.push(link);
        }

        resolve({
          title,
          title_japan,
          title_pretty,
          language,
          tags,
          cover,
          image_links,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
// nhentai(422962);
// nhentai(177013);
// nhentai(467141);
// nhsearch("milf");
export { nhentai, nhsearch };

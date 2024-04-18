import axios from "axios";
import cheerio from "cheerio";
const extension = {
  g: "gif",
  j: "jpg",
  p: "png",
};
const a = ["popular-today", "popular-week", "popular"];
const nhsearch = (query) =>
  new Promise(async (resolve, reject) => {
    try {
      const a = encodeURIComponent(query);
      const pages = await axios.get(
        `https://same.yui.pw/api/v6/search/milf%20%20/1/popular-today`
      );
      const page = Math.ceil(pages.data.num_pages * Math.random());
      const { data } = await axios.get(
        `https://same.yui.pw/api/v6/search/milf%20%20/${page}/popular-today`
      );
      const result = [];
      for (const v of data.result) {
        const title = v.title.english;
        const title_japan = v.title.japanese;
        const title_pretty = v.title.pretty;
        const cover = `https://external-content.duckduckgo.com/iu/?u=https://t7.nhentai.net/galleries${v.cover.t.replace(
          /https?:\/\/[abcd].kontol.online\/api\/imageV2\/t/,
          ""
        )}`;
        const image_links = [];
        const { num_pages, pages_string } = v;
        for (let i = 0; i < v.pages_string.length; i++) {
          const link = `https://external-content.duckduckgo.com/iu/?u=https://i.nhentai.net/galleries/${
            v.media_id
          }/${i + 1}.${extension[pages_string[i]]}`;
          image_links.push(link);
        }

        result.push({
          title,
          title_japan,
          title_pretty,
          cover,
          image_links,
          num_pages,
        });
      }
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
// nhsearch("milf");
const nhentai = (code) =>
  new Promise((resolve, reject) => {
    if (isNaN(code)) {
      reject({
        message: "code harus angka",
      });
    }
    axios
      .get(`https://cin.guru/v/${code}`)
      .then((response) => {
        const raw = response.data
          .split('<script id="__NEXT_DATA__" type="application/json">')[1]
          .split("</script>")[0];
        const data = JSON.parse(raw).props.pageProps.data;
        const title = data.title.english;
        const title_japan = data.title.japanese;
        const title_pretty = data.title.pretty;
        const cover = `https://external-content.duckduckgo.com/iu/?u=https://t7.nhentai.net/galleries${data.images.cover.t.replace(
          /https?:\/\/[abcd].kontol.online\/api\/imageV2\/t/,
          ""
        )}`;
        const media_id = data.media_id;
        const image_links = data.images.pages.map((v) => {
          // const x = v.t;
          return `https://external-content.duckduckgo.com/iu/?u=https://i.nhentai.net/galleries${v.t.replace(
            /https?:\/\/[abcd].kontol.online\/api\/imageV2\/i/,
            ""
          )}`;
        });
        const language = data.tags.find((v) => {
          return v.type === "language";
        }).name;
        let tag = data.tags.filter((v) => {
          return v.type === "tag";
        });
        const tags = [];
        for (const v of tag) {
          tags.push(v.name);
        }
        const result = {
          title,
          title_japan,
          title_pretty,
          cover,
          media_id,
          language,
          tags,
          image_links,
        };
        resolve(result);
        console.log(result);
      })
      .catch((err) => {
        reject(err);
      });
  });

// nhentai(422962);
// nhentai(177013);
//nhentai(467141);
// nhsearch("milf");
export { nhentai, nhsearch };

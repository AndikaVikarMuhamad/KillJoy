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
        let page;
        if (Number(get_pages) >= 1000) {
          page = Math.floor(Math.random() * 1000);
        } else if (Number(get_pages) <= 1000) {
          page = Math.floor(Math.random() * Number(get_pages));
        } else {
          reject({
            message: "Not found",
          });
        }

        const { data } = await axios.get(
          `https://danbooru.donmai.us/posts?page=${page}&tags=rating%3A${rating}+${tags}`
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
const r34videosearch = (query) =>
  new Promise((resolve, reject) => {
    const que = query.replace(" ", "-");
    axios
      .get(`https://rule34video.com/search/${que}/`, {
        headers: {
          cookie: "PHPSESSID=qv8mgnnrrr0ntp9tpgbppa5865; kt_ips=209.58.168.85",
          "Content-Type":
            "multipart/form-data; boundary=---011000010111000001101001",
          "User-Agent": "Insomnia/2023.5.5",
        },
      })
      .then(async (response) => {
        const html = response.data;
        const C = cheerio.load(html);
        const result = [];
        let page;
        const hehe = C(
          'a[data-block-id="custom_list_videos_videos_list_search"]:contains("Last")'
        ).text();
        if (hehe.length !== 0) {
          page = Math.floor(
            Math.random() *
              Number(
                C(
                  'a[data-block-id="custom_list_videos_videos_list_search"]:contains("Last")'
                )
                  .attr("data-parameters")
                  .replace(
                    /q:[a-zA-Z0-9%]*;sort_by:;from_videos\+from_albums:/,
                    ""
                  )
              )
          );
        } else {
          page = 1;
        }

        const { data } = await axios.get(
          `ttps://rule34video.com/search/${que}/?mode=async&function=get_block&block_id=custom_list_videos_videos_list_search&q=${query.replace(
            " ",
            "+"
          )}&sort_by=&from_videos=${page}&from_albums=${page}`,
          {
            headers: {
              cookie:
                "PHPSESSID=qv8mgnnrrr0ntp9tpgbppa5865; kt_ips=209.58.168.85",
              "Content-Type":
                "multipart/form-data; boundary=---011000010111000001101001",
              "User-Agent": "Insomnia/2023.5.5",
            },
          }
        );
        const CC = cheerio.load(data);
        CC(".thumbs > .item.thumb").each((i, e) => {
          const title = CC(e).find(".thumb_title").text();
          const img = CC(e).find(".thumb.lazy-load").attr("data-original");
          const link = CC(e).find("a.th.js-open-popup").attr("href");
          result.push({ page, title, link, img });
        });
        if (!result) {
          reject({
            message: "Not found",
          });
        }
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });

const r34videodl = (url) =>
  new Promise((resolve, reject) => {
    axios
      .get(url, {
        headers: {
          cookie: "PHPSESSID=qv8mgnnrrr0ntp9tpgbppa5865; kt_ips=209.58.168.85",
          "Content-Type":
            "multipart/form-data; boundary=---011000010111000001101001",
          "User-Agent": "Insomnia/2023.5.5",
        },
      })
      .then((response) => {
        const data = JSON.parse(
          response.data
            .split('<script type="application/ld+json">')[1]
            .split("</script>")[0]
        );
        const link = data.contentUrl;
        const thumbnail = data.thumbnailUrl;
        const title = data.name;
        const desc = data.description;
        const result = {
          title,
          thumbnail,
          desc,
          link,
        };
        resolve(result);
      })
      .catch((err) => {
        reject(err);
        console.log(err.message);
      });
  });
// r34videodl(
//   "https://rule34video.com/videos/3051243/mrs-edwards-loves-thick-college-cock/"
// );

const r34video = (query) =>
  new Promise((resolve, reject) => {
    r34videosearch(query)
      .then(async (response) => {
        const vid = pickrandom(response);
        const result = await r34videodl(vid.link);
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
// r34video("genshin 3d")
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

export { danbooru, r34, r34video, r34videosearch, r34videodl };
// danbooru("milf")
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

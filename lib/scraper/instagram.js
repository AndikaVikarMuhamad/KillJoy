import axios from "axios";
import cheerio from "cheerio";
import { FormData } from "formdata-node";

// const instagram = async (url) =>
//   new Promise((resolve, reject) => {
//     axios("https://downloadgram.org/", {
//       method: "POST",
//       data: new URLSearchParams(
//         Object.entries({
//           url: url,
//           submit: "",
//         })
//       ),
//     })
//       .then((response) => {
//         const html = response.data;
//         const C = cheerio.load(html);
//         let result = [];
//         C("#downloadhere > a").each((i, e) => {
//           const link = C(e).attr("href");
//           result.push(link);
//         });
//         if (!result) {
//           reject({
//             status: false,
//             message: "media not found",
//           });
//         }
//         resolve(result);
//       })
//       .catch((err) => {
//         resolve({
//           status: false,
//           message: "Fetching error",
//         });
//       });
//   });

//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// const instagram = (url) =>
//   new Promise((resolve, reject) => {
//     axios("https://fastdl.app/c/", {
//       method: "POST",
//       data: new URLSearchParams(
//         Object.entries({
//           url: url,
//           lang_code: "en",
//         })
//       ),
//     })
//       .then((response) => {
//         const html = response.data;
//         const C = cheerio.load(html);
//         const media = [];
//         C("#download-btn").each((i, e) => {
//           media.push(C(e).attr("href"));
//         });
//         const result = {
//           status: true,
//           media,
//         };
//         if (!media) {
//           reject({
//             status: false,
//             message: "Media not found",
//           });
//         } else {
//           resolve(result);
//         }
//       })
//       .catch((err) => {
//         reject({
//           status: false,
//           message: err.message,
//         });
//       });
//   });
const instagram = (url) =>
  new Promise((resolve, reject) => {
    axios("https://savefree.app/api/ajaxSearch", {
      method: "post",
      headers: {
        "user-agent": "insomnia/2023.4.0",
      },
      data: new URLSearchParams(
        Object.entries({
          q: url,
          lang_code: "en",
          t: "media",
        })
      ),
    })
      .then((response) => {
        const html = response.data.data;
        const C = cheerio.load(html);
        const media = [];
        C(".download-box > li").each((i, e) => {
          const link = C(e).find("a").attr("href");
          const thumb = C(e).find(".download-items__thumb > img").attr("src");
          media.push({ link, thumb });
        });
        if (!media.length) {
          reject({
            message: "Media not found",
          });
        } else {
          resolve(media);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
// instagram(
//   "https://www.instagram.com/p/Cvi53QuPCHi/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA=="
// );
// instagram(
//   "https://www.instagram.com/reel/CvjNYSut6be/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA=="
// );
// instagram(
//   "https://www.instagram.com/reel/CvbIHM_NYAX/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA=="
// );
export { instagram };

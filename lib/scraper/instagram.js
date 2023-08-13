import axios from "axios";
import cheerio from "cheerio";
const instagram = async (url) =>
  new Promise((resolve, reject) => {
    axios("https://downloadgram.org/", {
      method: "POST",
      data: new URLSearchParams(
        Object.entries({
          url: url,
          submit: "",
        })
      ),
    })
      .then((response) => {
        const html = response.data;
        const C = cheerio.load(html);
        let result = [];
        C("#downloadhere > a").each((i, e) => {
          const link = C(e).attr("href");
          result.push(link);
        });
        resolve(result);
        if (!result) {
          reject({
            status: false,
            message: "media not found",
          });
        }
      })
      .catch((err) => {
        resolve({
          status: false,
          message: "Fetching error",
        });
      });
  });

export { instagram };

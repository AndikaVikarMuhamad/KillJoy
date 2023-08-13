import axios from "axios";
import cheerio from "cheerio";
const fb = (url) =>
  new Promise((resolve, reject) => {
    axios("https://fdown.net/download.php", {
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",

        Cookie:
          "_ga=GA1.1.1919624255.1690292176; __gads=ID=09ebbf05a743efff-22dabba9f3e2004d:T=1690292180:RT=1690365192:S=ALNI_MZFYDcLSKdoX9LbZsCBbFEQXGOnsw; __gpi=UID=00000d1b6039fa62:T=1690292180:RT=1690365192:S=ALNI_MZwzj9Cq2BqrhYO0R5F6HpMvqWqGw; FCNEC=%5B%5B%22AKsRol8bQ9JLYeBBIt6OLBN4AGY9Uwnh-nglqBl2JPJT1TzScdAiSIpKSTkX9vhyxBVTDyi7AZfFYrYxWZeTWLh6rXxMhi-FlnUZiGuRUlejoX7_eCaITgdjfpbmaLVTiVEruf6jWwH5rLkC8HEcUkxlUT6BzYlJcg%3D%3D%22%5D%2Cnull%2C%5B%5D%5D; _ga_82ERN9JZD3=GS1.1.1690365186.3.1.1690365276.37.0.0",
        Origin: "https://fdown.net",
        Referer: "https://fdown.net",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      },
      data: new URLSearchParams(
        Object.entries({
          URLz: url,
        })
      ),
    })
      .then((response) => {
        const html = response.data;
        const C = cheerio.load(html);
        // console.log(response.status);
      })
      .catch((err) => {
        console.log(err.message);
        // reject(err.message);
      });
  });
// fb("https://www.facebook.com/100094266947220/videos/766046331933367/");
export { fb };

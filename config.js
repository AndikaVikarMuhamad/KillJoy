import chalk from "chalk";
import { fileURLToPath } from "url";
import { watchFile, unwatchFile, readFileSync } from "fs";

global.owner = [["6283164013535", "l", true]];

global.mods = []; // Want some help?

global.multiplier = 69; // The higher, The harder levelup

let file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright("Update 'config.js'"));
  import(`${file}?update=${Date.now()}`);
});

import chalk from "chalk";
import { fileURLToPath } from "url";
import { watchFile, unwatchFile } from "fs";

// Ini owner real no fek"
global.owner = [["6283164013535", "l", true]];

global.mods = []; // Want some help?

// Random

global.multiplier = 69; // The higher, The harder levelup

let file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright("Update 'config.js'"));
  import(`${file}?update=${Date.now()}`);
});

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}

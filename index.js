#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import box from "cli-box";
import fs from "fs";
import gradient from "gradient-string";
import figlet from "figlet";
import chalkAnimation from "chalk-animation";
import { createSpinner } from "nanospinner";

let inputString;
let stringUpperCase;
let stringAlternate;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.neon(
    "Heyyooooo. Are you ready to convert some strings? \n"
  );
  console.clear();
  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgMagenta(" What this CLI does? ")}
    You will give me a string, and I will make the string into:
    - UPPERCASE
    - UpPeR aNd LoWeR cAsE
    - creates a CSV from the string by making each character a column in the CSV file

    Let's get to it!
  `);
}

async function getString() {
  const stringInput = await inquirer.prompt({
    name: "input_string",
    type: "input",
    message: "Please enter the input that you wish to convert: ",
    default() {
      return "Sample text";
    },
  });

  inputString = stringInput.input_string;
}

async function stringConvert() {
  stringUpperCase = inputString.toUpperCase();
  let arr = inputString.split("");
  let csv = arr.join(",");

  for (let i = 0; i < arr.length; i++) {
    if (i % 2 === 0) {
      const replace = arr[i].toUpperCase();
      arr[i] = replace;
    }
  }

  stringAlternate = arr.join("");

  const spinner = createSpinner("Converting string...").start();

  await sleep();
  spinner.success();

  const b3 = box(
    "26x10",
    `
    `
  );
  console.log(`
    ${chalk.bgGreen("Yout string")}
    ${inputString}
    
    ${chalk.bgGreen("UPPERCASE")}
    ${stringUpperCase}

    ${chalk.bgGreen("Alternate case")}
    ${stringAlternate}
  `);

  fs.writeFile("input-file.csv", csv, function (err) {
    if (err) throw err;
    const msg = "CSV created";

    figlet(msg, (err, data) => {
      console.log(gradient.pastel.multiline(data));
    });
  });
}

await welcome();
await getString();
await stringConvert();

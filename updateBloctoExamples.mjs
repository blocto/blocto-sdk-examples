//  updateBloctoExamples
//
//  This script is used to update the dependencies of Blocto SDK sample projects.
//
//  Usage:
//  1. Ensure Node.js is installed before running the script.
//  2. Place the script in the root directory of the sample project.
//  3. Execute `node updateBloctoExamples.mjs` in the command line to start the script.
//  4. The script will prompt you to choose the type of samples to update (EVM or Aptos) or update all samples.
//  5. Follow the prompts and inputs; once completed, the script will update the Blocto SDK version for the selected samples.
//
//  Notes:
//  - Before running the script, ensure all sample files are backed up to prevent data loss in unforeseen circumstances.
//  - When entering the version number, ensure the correct Blocto SDK version is provided.
//  - Feel free to raise any issues or suggestions in the Issues section.
//
//  Modules used:
//  - fs module for file reading and writing.
//  - path module for handling file paths.
//  - prompts module for fetching user input in the command line.

import prompts from "prompts";
import { getDirectories, updatePackageJSON } from "./utils.js";

(async () => {
  const firstResponse = await prompts({
    type: "select",
    name: "chain",
    message: "Which chain's example do you want to update?",
    choices: [
      { title: "All", value: "all" },
      { title: "EVM", value: "evm" },
      { title: "Aptos", value: "aptos" },
    ],
  });

  let secondResponse;
  let thirdResponse;

  if (firstResponse.chain === "all") {
    thirdResponse = await prompts({
      type: "text",
      name: "sdkVersion",
      message: "Enter the version of Blocto SDK to update for all examples:",
    });

    const evmDirectories = await getDirectories("./src/evm");
    const aptosDirectories = await getDirectories("./src/aptos");
    const allDirectories = [...evmDirectories, ...aptosDirectories];

    await updatePackageJSON(
      "./src/evm",
      evmDirectories,
      thirdResponse?.sdkVersion
    );
    await updatePackageJSON(
      "./src/aptos",
      aptosDirectories,
      thirdResponse?.sdkVersion
    );

    console.log("✅ You've chosen to update all examples. 🎉", allDirectories);
    return;
  }

  if (firstResponse.chain === "evm" || firstResponse.chain === "aptos") {
    const folderPath =
      firstResponse.chain === "evm" ? "./src/evm" : "./src/aptos";
    const examples = await getDirectories(folderPath);
    secondResponse = await prompts({
      type: "multiselect",
      name: `${firstResponse.chain}Examples`,
      message: `Which ${firstResponse.chain.toUpperCase()} examples do you want to update?`,
      choices: examples.map((dir) => ({ title: dir, value: dir })),
    });
  }

  if (secondResponse) {
    thirdResponse = await prompts({
      type: "text",
      name: "sdkVersion",
      message: "Enter the version of Blocto SDK to update:",
    });
  }

  if (
    secondResponse &&
    thirdResponse &&
    (secondResponse.evmExamples || secondResponse.aptosExamples)
  ) {
    const folderPath = secondResponse.evmExamples ? "./src/evm" : "./src/aptos";
    const examples = secondResponse.evmExamples || secondResponse.aptosExamples;
    const version = thirdResponse.sdkVersion;

    await updatePackageJSON(folderPath, examples, version);
  }
})();

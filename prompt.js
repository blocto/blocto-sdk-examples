const fs = require("fs");
const prompts = require("prompts");

async function getDirectories(path) {
  return fs.promises
    .readdir(path, { withFileTypes: true })
    .then((dirents) =>
      dirents.filter((d) => d.isDirectory()).map((d) => d.name)
    );
}

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
    const evmDirectories = await getDirectories("./src/evm");
    const aptosDirectories = await getDirectories("./src/aptos");
    const allFolderName = evmDirectories
      .map((dir) => ({ title: dir, value: dir }))
      .concat(aptosDirectories.map((dir) => ({ title: dir, value: dir })));
    console.log("You've chosen to update all examples.", allFolderName);
    return;
  }

  if (firstResponse.chain === "evm") {
    const evmDirectories = await getDirectories("./src/evm");
    secondResponse = await prompts({
      type: "multiselect",
      name: "evmExamples",
      message: "Which EVM examples do you want to update?",
      choices: evmDirectories.map((dir) => ({ title: dir, value: dir })),
    });
  } else if (firstResponse.chain === "aptos") {
    const aptosDirectories = await getDirectories("./src/aptos");
    secondResponse = await prompts({
      type: "select",
      name: "aptosExamples",
      message: "Which Aptos examples do you want to update?",
      choices: aptosDirectories.map((dir) => ({ title: dir, value: dir })),
    });
  }

  if (secondResponse) {
    thirdResponse = await prompts({
      type: "text",
      name: "version",
      message: "Enter the version of blocto-sdk to update:",
    });
  }

  console.log("First Response:", firstResponse);
  console.log("Second Response:", secondResponse);
  console.log("Third Response:", thirdResponse);
})();

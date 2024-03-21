import { getDirectories, updatePackageJSON } from "./utils.js";

(async () => {
  try {
    const evmDirectories = await getDirectories("./src/evm");
    const aptosDirectories = await getDirectories("./src/aptos");
    const getNpmSdkVersion = await fetch(
      `https://registry.npmjs.org/@blocto/sdk/latest`
    )
      .then((res) => res.json())
      .then(({ version }) => version);
    // process.argv[2] from shell script verison like `yarn updatAll x.x.x`
    const version = process.argv[2]
      ? process.argv[2]
      : await getNpmSdkVersion();
    await updatePackageJSON("./src/evm", evmDirectories, version);
    await updatePackageJSON("./src/aptos", aptosDirectories, version);
  } catch (error) {
    console.error("❌ error: ", error);
  }
})();

import path from "path";
import * as fs from "fs/promises";

export async function getDirectories(path) {
  return fs
    .readdir(path, { withFileTypes: true })
    .then((dirents) =>
      dirents.filter((d) => d.isDirectory()).map((d) => d.name)
    );
}

export async function updatePackageJSON(folderPath, examples, version) {
  for (const example of examples) {
    const packageJSONPath = path.join(folderPath, example, "package.json");
    try {
      const packageJSONData = await fs.readFile(packageJSONPath, "utf-8");
      const packageJSON = JSON.parse(packageJSONData);

      if (packageJSON.dependencies && packageJSON.dependencies["@blocto/sdk"]) {
        packageJSON.dependencies["@blocto/sdk"] = version;
        await fs.writeFile(
          packageJSONPath,
          JSON.stringify(packageJSON, null, 2)
        );
        console.log(
          `✅ Updated @blocto/sdk version for ${example} to ${version} 🎉`
        );
      } else {
        console.log(`❌ No @blocto/sdk dependency found in ${example}`);
      }
    } catch (err) {
      console.error(
        `Error updating @blocto/sdk version for ${example}: ${err}`
      );
    }
  }
}

import fs from "fs-extra";

export default class FileOperations {
  async write(filePath: string, content: string) {
    await fs.outputFile(filePath, content);
  }

  async exists(filePath: string): Promise<boolean> {
    return fs.pathExists(filePath);
  }
}

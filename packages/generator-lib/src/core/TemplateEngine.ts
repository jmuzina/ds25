import ejs from "ejs";
import fs from "fs-extra";
import type { Context } from "../types/Context.js";

export class TemplateEngine {
  async render(templatePath: string, context: Context): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(templatePath, (err, data) => {
        if (err) return reject(err);
        const template = data.toString();
        const result = ejs.render(template, context);
        resolve(result);
      });
    });
  }
}

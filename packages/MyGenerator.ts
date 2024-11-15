import { Generator } from "ts-code-generator-lib";

class MyGenerator extends Generator {
  async run() {
    await this.askQuestions([
      {
        type: "input",
        name: "componentName",
        message: "What is the component name?",
      },
    ]);
    const templatePath = "./templates/component.ejs";
    const outputPath = `./generated/${this.context.componentName}.tsx`;
    await this.renderTemplate(templatePath, outputPath);
  }
}

const generator = new MyGenerator();
generator.run();

import type { Context } from "../types/Context.js";
import { FileOperations } from "./FileOperations.js";
import { Prompts, type QuestionChain } from "./Prompts.js";
import { TemplateEngine } from "./TemplateEngine.js";

export class Generator {
  private context: Context = {};
  private templateEngine: TemplateEngine;
  private fileOperations: FileOperations;
  private prompts: Prompts;

  constructor() {
    this.templateEngine = new TemplateEngine();
    this.fileOperations = new FileOperations();
    this.prompts = new Prompts();
  }

  setContext(context: Context) {
    this.context = context;
  }

  async askQuestions(questions: QuestionChain) {
    const answers = await this.prompts.ask(questions);
    this.setContext({ ...this.context, ...answers });
  }

  async renderTemplate(templatePath: string, outputPath: string) {
    const rendered = await this.templateEngine.render(
      templatePath,
      this.context,
    );
    await this.fileOperations.write(outputPath, rendered);
    console.log(`Generated file at: ${outputPath}`);
  }

  async runSubgenerator(subgenerator: Generator) {
    subgenerator.setContext(this.context);
    await subgenerator.run();
  }

  async run() {
    console.log("Running generator...");
  }
}

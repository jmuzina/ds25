import Generator, { type Question } from "yeoman-generator";
import globalContext from "./global-context.js";

export default class BaseGenerator extends Generator {
  constructor(args: string | string[], options: Generator.GeneratorOptions) {
    super(args, options);

    // Set the current working directory for the generator to the caller's working directory
    this.env.cwd = process.cwd();
  }

  private subgenerators = [
    {
      name: "component",
      description: "Create a new React component",
    },
  ];

  private questions: Question[] = [
    {
      type: "list",
      name: "subgenerator",
      message: "Please select a subgenerator",
      choices: this.subgenerators.map((subgen) => ({
        name: `${subgen.name} (${subgen.description})`,
        value: subgen.name,
      })),
      when: () => this.subgenerators.length > 1,
      default: this.subgenerators[0].name,
    },
  ];

  // In prompting mode, prompt the user to select a subgenerator and run that generator
  async prompting() {
    const answers = await this.prompt(this.questions);
    return this.composeWith(
      `${globalContext.generatorScriptIdentifer}:${answers.subgenerator || this.subgenerators[0].name}`,
    );
  }

  help() {
    const subgeneratorHelp = `
    Please call a subgenerator from the following list:
    ${this.subgenerators
      .map(
        (subgen) =>
          `\t- ${globalContext.generatorScriptIdentifer}:${subgen.name} - ${subgen.description}`,
      )
      .join("\n")}`;

    return `${super.help()}\n${subgeneratorHelp}`;
  }
}

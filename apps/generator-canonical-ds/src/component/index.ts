import path from "node:path";
import Generator from "yeoman-generator";
import {
  type AdaptedQuestionSet,
  CLIInputStrategy,
  InteractiveInputStrategy,
  getCliAnswers,
  getInteractiveAnswers,
  isInInteractiveMode,
} from "../app/adapter/index.js";
import globalContext from "../app/global-context.js";
import casing from "../utils/casing.js";

interface ComponentGeneratorAnswers {
  /** The path to the component's root directory */
  componentPath: string;
  /** Whether to include styles in the component */
  includeStyles: boolean;
  /** Whether to include a storybook story in the component */
  includeStorybook: boolean;
}

export default class ComponentGenerator extends Generator {
  inInteractiveMode!: boolean;
  answers?: ComponentGeneratorAnswers;

  questions: AdaptedQuestionSet<ComponentGeneratorAnswers> = [
    {
      name: "componentPath",
      required: true,
      types: {
        cli: String,
        interactive: "input",
      },
      inputStrategy: {
        cli: CLIInputStrategy.ARGUMENT,
        interactive: InteractiveInputStrategy.INPUT,
      },
      descriptions: {
        cli: "Component name, including its path (ex: `form/input/Checkbox`)",
        interactive:
          "Enter the component's name, including its path (ex: `form/input/Checkbox`):",
      },
      default: ".",
      filter: (input: string) => {
        const resolvedInput = path.resolve(this.env.cwd, input);
        // Force the directory name (the component name) to be PascalCased
        const dirName = path.basename(resolvedInput);
        return path.resolve(resolvedInput, "..", casing.toPascalCase(dirName));
      },
    },
    {
      name: "includeStyles",
      types: {
        cli: Boolean,
        interactive: "confirm",
      },
      inputStrategy: {
        cli: CLIInputStrategy.OPTION,
        interactive: InteractiveInputStrategy.CONFIRM,
      },
      descriptions: {
        cli: "Include styles",
        interactive: "Do you want to include styles?",
      },
      default: true,
    },
    {
      name: "includeStorybook",
      descriptions: {
        cli: "Include a story file",
        interactive: "Would you like to include a story file?",
      },
      types: {
        cli: Boolean,
        interactive: "confirm",
      },
      inputStrategy: {
        cli: CLIInputStrategy.OPTION,
        interactive: InteractiveInputStrategy.CONFIRM,
      },
      default: true,
    },
  ];

  constructor(args: string | string[], options: Record<string, unknown>) {
    super(args, options);

    if (!this.options.help) {
      this.log("Welcome to the component generator!");
      this.log(
        "This generator should be run from the root directory of all your application's components (ex: src/components).",
      );
    }

    // Sets up all CLI args. If the generator is not in interactive mode, this.answers will be set
    // all CLI args must be setup in the constructor in order for Yeoman to register options for `--help`.
    this.inInteractiveMode = isInInteractiveMode(this);
    if (!this.inInteractiveMode) {
      if (!this.options.help) {
        // The generator formerly ran in interactive mode by default, so inform people how to reach that behavior from now on.
        this.log(
          "Running in CLI mode. Run this command with --interactive for interactive mode.",
        );
      }
      this.answers = getCliAnswers(this, this.questions);
    }
  }

  /**
   * Prompts the user for answers to the generator's questions in interactive mode
   * Must be in an async function outside the constructor in order for the writing function to be called after the prompts
   */
  async prompting() {
    if (!this.inInteractiveMode) return;
    this.answers = await getInteractiveAnswers(this, this.questions);
  }

  /**
   * Gets the path to the component's directory relative to the current working directory.
   * Pascal-cases the final directory name to match React component naming conventions.
   * @param inPath - The path to resolve, relative to the current working directory
   * @return Path to the component's directory relative to the current working directory
   * @example
   * destinationPath("path/to/button/index.ts") // => "/path/to/Button/index.ts"
   */
  destinationPath(...inPath: string[]): string {
    const rawPath = super.destinationPath(...inPath);
    const dirName = path.dirname(rawPath);

    // Replace the last segment of the path with the Pascal-cased version
    const componentFolder = path.resolve(
      dirName,
      "..",
      casing.toPascalCase(path.basename(dirName)),
    );

    // Append the original file name to the new path
    const fileName = path.basename(rawPath);

    return path.join(componentFolder, fileName);
  }

  writing(): void {
    if (!this.answers) return;

    const componentName = path.basename(this.answers.componentPath);

    const templateData = {
      ...globalContext,
      ...this.answers,
      componentName,
      /** The path to the component's directory relative to the current working directory */
      componentRelativePath: path.relative(
        this.env.cwd,
        this.answers.componentPath,
      ),
      componentCssClassName:
        this.answers.includeStyles && casing.toKebabCase(componentName),
    };

    this.fs.copyTpl(
      this.templatePath("Component.tsx.ejs"),
      this.destinationPath(
        `${this.answers.componentPath}/${templateData.componentName}.tsx`,
      ),
      templateData,
    );

    this.fs.copyTpl(
      this.templatePath("index.ts.ejs"),
      this.destinationPath(`${this.answers.componentPath}/index.ts`),
      templateData,
    );

    this.fs.copyTpl(
      this.templatePath("types.ts.ejs"),
      this.destinationPath(`${this.answers.componentPath}/types.ts`),
      templateData,
    );

    this.fs.copyTpl(
      this.templatePath("Component.test.tsx.ejs"),
      this.destinationPath(
        `${this.answers.componentPath}/${templateData.componentName}.test.tsx`,
      ),
      templateData,
    );

    if (this.answers.includeStyles) {
      this.fs.copyTpl(
        this.templatePath("Component.css.ejs"),
        this.destinationPath(
          `${this.answers.componentPath}/${templateData.componentName}.css`,
        ),
        templateData,
      );
    }

    if (this.answers.includeStorybook) {
      this.fs.copyTpl(
        this.templatePath("Component.stories.tsx.ejs"),
        this.destinationPath(
          `${this.answers.componentPath}/${templateData.componentName}.stories.tsx`,
        ),
        templateData,
      );
    }
  }
}

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import type GeneratorRegistry from "./GeneratorRegistry.js";

export default class CLIManager {
  constructor(private registry: GeneratorRegistry) {}

  async run() {
    const argv = yargs(hideBin(process.argv))
      .command(
        "generate <type>",
        "Run a generator",
        (yargs) => {
          yargs.positional("type", {
            describe: "The type of generator to run",
            type: "string",
          });
        },
        async (args) => {
          const generatorName = args.type as string;
          const GeneratorClass = this.registry.get(generatorName);

          if (!GeneratorClass) {
            console.error(`No generator found for type: ${generatorName}`);
            console.log(
              "Available generators:",
              this.registry.list().join(", "),
            );
            process.exit(1);
          }

          const generator = new GeneratorClass();
          await generator.run();
        },
      )
      .command(
        "*",
        "List available generators or run a specified generator",
        () => {},
        async (args) => {
          const generatorName = args._[0] as string;

          if (!generatorName) {
            // No generator name provided, so list available generators
            console.log("Available generators:");
            this.registry.list().forEach((generator) => {
              console.log(`- ${generator}`);
            });
            return;
          }

          // If the user provides a valid generator name, we should only trigger that generator
          const GeneratorClass = this.registry.get(generatorName);

          if (!GeneratorClass) {
            console.error(`Invalid generator: ${generatorName}`);
            console.log("Available generators:", this.registry.list().join(", "));
            process.exit(1);
          }

          // Otherwise, run the specified generator
          const generator = new GeneratorClass();
          await generator.run();
        },
      )
      .help()
      .argv;
  }
}

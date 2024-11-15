import yargs from "yargs";
import GeneratorRegistry from "./GeneratorRegistry.js";
import {hideBin} from "yargs/helpers";

export default class CLIManager {
  constructor(private registry: GeneratorRegistry) {}

  async run() {
    yargs(hideBin(process.argv))
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
          const GeneratorClass = this.registry.get(args.type as string);
          if (!GeneratorClass) {
            console.error(`No generator found for type: ${args.type}`);
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
      .help().argv;
  }
}
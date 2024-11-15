import { CLIManager, GeneratorRegistry } from "@canonical/generator-lib";
import ComponentGenerator from "./component/ComponentGenerator.js";

export default async function main() {
  // Create and populate the generator registry
  const registry = new GeneratorRegistry();
  registry.register("component", ComponentGenerator);

  // Instantiate CLIManager with the populated registry
  const cliManager = new CLIManager(registry);

  // Run the CLI manager to handle user input
  await cliManager.run();
}

export * from "./component/ComponentGenerator.js";

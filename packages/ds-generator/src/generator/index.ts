import { CLIManager, GeneratorRegistry } from "@canonical/generator-lib";
import { ComponentGenerator } from "./generators/ComponentGenerator.js";

async function main() {
  // Create and populate the generator registry
  const registry = new GeneratorRegistry();
  registry.register("component", ComponentGenerator);

  // Instantiate CLIManager with the populated registry
  const cliManager = new CLIManager(registry);

  // Run the CLI manager to handle user input
  await cliManager.run();
}

// Invoke the main function to bootstrap the CLI
main().catch((err) => {
  console.error("Error executing CLI:", err);
  process.exit(1);
});

// Invoke the main function to bootstrap the CLI
import main from "./generator/index.js";

main().catch((err) => {
  console.error("Error executing CLI:", err);
  process.exit(1);
});

export * from "./generator/index.js";

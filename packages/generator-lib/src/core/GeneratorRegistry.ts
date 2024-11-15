import type Generator from "./Generator.js";

export default class GeneratorRegistry {
  private registry: Record<string, typeof Generator> = {};

  register(name: string, generator: typeof Generator) {
    this.registry[name] = generator;
  }

  get(name: string): typeof Generator | undefined {
    return this.registry[name];
  }

  list(): string[] {
    return Object.keys(this.registry);
  }
}

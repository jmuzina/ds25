import { Generator } from "@canonical/generator-lib";
import { QuestionChain } from "@canonical/generator-lib";

export class ComponentGenerator extends Generator {
  constructor() {
    super();
  }

  /**
   * Questions specific to the component generator.
   */
  private getComponentQuestions(): QuestionChain {
    return {
      componentName: {
        text: "What is the name of the component?",
        strategy: "input",
      },
      includeTests: {
        text: "Do you want to include test files?",
        strategy: "confirm",
      },
      useStorybook: {
        text: "Should Storybook files be generated?",
        strategy: "confirm",
      },
    };
  }

  /**
   * Executes the generator logic.
   */
  async run() {
    console.log("Starting Component Generator...");

    // Ask component-specific questions
    await this.askQuestions(this.getComponentQuestions());

    // Extract answers from context
    const { componentName, includeTests, useStorybook } = this.getContext();

    // Paths to templates
    const templateDir = "./templates/component";
    const outputDir = `./src/components/${componentName}`;

    // Render main component file
    await this.renderTemplate(
      `${templateDir}/Component.ejs`,
      `${outputDir}/${componentName}.tsx`
    );

    // Optionally render additional files
    if (includeTests) {
      await this.renderTemplate(
        `${templateDir}/Component.test.ejs`,
        `${outputDir}/${componentName}.test.tsx`
      );
    }

    if (useStorybook) {
      await this.renderTemplate(
        `${templateDir}/Component.stories.ejs`,
        `${outputDir}/${componentName}.stories.tsx`
      );
    }

    console.log(`Component ${componentName} generated successfully!`);
  }
}

// Usage Example
async function runComponentGenerator() {
  const componentGenerator = new ComponentGenerator();
  await componentGenerator.run();
}

runComponentGenerator().catch((error) => {
  console.error("Error running Component Generator:", error);
});

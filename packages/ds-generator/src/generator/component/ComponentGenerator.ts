import { Generator, Question } from "@canonical/generator-lib";
import type { QuestionChain } from "@canonical/generator-lib";

export default class ComponentGenerator extends Generator {
  private getComponentQuestions(): QuestionChain {
    return {
      componentName: new Question({
        text: "What is the name of the component?",
        strategy: "input",
      }),
      includeTests: new Question({
        text: "Do you want to include test files?",
        strategy: "confirm",
      }),
      useStorybook: new Question({
        text: "Should Storybook files be generated?",
        strategy: "confirm",
      }),
    };
  }

  /**
   * Executes the generator logic.
   */
  async run() {
    console.log("Starting Component Generator...");

    await this.askQuestions(this.getComponentQuestions());

    const { componentName, includeTests, useStorybook } = this.context;

    // Paths to templates
    const templateDir = "./templates/component";
    const outputDir = `./src/components/${componentName}`;

    // Render main component file
    await this.renderTemplate(
      `${templateDir}/Component.ejs`,
      `${outputDir}/${componentName}.tsx`,
    );

    // Optionally render additional files
    if (includeTests) {
      await this.renderTemplate(
        `${templateDir}/Component.test.ejs`,
        `${outputDir}/${componentName}.test.tsx`,
      );
    }

    if (useStorybook) {
      await this.renderTemplate(
        `${templateDir}/Component.stories.ejs`,
        `${outputDir}/${componentName}.stories.tsx`,
      );
    }

    console.log(`Component ${componentName} generated successfully!`);
  }
}

async function runComponentGenerator() {
  const componentGenerator = new ComponentGenerator();
  await componentGenerator.run();
}

runComponentGenerator().catch((error) => {
  console.error("Error running Component Generator:", error);
});

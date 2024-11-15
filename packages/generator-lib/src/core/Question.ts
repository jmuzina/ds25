import { confirm, input as prompt } from "@inquirer/prompts";

export type QuestionConfirmationStrategy = "input" | "confirm";
export type Answer = string | boolean;

export type QuestionChain = Record<string, Question>;
export type QuestionChainAnswers = Record<string, Answer>;

export interface QuestionOptions {
  text: string;
  strategy: QuestionConfirmationStrategy;
}

export default class Question {
  answer?: Answer;
  text!: string;
  strategy!: QuestionConfirmationStrategy;

  constructor(options: QuestionOptions) {
    const { text, strategy } = options;

    this.text = text;
    this.strategy = strategy;
  }

  private async prompt(): Promise<Answer> {
    switch (this.strategy) {
      case "input":
        return prompt({ message: this.text });
      case "confirm":
        return confirm({ message: this.text });
      default:
        throw new Error(`Unknown strategy: ${this.strategy}`);
    }
  }

  async populateAnswer(): Promise<Answer> {
    if (this.answer) {
      const overWrite = await confirm({
        message: `You have already answered this question.\n(${this.answer})\nDo you want to overwrite?`,
      });
      if (!overWrite) return this.answer;
    }
    this.answer = await this.prompt();
    return this.answer;
  }
}

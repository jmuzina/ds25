import {confirm, input as prompt} from "@inquirer/prompts";

export type QuestionConfirmationStrategy = "input" | "confirm";
export type Answer = string | boolean;
export type QuestionChain = Record<string, Question>;
export type QuestionChainAnswers = Record<string, Answer>;

export default class Question {
  answer?: Answer;

  private async prompt(): Promise<Answer> {
    switch (this.strategy) {
      case "input":
        return prompt({ message: this.text });
      case "confirm":
        return confirm({ message: this.text });
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

  constructor(
    public text: string,
    public strategy: QuestionConfirmationStrategy,
  ) {}
}
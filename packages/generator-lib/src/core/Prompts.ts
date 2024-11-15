import { confirm, input as prompt } from "@inquirer/prompts";
import type { Answer, QuestionConfirmationStrategy } from "../types/Prompts.js";

export class Question {
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
export type QuestionChain = Record<string, Question>;
export type QuestionChainAnswers = Record<string, Answer>;

export class Prompts {
  answers?: QuestionChainAnswers;

  /**
   * Ask a series of questions and return the answers
   */
  async ask(
    questions: QuestionChain = this.questions,
  ): Promise<QuestionChainAnswers> {
    this.questions = questions;

    this.answers = {};

    for (const [key, question] of Object.entries(this.questions)) {
      this.answers[key] = await question.populateAnswer();
    }

    return this.answers;
  }

  constructor(public questions: QuestionChain = {}) {}
}

// Example usage
async function run() {
  const questions: QuestionChain = {
    firstName: new Question("What's your first name?", "input"),
    lastName: new Question("What's your last name?", "input"),
    allowEmail: new Question("Do you allow us to send you email?", "confirm"),
  };

  const prompts = new Prompts(questions);

  const answers = await prompts.ask();
  console.log("Your answers:", answers);
}

run();

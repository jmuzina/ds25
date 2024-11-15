import {QuestionChain, QuestionChainAnswers} from "./Question.js";

export default class Prompts {
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

export default interface Context {
  // biome-ignore lint/suspicious/noExplicitAny: `any` is necessary to allow user to define any context
  [key: string]: any;
}

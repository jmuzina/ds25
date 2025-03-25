import type { Dispatch, FC, ReactNode, SetStateAction } from "react";

export interface UPDATE_ACTION<T extends ShowcaseExample, TValue = string> {
  type: "UPDATE_SETTING";
  payload: {
    exampleName: T["name"];
    settingName: keyof T["configurations"];
    newValue: TValue;
  };
}

export interface RESET_ACTION<T extends ShowcaseExample> {
  type: "RESET_EXAMPLE";
  payload: { exampleName: T["name"] };
}

export type ExampleAction<
  TSettings extends BaseExampleSettings = BaseExampleSettings,
  TExample extends ShowcaseExample<TSettings> = ShowcaseExample<TSettings>,
  TValue = string,
> = UPDATE_ACTION<TExample, TValue> | RESET_ACTION<TExample>;

/**
 * Configuration for an example setting.
 */
export interface ExampleSetting<TValue> {
  value: TValue;
  default?: TValue;
  skipExportFormats?: {
    css?: boolean;
  };
}

/**
 * Configuration for an example that allows selecting a number.
 */
export interface NumericExampleSetting extends ExampleSetting<number> {
  min: number;
  max: number;
  step?: number;
}

/**
 * Configuration for an example that allows selecting one choice.
 */
export interface ChoicesExampleSetting<TValue> extends ExampleSetting<TValue> {
  choices: TValue[];
}

/**
 * Configuration for an example that allows selecting multiple choices.
 */
export type MultipleChoicesExampleSetting<TValue> = Omit<
  ChoicesExampleSetting<TValue>,
  "default" | "value"
> & {
  value: TValue[];
  default: TValue[];
};

/**
 * Base settings for an example.
 */
export type BaseExampleSettings = {
  fontFamily?: ChoicesExampleSetting<string>;
  fontSize?: NumericExampleSetting;
  color?: ChoicesExampleSetting<string>;
  backgroundColor?: ChoicesExampleSetting<string>;
  lineHeight?: NumericExampleSetting;
  textAlign?: ChoicesExampleSetting<string>;
  padding?: NumericExampleSetting;
  margin?: NumericExampleSetting;
  border?: NumericExampleSetting;
  borderRadius?: NumericExampleSetting;
  boxShadow?: ChoicesExampleSetting<string>;
  textShadow?: ChoicesExampleSetting<string>;
};

export interface ShowcaseExample<
  TSettings extends BaseExampleSettings = BaseExampleSettings,
> {
  name: string;
  description: string;
  configurations: TSettings;
  component: FC;
  cssVars?: Record<string, string | number | undefined>;
}

export type ConfigState<
  TSettings extends BaseExampleSettings = BaseExampleSettings,
  TExample extends ShowcaseExample<TSettings> = ShowcaseExample<TSettings>,
> = Record<TExample["name"], TExample>;

export type ExampleRecord<
  TSettings extends BaseExampleSettings = BaseExampleSettings,
> = { [K in keyof TSettings]: ShowcaseExample<{ [P in K]: TSettings[K] }> };

export interface ConfigProviderProps<
  TSettings extends BaseExampleSettings = BaseExampleSettings,
> {
  examples: ExampleRecord<TSettings>;
  children: ReactNode;
}

export interface ConfigProviderValue<
  TSettings extends BaseExampleSettings = BaseExampleSettings,
  TExample extends ShowcaseExample<TSettings> = ShowcaseExample<TSettings>,
> {
  config: ConfigState<TSettings, TExample>;
  dispatch: Dispatch<ExampleAction<TSettings, TExample>>;
  activeExampleName?: string;
  setActiveExampleName: Dispatch<SetStateAction<string | undefined>>;
  activeExampleConfig?: TExample;
}

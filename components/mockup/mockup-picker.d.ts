// Types for components/mockup/mockup-picker.js, a classic script that sets
// globalThis.MockupPicker. See MockupPicker.prompt.md.

export interface MockupOption {
  value: string | number;
  label?: string;
  /** Marked with a dot, and the row starts on it. */
  recommended?: boolean;
}

export interface MockupDecision {
  /** URL parameter name, and data-<key> on <html> unless attr is given. */
  key: string;
  label?: string;
  attr?: string;
  /** Starting value when the URL has none; else the recommended option, else the first. */
  default?: string | number;
  options: MockupOption[];
  onChange?: (value: string) => void;
}

export interface MockupPickerConfig {
  title?: string;
  decisions?: MockupDecision[];
  /** The built-in Light / Dark / System row. false leaves it out. */
  theme?: false | { label?: string; default?: "light" | "dark" | "system" };
  collapsed?: boolean;
  /** false turns off the A / B / X / M shortcuts. */
  keys?: boolean;
  onChange?: (key: string, value: string, state: Record<string, string>) => void;
}

export interface MockupPickerApi {
  mount(config: MockupPickerConfig): MockupPickerApi;
  unmount(): void;
  get(): Record<string, string>;
  set(key: string, value: string | number): void;
}

declare global {
  // eslint-disable-next-line no-var
  var MockupPicker: MockupPickerApi;
}

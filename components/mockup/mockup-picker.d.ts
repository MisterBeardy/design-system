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
  /** false turns off the A / B / X / M / S shortcuts. */
  keys?: boolean;
  /**
   * The Notes field and the Save button. Default true. In a claude.ai artifact
   * that declares capabilities {db: {}, user: {}}, Save writes
   * `<collection>/<timestamp>` and `<collection>/latest` (collection defaults
   * to "mockup-saves"); with no db it copies the JSON to the clipboard and
   * downloads it. false leaves both Notes and Save out.
   */
  save?: boolean | { collection?: string };
  onChange?: (key: string, value: string, state: Record<string, string>) => void;
}

/** One row's choice, as saved. */
export interface MockupSavedChoice {
  value: string;
  /** The option's label, e.g. "256 blue". */
  label: string;
  /** The option's letter in the row: "A", "B", "C"… */
  option: string;
  recommended: boolean;
}

/** The document Save writes (and the JSON the local fallback copies and downloads). */
export interface MockupSave {
  /** The config's title, else document.title. */
  mockup: string;
  url: string;
  /** ISO 8601, UTC. */
  savedAt: string;
  /** Every row, the Theme row included, by key. */
  choices: Record<string, MockupSavedChoice>;
  notes: string;
  /** The viewer's opaque artifact user id (u_…), or null. */
  viewer: string | null;
}

export interface MockupSaveResult {
  ok: boolean;
  /** "db": written to the artifact. "local": copied and/or downloaded. "none": nothing saved. */
  where: "db" | "local" | "none";
  /** The db document id (an ISO timestamp with ':' as '-'), when where is "db". */
  id?: string;
  /** The downloaded file name, when where is "local" and the download ran. */
  file?: string | null;
  copied?: boolean;
  message?: string;
  error?: string;
}

export interface MockupPickerApi {
  mount(config: MockupPickerConfig): MockupPickerApi;
  unmount(): void;
  get(): Record<string, string>;
  set(key: string, value: string | number): void;
  /** Save as the Save button does. Never rejects. */
  save(): Promise<MockupSaveResult>;
  /** The Notes field's text; "" when empty or when save is off. */
  notes(): string;
}

declare global {
  // eslint-disable-next-line no-var
  var MockupPicker: MockupPickerApi;
}

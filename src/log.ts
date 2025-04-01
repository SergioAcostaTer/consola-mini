type LogLevel = "info" | "warn" | "error" | "debug";

interface LoggerConfig {
  showTimestamp?: boolean;
  fontSize?: "small" | "medium" | "large";
  fileTracing?: boolean;
  emojis?: boolean;
  theme?: "light" | "dark";
}

type Meta =
  | Record<string, unknown>
  | unknown[]
  | string
  | number
  | boolean
  | null
  | undefined;

function getColor(level: LogLevel, theme: "light" | "dark" = "dark"): string {
  const baseColors: Record<LogLevel, { dark: string; light: string }> = {
    info: { dark: "\x1b[96m", light: "\x1b[34m" }, // bright cyan / blue
    warn: { dark: "\x1b[93m", light: "\x1b[33m" }, // bright yellow / yellow
    error: { dark: "\x1b[91m", light: "\x1b[31m" }, // bright red / red
    debug: { dark: "\x1b[95m", light: "\x1b[35m" }, // bright magenta / magenta
  };

  return baseColors[level][theme];
}

const emojis: Record<LogLevel, string> = {
  info: "ℹ️ ",
  warn: "⚠️ ",
  error: "🔥",
  debug: "🐞",
};

const symbols: Record<LogLevel, string> = {
  info: "[INFO ]",
  warn: "[WARN ]",
  error: "[ERROR]",
  debug: "[DEBUG]",
};

const reset = "\x1b[0m";

const defaultConfig: LoggerConfig = {
  showTimestamp: true,
  fontSize: "medium",
  fileTracing: true,
  emojis: true,
  theme: "dark",
};

function getTime(): string {
  return new Date().toISOString().replace("T", " ").substring(0, 19);
}

function getCaller(): string {
  const stack = new Error().stack;
  if (!stack) return "";
  const lines = stack.split("\n");
  const caller = lines[4] || lines[3] || "";
  const match = caller.match(/\(([^)]+)\)/);
  return match ? match[1] : caller.trim();
}

function formatMeta(meta: Meta): string {
  if (typeof meta === "object" && meta !== null) {
    return "\n" + JSON.stringify(meta, null, 2);
  } else if (meta !== undefined) {
    return `\n${String(meta)}`;
  }
  return "";
}

function format(
  level: LogLevel,
  message: string,
  meta?: Meta,
  config: LoggerConfig = defaultConfig
): string {
  const timestamp = config.showTimestamp ? `[${getTime()}]` : "";
  const color = getColor(level, config.theme || "dark");
  const symbol = symbols[level];
  const emoji = config.emojis ? `${emojis[level]} ` : "";
  const paddedSymbol = symbol.padEnd(8);
  const caller = config.fileTracing ? ` (${getCaller()})` : "";
  const baseLine = `${timestamp} ${emoji}${paddedSymbol} ${message}${caller}`;

  const metaFormatted = formatMeta(meta);

  return `${color}${baseLine}${metaFormatted}${reset}`;
}

export const log = {
  config: defaultConfig,

  setConfig: (newConfig: Partial<LoggerConfig>) => {
    Object.assign(defaultConfig, newConfig);
  },

  info: (msg: string, meta?: Meta, cfg?: LoggerConfig) =>
    console.log(format("info", msg, meta, { ...defaultConfig, ...cfg })),

  warn: (msg: string, meta?: Meta, cfg?: LoggerConfig) =>
    console.warn(format("warn", msg, meta, { ...defaultConfig, ...cfg })),

  error: (msg: string, meta?: Meta, cfg?: LoggerConfig) =>
    console.error(format("error", msg, meta, { ...defaultConfig, ...cfg })),

  debug: (msg: string, meta?: Meta, cfg?: LoggerConfig) =>
    console.debug(format("debug", msg, meta, { ...defaultConfig, ...cfg })),
};

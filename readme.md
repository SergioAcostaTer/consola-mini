# 🪶 tiny-log

**A lightweight, zero-dependency logger for Node.js** — featuring clean formatting, emojis, meta support, stack tracing, themes, and more.

> Designed for developers who want clarity, color, and customization in their logs ✨

---

## 📦 Install

```bash
npm install tiny-log
```

---

## ⚡ Quick Start

```ts
import { log } from 'tiny-log';

log.info('Server started');
log.warn('Deprecated API usage');
log.error('Something failed');
log.debug('Fetched users', { count: 42 });
```

---

## 🔧 Global Config

```ts
log.setConfig({
  showTimestamp: true,
  emojis: true,
  fileTracing: true,
  fontSize: 'large',
  theme: 'dark', // or 'light'
});
```

---

## 🧪 Meta Support

```ts
log.info('User login', { userId: 1, name: 'Alice' });
log.error('DB Error', { code: 500, error: 'Connection refused' });
log.debug('Query result', [1, 2, 3]);
log.warn('String meta', 'Something went wrong');
```

Meta can be:
- JSON objects
- Arrays
- Strings
- Numbers
- Booleans
- null or undefined

---

## 🧩 Per-call Overrides

```ts
log.info('Minimal log', null, { showTimestamp: false, emojis: false });

log.error('No trace', { crash: true }, { fileTracing: false });
```

---

## 🎨 Themes & Colors

- `dark` (default): Bright, vibrant ANSI colors for dark terminals
- `light`: More muted colors for visibility on light backgrounds

| Level | Emoji | Dark Theme Color | Light Theme Color |
|-------|-------|------------------|-------------------|
| info  | ℹ️     | Bright Cyan      | Blue              |
| warn  | ⚠️     | Bright Yellow    | Yellow            |
| error | 🔥     | Bright Red       | Red               |
| debug | 🐞     | Bright Magenta   | Magenta           |

---

## 🔍 File Tracing

Logs include file and line number by default:

```
[2025-04-01 09:29:51] ℹ️  [INFO ]  Server started (src/index.ts:10:5)
```

Disable it globally or per log call:

```ts
log.setConfig({ fileTracing: false });
// or
log.error('No trace', {}, { fileTracing: false });
```

---

## 🧠 API Reference

```ts
log.setConfig(config: Partial<LoggerConfig>)
```

Update global defaults for all logs.

```ts
log.info(message: string, meta?: Meta, config?: LoggerConfig)
log.warn(...)
log.error(...)
log.debug(...)
```

Create a log of the given level with optional metadata and per-call config.

### Types

```ts
type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LoggerConfig {
  showTimestamp?: boolean;
  fontSize?: 'small' | 'medium' | 'large';
  fileTracing?: boolean;
  emojis?: boolean;
  theme?: 'light' | 'dark';
}

type Meta =
  | Record<string, unknown>
  | unknown[]
  | string
  | number
  | boolean
  | null
  | undefined;
```

---

## 🔥 Example Output

```
[2025-04-01 09:29:51] ℹ️  [INFO ]  User login (src/index.ts:15:3)
{
  "userId": 1,
  "name": "Alice"
}
[2025-04-01 09:29:51] 🔥 [ERROR]  DB Error
{
  "code": 500,
  "error": "Connection refused"
}
```

---

## ✅ Why tiny-log?

- ⚡ **Zero dependencies**
- 🎨 **Colorful and emoji-powered**
- 🧠 **Flexible and type-safe**
- 📁 **Stack tracing built-in**
- 🛠️ **Fully configurable per-call or globally**

---

## 🧱 Planned Features

- [ ] `log.success()` and `log.fatal()`
- [ ] File output (log to disk)
- [ ] Custom color overrides
- [ ] Test coverage & benchmarks

---

## 📄 License

MIT — Made with ❤️ by [Sergio Acosta] (https://github.com/SergioAcostTer)

# 🖋️ consola-mini

**A tiny, zero-dependency logger for Node.js backends** — colorful, clean, emoji-powered, and configurable.

> Designed for developers who want clarity, color, and customization in their logs — without the bloat ⚡

---

## 📦 Install

```bash
npm install consola-mini
```

---

## ⚡ Quick Start

```ts
import { consola } from 'consola-mini';

consola.info('Server started');
consola.warn('Deprecated API usage');
consola.error('Something failed');
consola.debug('Fetched users', { count: 42 });
```

---

## 🔧 Global Config

Set global config once at app startup (applies everywhere):

```ts
consola.setConfig({
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
consola.info('User login', { userId: 1, name: 'Alice' });
consola.error('DB Error', { code: 500, error: 'Connection refused' });
consola.debug('Query result', [1, 2, 3]);
consola.warn('String meta', 'Something went wrong');
```

Meta supports:
- Objects
- Arrays
- Strings
- Numbers
- Booleans
- `null` or `undefined`

---

## 🧩 Per-call Overrides

```ts
consola.info('No emoji, no timestamp', null, {
  showTimestamp: false,
  emojis: false,
});

consola.error('No trace', { crash: true }, {
  fileTracing: false,
});
```

---

## 🎨 Themes & Colors

- `dark` (default): Bright ANSI colors for dark terminals
- `light`: More muted colors for light backgrounds

| Level | Emoji | Dark Theme       | Light Theme |
|-------|-------|------------------|-------------|
| info  | ℹ️     | Bright Cyan      | Blue        |
| warn  | ⚠️     | Bright Yellow    | Yellow      |
| error | 🔥     | Bright Red       | Red         |
| debug | 🐞     | Bright Magenta   | Magenta     |

---

## 🔍 File Tracing

Logs include the file and line number by default:

```
[2025-04-01 09:29:51] ℹ️  [INFO ]  Server started (src/index.ts:10:5)
```

Disable it globally or per log:

```ts
consola.setConfig({ fileTracing: false });
// or
consola.error('No trace', {}, { fileTracing: false });
```

---

## 🧠 API Reference

```ts
consola.setConfig(config: Partial<LoggerConfig>)
```
Update global defaults for all logs.

```ts
consola.info(message, meta?, config?);
consola.warn(...);
consola.error(...);
consola.debug(...);
```
Create logs with optional metadata and per-call config.

### Type Definitions

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

## 🔥 Sample Output

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

## ✅ Why consola-mini?

- ⚡ **Zero dependencies**
- 🎨 **Colorful and emoji-powered**
- 🧠 **Flexible and type-safe**
- 📁 **Stack tracing built-in**
- 🔧 **Globally and per-call configurable**
- 📦 **Tiny but mighty (just a few KB)**

---

## 🧱 Planned Features

- [ ] `consola.success()` and `consola.fatal()`
- [ ] File output support (save logs to disk)
- [ ] Custom color override system
- [ ] Automatic theme detection
- [ ] CLI integration & benchmarking

---

## 📄 License

MIT — Made with ❤️ by [Sergio Acosta](https://sergioaco.com)

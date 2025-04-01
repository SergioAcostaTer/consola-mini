import { consola } from "./src/log";


// 🔧 Global Config
consola.setConfig({
  showTimestamp: true,
  emojis: true,
  fileTracing: true,
  fontSize: 'large',
});

// ✅ Basic Logs
consola.info("Server started");
consola.warn("Deprecated API usage");
consola.error("Unhandled exception");
consola.debug("Fetching data");

// ✅ With Meta
consola.info("User login", { userId: 1, name: "Alice" });
consola.error("DB Error", { code: 500, error: "Connection refused" });
consola.debug("Query result", { count: 42, rows: [1, 2, 3] });

// 🔁 Override Config Per Call
consola.info("No emoji, no timestamp", null, {
  showTimestamp: false,
  emojis: false,
});

consola.error("No file trace", { crash: true }, {
  fileTracing: false
});

consola.debug("Minimalist", null, {
  emojis: false,
  showTimestamp: false,
  fileTracing: false,
});

// 🧪 Complex Meta
consola.warn("Complex meta object", {
  user: {
    id: 123,
    email: "test@example.com",
    roles: ['admin', 'editor'],
  },
  session: {
    active: true,
    expires: new Date().toISOString()
  }
});

// ❌ Passing non-object meta
consola.info("String as meta", "Just some text");
consola.error("Number as meta", 404);
consola.debug("Array as meta", [1, 2, 3]);

// 🧪 Stack tracing test
function triggerLog() {
  anotherFunction();
}

function anotherFunction() {
  consola.warn("Trace test", { step: "inside anotherFunction" });
}

triggerLog();

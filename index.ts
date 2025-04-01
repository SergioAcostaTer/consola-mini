import { log } from "./src/log";


// 🔧 Global Config
log.setConfig({
  showTimestamp: true,
  emojis: true,
  fileTracing: true,
  fontSize: 'large',
});

// ✅ Basic Logs
log.info("Server started");
log.warn("Deprecated API usage");
log.error("Unhandled exception");
log.debug("Fetching data");

// ✅ With Meta
log.info("User login", { userId: 1, name: "Alice" });
log.error("DB Error", { code: 500, error: "Connection refused" });
log.debug("Query result", { count: 42, rows: [1, 2, 3] });

// 🔁 Override Config Per Call
log.info("No emoji, no timestamp", null, {
  showTimestamp: false,
  emojis: false,
});

log.error("No file trace", { crash: true }, {
  fileTracing: false
});

log.debug("Minimalist", null, {
  emojis: false,
  showTimestamp: false,
  fileTracing: false,
});

// 🧪 Complex Meta
log.warn("Complex meta object", {
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
log.info("String as meta", "Just some text");
log.error("Number as meta", 404);
log.debug("Array as meta", [1, 2, 3]);

// 🧪 Stack tracing test
function triggerLog() {
  anotherFunction();
}

function anotherFunction() {
  log.warn("Trace test", { step: "inside anotherFunction" });
}

triggerLog();

import { StrictMode, startTransition, createElement } from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import { StartClient } from "@tanstack/react-start/client";

// Ensure window.$_TSR exists for static hosting hydration fallback
if (typeof window !== "undefined") {
  if (!window.$_TSR) {
    window.$_TSR = {
      router: {
        manifest: { routes: {} },
        matches: [],
      },
      buffer: [],
      h: function () {
        this.hydrated = true;
      },
      e: function () {
        this.streamEnded = true;
      },
      c: function () {},
      p: function (s: () => void) {
        if (!this.initialized && this.buffer) {
          this.buffer.push(s);
        } else {
          s();
        }
      },
    };
  }
}

startTransition(() => {
  const rootElement = document.getElementById("root");
  const appElement = createElement(StrictMode, null, createElement(StartClient));

  try {
    hydrateRoot(document, appElement);
  } catch (err) {
    console.warn("Hydration fallback to client mount:", err);
    if (rootElement) {
      createRoot(rootElement).render(appElement);
    }
  }
});


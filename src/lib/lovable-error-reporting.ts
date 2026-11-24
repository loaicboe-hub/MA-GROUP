/**
 * Error logging utility for runtime boundary exceptions.
 * Completely isolated — does not connect or send telemetry to any external service.
 */
export function reportLovableError(error: unknown, context: Record<string, unknown> = {}) {
  if (process.env.NODE_ENV !== "production") {
    console.error("[Runtime Error Boundary]:", error, context);
  }
}

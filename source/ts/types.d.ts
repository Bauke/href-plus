// Fixes TypeScript thinking this isn't a correct module.
export {};

declare global {
  // These are created in `vite.config.ts` and inserted by Vite at build time.
  const blinkCommitHash: string;
  const blinkVersion: string;
  const blinkUserAgent: string;
}

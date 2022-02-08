export function isDebugEnabled(): boolean {
  return window.localStorage.getItem('debug') === 'true';
}

export function debug(...args: any[]): void {
  if (!isDebugEnabled()) {
    return;
  }

  for (const argument of args) {
    console.debug(argument);
  }
}

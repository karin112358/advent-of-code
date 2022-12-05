export function logSuccess(...messages: any[]): void {
  console.log('\x1b[32m' + messages[0], ...messages.slice(1), '\x1b[0m');
}

export function logError(...messages: any[]): void {
  console.log('\x1b[31m' + messages[0], ...messages.slice(1), '\x1b[0m');
}

export function logHighlight(message: string): void {
  console.log('\x1b[42m          ' + message + '          \x1b[0m');
}

export class ErrorUtils {
  static getStackTrace(event: Error | null, loggingServiceClassName = '') {
    let e: Error | null = event;
    if (!e || !e.stack) e = new Error();
    if (typeof e.stack !== 'string') {
      return '';  // e.stack.toString()'';
    } else {
      const lines =  e.stack
        .split('\n')
        .filter(line => !line.startsWith('Error'))
        .map(line => line.trim());
      if (loggingServiceClassName !== '') {
        loggingServiceClassName += '.';
        let i;
        for (i = lines.length - 1; i >= 0 && !lines[i].includes(loggingServiceClassName); i--) {}
        if (i >= 0) lines.splice(0, i + 1);
      }
      return lines;
    }
  }
}

/**
 * Implementations of Singleton pattern.
 *
 */

// Approach #1. Using ES6 Classes.
class Logger {
  static instance = null;

  constructor() {
    if (Logger.instance === null) {
      this.logs = [];
      Logger.instance = Object.freeze(this);
    }

    return Logger.instance;
  }

  log(message) {
    this.logs.push(`[${Date.now()}]: ${message}`);
  }

  list() {
    return this.logs.join('\n');
  }
}

// Approach #2. Using Object literals.
const config = {
  apis: [
    {
      endpoint: 'Order Service',
      url: 'https://myapp.com/api/order',
    },
    {
      endpoint: 'Weather Forecast',
      url: 'https://some.wheather.com/api',
    },
  ],
  constants: {
    maxTimeOut: 200,
    units: 'Imperial',
  },
};
const ConfigurationManager = Object.freeze({
  getConfig: (key) => config[key],
  setConfig(key, val) {
    if (Object.keys(config).includes(key)) {
      config[key] = val;
    }
  },
});

console.log(':: Singleton Pattern Test ::');
console.log('');

const logger_one = new Logger();
logger_one.log(`Message #1.`);
logger_one.log(`Message #2.`);

const logger_two = new Logger();
logger_one.log(`Message #3.`);

Logger.instance.log(`Message #4.`);

console.log(':: Approach #1');
console.log('');

console.log(`Logs from logger_one:`);
console.log(`Logs:`);
console.log(logger_one.list());
console.log();

console.log(`Logs from logger_two:`);
console.log(`Logs:`);
console.log(logger_two.list());
console.log();

console.log(`Logs from Logger.instance:`);
console.log(`Logs:`);
console.log(Logger.instance.list());
console.log();

console.log(`Are equal: ${logger_one === logger_two}`);
console.log();

console.log(':: Approach #2');
console.log('');

console.log(`APIs configuration:`);
console.log(JSON.stringify(ConfigurationManager.getConfig('apis')));
console.log();

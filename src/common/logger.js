/**
 * Simple Logger class which supports logging to command line based on a configurable log level
 * @constructor
 */
function Logger() {
}

Logger.prototype.level = 'WARN';

Logger.prototype.log = function (level, message) {
    const levels = ['DEBUG', 'INFO', 'WARN', 'ERROR'];

    if (levels.indexOf(level) >= levels.indexOf(this.level)) {
        console.log(`${level}: ${message}`);
    }
};

/**
 * Log a message in level DEBUG
 *
 * @param {String} message log message
 */
Logger.prototype.debug = function (message) {
    this.log('DEBUG', message);
};

/**
 * Log a message in level INFO
 *
 * @param {String} message log message
 */
Logger.prototype.info = function (message) {
    this.log('INFO', message);
};

/**
 * Log a message in level WARN
 *
 * @param {String} message log message
 */
Logger.prototype.warn = function (message) {
    this.log('WARN', message);
};

/**
 * Log a message in level ERROR
 *
 * @param {String} message log message
 */
Logger.prototype.error = function (message) {
    this.log('ERROR', message);
};

module.exports = new Logger();

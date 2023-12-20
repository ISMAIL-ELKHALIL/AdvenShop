/**
 * Converts the given number of days to milliseconds.
 * @param {number} days - The number of days to be converted.
 * @returns {number} - The equivalent duration in milliseconds.
 */
export function daysToMilliSeconds(days) {
  // 1 day = 24 hours, 1 hour = 60 minutes, 1 minute = 60 seconds, 1 second = 1000 milliseconds
  const millisecondsInADay = 24 * 60 * 60 * 1000;

  // Calculate and return the equivalent duration in milliseconds
  return Number(days) * millisecondsInADay;
}

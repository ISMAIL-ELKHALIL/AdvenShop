export function daysToMilliSeconds(days) {
  // 1 day = 24 hours, 1 hour = 60 minutes, 1 minute = 60 seconds, 1 second = 1000 milliseconds
  const millisecondsInADay = 24 * 60 * 60 * 1000;
  return days * millisecondsInADay;
}

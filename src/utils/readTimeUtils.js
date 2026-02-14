/**
 * Calculate the number of icons to display based on read time
 * Shows 1 icon per 5 minutes of read time (minimum 1)
 * @param {string} readTime - Read time string like "5 min" or "15 min"
 * @returns {number} Number of icons to display
 */
export function getReadTimeIconCount(readTime) {
  const minutes = parseInt(readTime.match(/\d+/)?.[0] || '0', 10)
  const iconCount = Math.ceil(minutes / 5)
  return Math.max(1, iconCount)
}

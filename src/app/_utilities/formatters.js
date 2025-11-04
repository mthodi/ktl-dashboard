/**
 * Data formatting utilities for KTL Dashboard
 * Provides consistent formatting for numbers, dates, and other data
 */

/**
 * Format large numbers with abbreviations (K, M, B)
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
export function formatNumber(num) {
  if (num === null || num === undefined) return 'N/A';

  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(2) + 'B';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(2) + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(2) + 'K';
  }

  return num.toLocaleString();
}

/**
 * Format bytes with appropriate unit (B, KB, MB, GB, TB)
 * @param {number} bytes - Number of bytes
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted bytes string
 */
export function formatBytes(bytes, decimals = 2) {
  if (bytes === null || bytes === undefined) return 'N/A';
  if (bytes === 0) return '0 B';

  bytes = bytes * 1024 * 1024; // Convert MB to Bytes, server sends MB

  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Format percentage with specified decimal places
 * @param {number} value - Value to format as percentage
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted percentage string
 */
export function formatPercentage(value, decimals = 2) {
  if (value === null || value === undefined) return 'N/A';
  return value.toFixed(decimals) + '%';
}

/**
 * Format date string to human-readable format
 * @param {string} dateString - ISO date string (YYYY-MM-DD)
 * @returns {string} Formatted date string
 */
export function formatDate(dateString) {
  if (!dateString) return 'N/A';

  const date = new Date(dateString);

  // Check if date is valid
  if (isNaN(date.getTime())) return dateString;

  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

/**
 * Format locality score to percentage
 * @param {number} score - Locality score (0-1)
 * @returns {string} Formatted percentage string
 */
export function formatLocalityScore(score) {
  if (score === null || score === undefined) return 'N/A';
  return formatPercentage(score * 100, 2);
}

/**
 * Extract top N items from an object/array
 * @param {Object|Array} data - Data to extract from
 * @param {number} n - Number of items to extract (default: 5)
 * @returns {Array} Array of top N items
 */
export function getTopN(data, n = 5) {
  if (!data) return [];

  // If it's already an array, slice it
  if (Array.isArray(data)) {
    return data.slice(0, n);
  }

  // If it's an object, convert to array of {key, value} and sort by value
  return Object.entries(data)
    .map(([key, value]) => ({ key, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, n);
}


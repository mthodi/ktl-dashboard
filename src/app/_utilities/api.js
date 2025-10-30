/**
 * API service layer for KTL Dashboard
 * Handles all communication with the Django backend
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Generic fetch wrapper with error handling
 */
async function apiFetch(endpoint) {
  const url = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error(`API Error for ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Fetch list of all countries with latest snapshot metadata
 * @returns {Promise<Array>} Array of country objects with latest metrics
 */
export async function fetchCountries() {
  return apiFetch('/api/metrics/countries/');
}

/**
 * Fetch latest metrics for a specific country
 * @param {string} countryCode - ISO alpha-2 country code (e.g., 'MW', 'US')
 * @returns {Promise<Object>} Country metrics object with full payload and summary
 */
export async function fetchCountryMetrics(countryCode) {
  const code = countryCode.toUpperCase();
  return apiFetch(`/api/metrics/countries/${code}/`);
}

/**
 * Fetch snapshot history for a specific country
 * @param {string} countryCode - ISO alpha-2 country code
 * @returns {Promise<Array>} Array of historical snapshots
 */
export async function fetchCountryHistory(countryCode) {
  const code = countryCode.toUpperCase();
  return apiFetch(`/api/metrics/countries/${code}/history/`);
}

/**
 * Fetch specific snapshot by country and date
 * @param {string} countryCode - ISO alpha-2 country code
 * @param {string} date - Snapshot date in YYYY-MM-DD format
 * @returns {Promise<Object>} Snapshot object for the specified date
 */
export async function fetchCountrySnapshot(countryCode, date) {
  const code = countryCode.toUpperCase();
  return apiFetch(`/api/metrics/countries/${code}/${date}/`);
}

/**
 * Centralized Currency Registry and Scalable Formatter
 */

export const SUPPORTED_CURRENCIES = {
  PHP: {
    code: 'PHP',
    symbol: '₱',
    locale: 'en-PH',
    name: 'Philippine Peso',
    decimalPlaces: 2,
  },
  USD: {
    code: 'USD',
    symbol: '$',
    locale: 'en-US',
    name: 'US Dollar',
    decimalPlaces: 2,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    locale: 'de-DE',
    name: 'Euro',
    decimalPlaces: 2,
  }
};

// Default System Currency
export const DEFAULT_CURRENCY_CODE = 'PHP';

/**
 * Retrieves the currency configuration for a specific code or the default.
 * @param {string} code - The ISO currency code.
 * @returns {object} - The currency configuration object.
 */
export const getCurrencyConfig = (code = DEFAULT_CURRENCY_CODE) => {
  return SUPPORTED_CURRENCIES[code] || SUPPORTED_CURRENCIES[DEFAULT_CURRENCY_CODE];
};

/**
 * Global Currency Config (Point of Truth for current default behavior)
 */
export const CURRENCY_CONFIG = getCurrencyConfig();

/**
 * Formats a numeric value into a specific currency format.
 * @param {number|string} amount - The numeric value to format.
 * @param {string} currencyCode - Optional currency code to override the default.
 * @returns {string} - The formatted currency string.
 */
export const formatCurrency = (amount, currencyCode = DEFAULT_CURRENCY_CODE) => {
  const config = getCurrencyConfig(currencyCode);
  const numericValue = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numericValue)) return `${config.symbol}0.00`;

  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.code,
    minimumFractionDigits: config.decimalPlaces,
    maximumFractionDigits: config.decimalPlaces,
  }).format(numericValue);
};

export default formatCurrency;
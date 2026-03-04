/**
 * Deep merges two objects.
 * If a key exists in both objects and both values are objects, it merges them recursively.
 * Otherwise, the value from the override object is used.
 * 
 * @param {Object} defaultTokens - The base design tokens
 * @param {Object} overrideTokens - The override design tokens
 * @returns {Object} - The resulting merged tokens
 */
export const mergeTokens = (defaultTokens, overrideTokens) => {
  if (!overrideTokens || Object.keys(overrideTokens).length === 0) {
    return defaultTokens;
  }

  const result = { ...defaultTokens };

  Object.keys(overrideTokens).forEach((key) => {
    if (
      overrideTokens[key] &&
      typeof overrideTokens[key] === 'object' &&
      !Array.isArray(overrideTokens[key]) &&
      defaultTokens[key] &&
      typeof defaultTokens[key] === 'object'
    ) {
      result[key] = mergeTokens(defaultTokens[key], overrideTokens[key]);
    } else {
      result[key] = overrideTokens[key];
    }
  });

  return result;
};
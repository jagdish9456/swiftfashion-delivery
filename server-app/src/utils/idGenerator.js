const crypto = require('crypto');

/**
 * Generates a unique ID with a given prefix.  Uses crypto.randomUUID for better uniqueness.
 * @param {string} prefix - The prefix for the ID.
 * @returns {Promise<string>} - A promise that resolves with the generated unique ID.
 */
const generateUniqueId = async (prefix) => {
  const uniqueId = prefix + crypto.randomUUID();
  return uniqueId;
};

module.exports = { generateUniqueId };

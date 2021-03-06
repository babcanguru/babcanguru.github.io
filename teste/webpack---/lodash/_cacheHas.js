/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
    return cache.has(key);
}

module.exports = cacheHas;



//////////////////
// WEBPACK FOOTER
// ./~/lodash/_cacheHas.js
// module id = 89
// module chunks = 0
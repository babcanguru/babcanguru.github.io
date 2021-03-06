var isObject = require('./isObject');

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
    return value === value && !isObject(value);
}

module.exports = isStrictComparable;



//////////////////
// WEBPACK FOOTER
// ./~/lodash/_isStrictComparable.js
// module id = 43
// module chunks = 0
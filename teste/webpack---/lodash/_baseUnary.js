/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
    return function(value) {
        return func(value);
    };
}

module.exports = baseUnary;



//////////////////
// WEBPACK FOOTER
// ./~/lodash/_baseUnary.js
// module id = 88
// module chunks = 0
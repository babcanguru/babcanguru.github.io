var nativeCreate = require('./_nativeCreate');

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
    this.size = 0;
}

module.exports = hashClear;



//////////////////
// WEBPACK FOOTER
// ./~/lodash/_hashClear.js
// module id = 102
// module chunks = 0
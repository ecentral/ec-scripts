/**
 * Creates a new merged object.
 * Object keys of right can be functions that receive the
 * equivalent value of the given key in left or undefined if the key
 * does not exist in left.
 * @param {Object} left The source object.
 * @param {Object|Function} right The object or function to merge.
 * @returns {Object} The merged result.
 */
const merge = (left, right) => {
    if (
        // If left or right side is primitive ...
        (typeof left !== 'object' || Array.isArray(left) || typeof right !== 'object') &&
        // and right side is not a function.
        typeof right !== 'function'
    ) {
        // Return right side if defined, else the original value.
        return right !== undefined ? right : left;
    }

    if (typeof right === 'function') {
        return right(left);
    }

    // Recursively create the object.
    const diff = Object.keys(right).reduce((acc, key) => ({
        ...acc,
        [key]: merge(left[key], right[key]),
    }), {});

    return {
        ...left,
        ...diff,
    };
};

module.exports = merge;

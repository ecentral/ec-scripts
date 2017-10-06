const jsonQuery = require('json-query');

/**
 * Merges a leaf for a given key or executes a query in case the key begins with '$'.
 * @param key {string} The given key.
 * @param {Object} left The source object.
 * @param {Object|Function} right The object or function to merge.
 * @param {Function} merge The merge callback.
 * @returns {Object} The merged result.
 */
const mergeOrQuery = (key, left, right, merge) => {
    if (key[0] === '$') {
        const query = key.substring(1);
        const newObject = left;

        const result = jsonQuery(query, {
            data: newObject,
            force: true,
        });

        // Get the references of all affected objects.
        const refs = Array.isArray(result.key) ? result.references[0] : result.references;

        /**
         * Instead of creating a new object, we replace the contents of the old object
         * with the new values. This way we can keep references of the existing configuration.
         * TODO: Find a way to use new objects and get rid of the delete() operator.
         */
        refs.forEach((obj) => {
            const originalObj = obj;
            // Create a merged copy.
            const newObj = merge(obj, right);

            // Remember the old keys.
            // This way we don't remove anything when the object is returned by reference.
            const oldKeys = Object.keys(originalObj);

            // ... and insert the new values.
            Object.keys(newObj).forEach((k) => { originalObj[k] = newObj[k]; });

            // Finally, remove all old keys not present in newObj anymore.
            oldKeys.forEach((k) => {
                if (newObj[k] === undefined) {
                    delete originalObj[k];
                }
            });
        });

        return newObject;
    }

    return {
        [key]: merge(left[key], right),
    };
};

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
        ...mergeOrQuery(key, left, right[key], merge),
    }), {});

    return {
        ...left,
        ...diff,
    };
};

module.exports = merge;

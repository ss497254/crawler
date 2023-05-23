/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */

const pickProperty = (object: any, keys: readonly string[]) => {
    return keys.reduce((obj, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            // @ts-ignore
            obj[key] = object[key];
        }
        return obj;
    }, {});
};

export default pickProperty;

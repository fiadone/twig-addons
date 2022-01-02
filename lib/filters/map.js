/**
 * Applies a mutation on each element of the input array
 * @param {array} values The original values
 * @param {array} args The filter arguments
 *  - {string} handler The mutation handler
 * @returns {array} The mutated values
 */
 module.exports = function map(values, [handler]) {
  return values.map(eval(handler))
}
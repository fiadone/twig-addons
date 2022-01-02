/**
 * Iteratively reduces an array to a single value
 * @param {array} values The original values
 * @param {array} args The filter arguments
 *  - {string} reducer The reducing handler
 *  - {*} carry The initial value
 * @returns {array} The mutated values
 */
 module.exports = function map(values, [reducer, carry]) {
  return values.reduce(eval(reducer), carry)
}
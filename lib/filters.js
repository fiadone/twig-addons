/**
 * Remaps (and eventually filters) object properties
 * @param {object} value The object to be remapped
 * @param {array} args The filter arguments
 *  - {array} keys The remapping list
 *  - {object} remapping options
 * @returns {object} The remapped object
 */
 module.exports.remap = function (value, [keys = [], options = {}] = []) {
  const { discardUnmentioned } = options
  const map = keys.map(key => {
    const [original, target] = key.split(':')
    return { original, target: target || original }
  })
  
  return Object.entries(value).reduce((acc, [key, value]) => {
    const { target } = map.find(({ original }) => (key === original)) || {}
    if (target || !discardUnmentioned) {
      acc[target || key] = value
    }
    return acc
  }, {})
}

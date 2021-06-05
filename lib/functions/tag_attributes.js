/**
 * It provides a merge between two stringified class lists and eventually removes duplicates
 * @param {string} a The default class
 * @param {string} b The extra class
 * @returns {string}
 */
function mergeClasses(a = '', b = '') {
  try {
    const uniqueClasses = new Set([...a.split(' '), ...b.split(' ')])
    const normalizedClasses = Array.from(uniqueClasses).map(c => c.trim()).filter(c => !!c)
    return normalizedClasses.join(' ').trim()
  } catch (err) {
    console.warn(err)
    return ''
  }
}

/**
 * It converts a key-value attributes object to a stringified attributes list
 * @param {object} attributes
 * @param {object} defaults 
 *  - {object} attributes The overriding attributes
 * @returns {string}
 */
module.exports = function(attributes, defaults) {
  const { class: defaultClass, ...defaultAttributes } = defaults || {}
  const { class: extraClass, ...extraAttributes } = attributes
  const classes = mergeClasses(defaultClass, extraClass)

  return (
    Object
      .entries({
        ...classes ? { class: classes } : null,
        ...defaultAttributes,
        ...extraAttributes
      })
      .filter(([key]) => key !== '_keys')
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ')
  )
}
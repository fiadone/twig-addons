const html_classes = require('./html_classes')

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
  const classes = html_classes(defaultClass, extraClass)

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
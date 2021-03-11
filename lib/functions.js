/**
 * Builds the component attributes string
 * @param {string} baseClass The component base css class
 * @param {object} context The properties passed to the component
 * @param {object} options The configuration object
 * @returns {string} The component attributes string
 */
module.exports.componentAttributes = function (baseClass, context = {}, options = {}) {
  const { modifierSeparator = '--' } = options
  const variants = (context.variants || []).map(mod => `${baseClass}${modifierSeparator}${mod}`)
  const { _keys, class: extraClasses = '', ...attrs } = context.attributes || {}
  const classlist = new Set([baseClass, ...variants, ...extraClasses.split(' ')])
  const attributes = [`class="${[...classlist].join(' ').trim()}"`]

  Object.entries(attrs).forEach(([key, value]) => {
    let attr = (value === null || value === undefined) ? key : `${key}="${value}"`
    attributes.push(attr)
  })

  return attributes.join(' ')
}

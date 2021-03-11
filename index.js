const filters = require('./lib/filters')
const functions = require('./lib/functions')

module.exports = function (twig) {
  Object.entries(filters).forEach(entry => twig.extendFilter(...entry))
  Object.entries(functions).forEach(entry => twig.extendFunction(...entry))
  return twig
}

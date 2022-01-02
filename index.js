const filters = require('./lib/filters')
const functions = require('./lib/functions')

module.exports = function twigAddons(twig) {
  Object.entries(filters).forEach(([name, fn]) => twig.extendFilter(name, fn))
  Object.entries(functions).forEach(([name, fn]) => twig.extendFunction(name, fn))
  return twig
}

module.exports.filters = filters
module.exports.functions = functions
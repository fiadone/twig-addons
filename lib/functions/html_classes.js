/**
 * A porting of Twig's html_classes (https://twig.symfony.com/doc/2.x/functions/html_classes.html)
 * @param {(string|string[]|object)[]} args The list of classes
 * @returns {string}
 */
module.exports = function html_classes(...args) {
  const classes = new Set()

  args.filter(entry => !!entry).forEach((arg, i) => {
    if (typeof arg === 'string') {
      classes.add(arg)
    } else if (Array.isArray(arg)) {
      arg.forEach(entry => classes.add(entry))
    } else if (typeof arg === 'object') {
      Object.entries(arg).forEach(([entry, condition]) => {
        if (typeof entry !== 'string') {
          throw `The html_classes function argument ${i} (key ${entry}) should be a string, got "${typeof entry}".`
        }

        if (condition) {
          classes.add(entry)
        }
      })
    } else {
      throw `The html_classes function argument ${i} should be either a string or an array, got "${typeof arg}".`
    }
  })

  return Array.from(classes).join(' ')
}
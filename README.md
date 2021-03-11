# @fiad/twig-addons

A collection of filters and functions for Twig (JS)

---

## Get started

### Installation
```
npm i @fiad/twig-addons
```

### Usage

#### Basic
```js
import twig from 'twig'
import twigAddons from '@fiad/twig-addons'

const engine = twigAddons(twig)

engine.renderFile('path/to/template.twig', { foo: 'bar' }, (err, html) => {
  fs.writeFileSync('path/to/template.html', html)
})
```

#### With Express
```js
import express from 'express'
import twig from 'twig'
import twigAddons from '@fiad/twig-addons'

const app = express()

app.engine('twig', twigAddons(twig).__express)
```

## Filters list

### remap
It allows you to remap an object with different keys and eventually discard its needless properties.

__Definition__:
```js
remap(value, args)
```

| Argument | Description |
| --- | --- |
| value | The original object to be remapped |
| args | The array of arguments passed to the filter |

Here below the supported filter arguments:
| Argument | Description |
| --- | --- |
| keys | The list of key replacements, formatted like "old:new" |
| options | A configuration object containing additional settings |

The *options* argument supports the following properties:
| Property | Description | Default |
| --- | --- | --- |
| discardUnmentioned | If *true*, any properties not included in the *keys* argument will be omitted from the returned object | *false* |


__Usage__:

Source
```json
// mock
{
  "article_id": "foo",
  "article_title": "Lorem ipsum.",
  "article_text": "Ea duis sint ad ipsum in dolor quis consequat.",
  "foo_prop": "foo"
}
```

```twig
{# components/article.twig #}
<article>
  <h1>{{ title }}</h1>
  <p>{{ description }}</p>
</article>


{# templates/page.twig #}
{% set data = mock|remap([
  'article_title:title',
  'article_text:description'
], { discardUnmentioned: true }) %}

<main>
  {% include 'components/article.twig' with data %}
</main>
```

Result
```html
<main>
  <article>
    <h1>Lorem ipsum.</h1>
    <p>Ea duis sint ad ipsum in dolor quis consequat.</p>
  </article>
</main>
```

## Functions list

### componentAttributes
It provides a standard parametric system to pass attributes to a component directly from the *include* statement and to dynamically build its variant-based modificator classes.

__Definition__:
```js
componentAttributes(baseClass, context, options)
```

| Argument | Description |
| --- | --- |
| baseClass | The base CSS selector used to identify the component |
| context | The parameters passed to the twig partial through the *include* statement |
| options | A configuration object containing additional  settings |


The *context* argument is supposed to contain, between the others, the following properties:
| Property | Description |
| --- | --- |
| variants | An optional array of modificators to build the component CSS classes |
| attributes | An object containing a key/value entry for each attribute wanted to be appended to the component wrapper tag |


The *options* argument supports the following properties:
| Property | Description | Default |
| --- | --- | --- |
| modifierSeparator | The separator used to concatenate the base class with the variant-based modificator | *-- (BEM like)* |


__Usage__:

Source
```twig
{# components/box.twig #}
<div {{ componentAttributes('box', _context) }}>
  <!-- content -->
</div>

{# templates/page.twig #}
<main>
  {% include 'components/box.twig' with {
    variants: ['primary'],
    attributes: {
      id: 'foo',
      class: 'js-foo',
      'data-foo': 'bar'
    }
  } only %}
</main>
```
Result
```html
<main>
  <div class="box box--primary js-foo" id="foo" data-foo="bar">
    <!-- content -->
  </div>
</main>
```

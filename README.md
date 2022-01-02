# @fiad/twig-addons

A collection of filters and functions for Twig (JS)


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

### map
A porting of *JavaScript*'s [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).

__Definition__:
```js
map(values, args)
```

| Argument | Description | Type |
| --- | --- | --- |
| values | The original values | *array* |
| args | The array of arguments passed to the filter | *array* |

Here below the supported filter arguments:
| Argument | Description | Type |
| --- | --- | --- |
| handler | The mapping handler | *string* |

> ℹ️ Please note that the *handler* argument should be a stringified arrow function evaluable by *eval()*.


__Usage__:
```json
// mock
{
  "guests": [
    { "firstname": "John", "lastname": "Doe", /* ... */ },
    { "firstname": "Jane", "lastname": "Doe", /* ... */ }
  ]
}
```
```twig
<p class="guests">
  {{ guests|map('({ firstname, lastname }) => `${firstname} ${lastname}`')|join(', ') }}
</p>
```

> ⚠️ Since this filter involves the usage of *eval()*, it's recommended to use it for static sites generation purposes only, so that the stringified *JavaScript* execution will be limited to the development environment. Look [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#never_use_eval!) to learn more.


### reduce
A porting of *JavaScript*'s [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce).

__Definition__:
```js
reduce(values, args)
```

| Argument | Description | Type |
| --- | --- | --- |
| values | The original values | *array* |
| args | The array of arguments passed to the filter | *array* |

Here below the supported filter arguments:
| Argument | Description | Type |
| --- | --- | --- |
| reducer | The reducing handler | *string* |
| carry | The initial reduced value | *any* |

> ℹ️ Please note that the *reducer* argument should be a stringified arrow function evaluable by *eval()*.


__Usage__:
```json
// mock
{
  "cart": [
    { "price": 10, /* ... */ },
    { "price": 20, /* ... */ },
    { "price": 15, /* ... */ }
  ]
}
```
```twig
<p class="total">
  {{ cart|reduce('(total, { price }) => (total + price)', 0) }} €
</p>
```

> ⚠️ Since this filter involves the usage of *eval()*, it's recommended to use it for static sites generation purposes only, so that the stringified *JavaScript* execution will be limited to the development environment. Look [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#never_use_eval!) to learn more.


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
  "article_id": "post-1",
  "article_type": "news",
  "article_title": "Lorem ipsum.",
  "article_text": "Ea duis sint ad ipsum in dolor quis consequat.",
  "article_category": "foo"
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
], {
  discardUnmentioned: true
}) %}

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

### html_classes
A porting of *Twig*'s *html_classes*. Look at the [official documentation](https://twig.symfony.com/doc/2.x/functions/html_classes.html) to learn more about usage.

__Definition__:
```js
html_classes(...classes)
```


### tag_attributes
It dynamically builds the stringified attributes list of an html tag starting from a key-value object. It supports you in adopting a standard and comfortable parametric system to pass attributes to a component directly from the *include* statement.

__Definition__:
```js
tag_attributes(attributes, defaults)
```

| Argument | Description |
| --- | --- |
| attributes | The attributes object to be parsed |
| defaults (optional) | The default attributes to extend, useful when you need to merge with some predefined properties (use this argument instead of *Twig* built-in *merge* filter to ensure proper attribute parsing) |


__Usage__:

Source
```json
// mock
{
  "link": {
    "label": "Lorem ipsum",
    "attributes": {
      "class": "link--primary",
      "href": "https://domain.ext/slug",
      "target": "_blank"
    }
  }
}
```

```twig
{# components/link.twig #}

{% set defaults = {
  class: 'link',
  target: '_self'
} %}

<a {{ tag_attributes(attributes, defaults) }}>
  <span class="link__label">{{ label }}</span>
</a>
```

Result
```html
<a class="link link--primary" href="https://domain.ext/slug" target="_blank">
  <span class="link__label">Lorem ipsum</span>
</a>
```

> ℹ️ Please note that the default *class* attribute wasn't overridden, as did the *target* one instead, but the default value and the overriding one have been concatenated. This is to avoid the accidental breaking of some of the component basic styles and behaviors associated with the default class(es) eventually defined within the component partial.
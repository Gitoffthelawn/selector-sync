# build

```
$ npm run build:prod
$ cd web-ext
$ web-ext build
```

# Usage

Example:
```
[
  {
    "title": "Default Rule",
    "selectorSpecifications": [
      {
        "selector": "title",
        "showMethod": "textContent"
      },
      {
        "selector": "meta",
        "showMethod": "outerHTML"
      }
    ]
  },
  {
    ...
  }
]
```

Description:

- title: Name of the setting.
- selectorSpecifications: An array of CSS selector configurations.
  - selector: CSS selector.
  - showMethod: Display method (either textContent, innerHTML, or outerHTML).
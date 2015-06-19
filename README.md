# tagalong
Tagalong is DOM templating done right. You give it a DOM element and some data, and it does exactly what you'd expect.

###### HTML
```html
<ul id="entries">
  <li>
    <span class="name">Name</span>: <span class="occupation">occupation</span>
  </li>
</li>
```

###### JavaScript
```js
tagalong('#entries', [
  {name: 'Jill', occupation: 'Welder'},
  {name: 'Jack', occupation: 'Executive Assistant'}
]);
```

###### Result
```html
<ul id="entries">
  <li class="entry">
    <span class="name">Jill</span>: <span class="occupation">Welder</span>
  </li>
  <li class="entry">
    <span class="name">Jack</span>: <span class="occupation">Executive Assistant</span>
  </li>
</li>
```

## Another Templating Engine, Seriously?
Yep.

## The Rules
Given a DOM element `node`, some `data`, and an optional hash of `directives`:

```js
tagalong(node, data, directives);
```

1. If `data` is an Array, it's joined to the *child elements* of `node`:
  * The *first child* is treated as the "template".
  * If `data.length` is greater than the number of children, the template node is cloned and inserted at the end.
  * If `data.length` is less than the number of children, the extra nodes are removed.
  * The template element is stashed in the `node` for later use, which allows you to join an empty array, then a non-empty one.
1. If `data` is an Object:
  * Each key of `data` is used to find a child element with either the corresponding `class` or `data-bind` attribute values.
  * Each `key` of the `directives` is interpolated against the `data`:
    * If the `key` is a String in the form `@attr`, then the named attribute of `node` is set to the interpolated value.
    * If `directives[key]` is a String, a lookup is performed against `data[key]`.
    * If `directives[key]` is a Function, the function is called as: `directives[key].call(node, data)`.
    * If `directives[key]` is an Object, then its value is provided as the directives for the nested property in `data`.
1. If `data` is a scalar (String or Number), then:
  * If `directives.stringify` is a Function, the value is interpolated as: `directive.stringify.call(node, data)`.
  * The `data` or interpolated value is set as `node.textContent`.
  * No, you can't set a node's `innerHTML` directly, because that's dangerous.

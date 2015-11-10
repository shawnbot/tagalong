# tagalong

Tagalong is dynamic DOM templating done right. It works with plain old HTML and JavaScript expressions, and uses [incremental-dom] to only update elements that change. Given this HTML:

```html
<div id="people">
  <h1>
    <span t-text="items.length">0</span>
    Member<span t-if="items.length !== 1">s</span>
  </h1>
  <ul>
    <li t-each="items">
      <span t-text="name">Rosie</span> the
      <span t-text="occupation">Riveter</span>
    </li>
  </ul>
</div>
```

You can render new data like so:

```js
tagalong.render('#people', {
  people: [
    {name: 'Rosie', occupation: 'Riveter'},
    {name: 'Joe', occupation: 'Waiter'},
    {name: 'Jill', occupation: 'Welder'},
  ]
});
```

### API

#### `tagalong.render(root [, data [, context]])` <a name="render"></a>
The render function accepts either an element reference or CSS selector as its `root`, an optional `data` value, and an additional, optional `context` object. This function renders the `data` into the `root` element and returns an update function that can be used to render new data:

```js
var render = tagalong.render('#template', data);
// later
render(otherData);
```

Because tagalong irreparably modifies the DOM and removes all `t-` attributes, you _must_ use the returned render function if you wish to update the element with new data.

### Attributes
The following attributes are the "control structures" of tagalong template elements. You can use them on any child element of the `root` ([see above](#render)).

#### `t-text="expression"`
Sets the text of the element to the value of the JavaScript `expression`:

```html
<div id="template">
  <span t-text="name">foo</span>
</div>
<script>
tagalong.render('#template', {name: 'bar'});
</script>
```

#### `t-if="expression"` and `t-else`
Conditionally includes an element in the output if the JavaScript `expression` is truthy. An adjacent element with a `t-else` attribute will be shown only if the `t-if` expression is falsy.

```html
<div id="template">
  <h1 t-if="error" class="error">Error: <span t-text="error"></span></h1>
  <h1 t-else>All good!</h1>
</div>
<script>
// this will show the first <h1> and hide the second
var render = tagalong.render('#template', {error: 'something bad happened'});
// and vice-versa
render({error: null});
</script>
```

#### `t-each="expression"` <a name="each"></a>
Repeats this element for each value in the evaluated JavaScript `expression`:

```html
<ul id="people">
  <li t-each="people">
    <span t-value="name">Name</span>
  </li>
</ul>
<script>
tagalong.render('#people', {
  people: ['Jill', 'Jane', 'Jack']
});
</script>
```

#### `t-foreach="expression"` <a name="foreach"></a>
Repeats *this element's children* for each value in the evaluated JavaScript `expression`:

```html
<div id="template">
  <dl t-foreach="terms">
    <dt t-text="name">Term</dt>
    <dd t-text="desc">Description</dd>
  </dl>
</div>
<script>
tagalong.render('#template', {
  terms: [
    {name: 'fubar', desc: 'F*cked Up Beyond All Recognition'},
    {name: 'foo bar', desc: 'Metasyntactic variables'}
  ]
});
```

#### `t-with="expression"` <a name="with"></a>
Changes the context of nested expressions in this element's children.

```html
<div id="template">
  <h1 t-with="items">
    <span t-value="length">0</span>
    item<span t-if="length !== 1">s</span>
  </h1>
  ...
</div>
<script>
tagalong.render('#template', {
  items: ['a', 'b', 'c']
});
</script>
```

#### `t-as="symbol"`
This attribute aliases a [t-each](#each), [t-foreach](#foreach), or [t-with](#with) expression so that it can be referred to in child elements by name. It can be used to make nested expressions easier to read, or simplify accessing numeric indices or properties that contain odd characters:

```html
<div id="template">
  <ul t-foreach="items" t-as="item">
    <li t-value="item[0]"></li>
  </ul>
</div>
<script>
tagalong.render('#template', {
  items: [
    ['foo', 1],
    ['bar', 2],
    ['baz', 0]
  ]
});
</script>
```

Behind the scenes, this just sets the property named by `symbol` on the `context` object passed to `tagalong.render()` while that element is rendering.

#### `t-class="expression"` <a name="class"></a>
Class name expressions can evaluate to either an object or an array. If the `expression` evaluates to an object, then the keys are used as class names if their values are truthy:

```html
<section t-class="{regional: true, onshore: onshore}">
</section>
```

If the result is an array, the values are joined with spaces and used as-is.

#### `t-style="expression"` <a name="style"></a>
Style expressions can evaluate to either an object or an array. If the `expression` evaluates to an object, then the key/value pairs are formatted as CSS properties, separated with semicolons:

```html
<ol id="toc">
  <li t-each="sessions" t-style="{color: color}">
    <a t-href="'#' + id" t-text="text">Section</a>
  </li>
</ol>
<script>
tagalong.render('#toc', {
  sessions: [
    {id: 'intro', name: 'Welcome'},
    {id: 'breakout', name: 'Breakout Session', color: 'pink'},
    {id: 'speaker1',  name: 'Speaker: Jane Goodall'}
  ]
});
</script>
```

If the result is an array, the values are assumed to be `property: value` pairs and are joined with semicolons.

#### Other Attributes
Any other attribute with a `t-` prefix is evaluated as a contextual JavaScript expression and has its `t-` prefix stripped in the output, e.g.

```html
<input name="first_name" t-value="first_name">
<input name="attending" t-checked="attending ? 'checked' : null">
```

### `<t-template>` Custom Element
Tagalong ships with a `<t-template>` [custom element]:

```html
<t-template id="people">
  <h1>
    <span t-text="items.length">0</span>
    Member<span t-if="items.length !== 1">s</span>
  </h1>
  <ul>
    <li t-each="items">
      <span t-text="name">Rosie</span> the
      <span t-text="occupation">Riveter</span>
    </li>
  </ul>
</t-template>
```

Then, set the data either by setting the `data` attribute (any JavaScript expression will do), or set the `data` property directly:

```js
document.getElementById('people').data = {
  people: [
    {name: 'Rosie', occupation: 'Riveter'},
    {name: 'Joe', occupation: 'Waiter'},
    {name: 'Jill', occupation: 'Welder'},
  ]
};
```

[custom element]: http://www.html5rocks.com/en/tutorials/webcomponents/customelements/
[incremental-dom]: https://github.com/google/incremental-dom

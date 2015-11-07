# tagalong

Tagalong is DOM templating done right. It works with plain old HTML, enhanced
with special `t-` attributes. Given this HTML:

```html
<div id="people">
  <h1>
    <span t-text="items.length">0</span>
    Item<span t-if="items.length !== 1">s</span>
  </h1>
  <ul>
    <li t-each="items">
      <span t-text="name">Rosie</span>
      the
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
</script>
```

Or, you can use the `<t-template>` [custom element]:

```html
<t-template id="people">
  <h1>
    <span t-text="items.length">0</span>
    Item<span t-if="items.length !== 1">s</span>
  </h1>
  <ul>
    <li t-each="items">
      <span t-text="name">Rosie</span>
      the
      <span t-text="occupation">Riveter</span>
    </li>
  </ul>
</t-template>
```

Then, set the data either by setting the `data` attribute (any JavaScript expression will do), or set the `data` DOM element property directly:

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

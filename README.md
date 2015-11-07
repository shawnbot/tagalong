# tagalong

Tagalong is DOM templating done right. It works with plain old HTML, enhanced
with special `t-` attributes:

```js
<table id="data-driven">
  <thead>
    <th t-each="columns" t-value="."></th>
  </thead>
  <tbody>
    <tr t-each="rows">
      <td t-text="name"></td>
      <td t-text="value"></td>
    </tr>
  </tbody>
</table>

<script src="tagalong.js"></script>
<script>
tagalong.render('#data-driven', {
  columns: [
    'Name',
    'Value'
  ],
  items: [
    {name: 'Foo', value: 20},
    {name: 'Bar', value: 30},
    {name: 'Baz', value: 50}
  ]
});
</script>
```

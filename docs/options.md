## Helper Options
Several options depend on properties in YAML front matter to exist for them to be useful. If YAML front matter doesn't exist the helper should still process the files, but don't expect all of the options to work without it.

Please [report any errors](https://github.com/helpers/handlebars-helper-post/issues/new), thanks!

### convert
Type: `String|Boolean` (optional)
Default value: `after`

Defines when, or if, the helper should convert the included markdown to HTML. Options are:

* `after` (default): Content will be processed with marked.js **after templates have been compiled** with Handlebars.
* `before` (default): Content will be processed with marked.js **before templates are compiled** with Handlebars.
* `false`: Content will not be processed with marked.js.

### cwd
Type: `String` (optional)
Default value: `undefined`

The current working directory, or "cwd", for paths defined in the helper. So instead of writing out `{{{%= shortname %} 'my/book/chapters/*.hbs'}}`, just define `cwd: "my/book"` and now any paths defined in the helper will use the `cwd` as a base, like this: `{{{%= shortname %} 'chapters/*.hbs'}}`

### sep
Type: `String`
Default value: `\n`

The separator to append after each inlined file.

### compare
Type: `Function`
Default value: `compareFn`

Compare function for sorting the included files.

### sortBy
Type: `String`
Default value: `title`

The property to use for sorting the included files. By default, included files are sorted alphabetically by `title`.

### sortOrder
Type: `String`
Default value: `asc`

Order in which to sort the included files. Options are `asc` (default) and `desc`.


## Specifying options
> Options can be defined in either of the following ways:

### hash options
Set options as hash arguments directly on the helper expressions themselves:

```handlebars
{{{%= shortname %} 'my/book/chapters/*.hbs' sep="<!-- Chapter -->"}}
```

Note that **Options defined in the hash always win**!


### "assemble" task options
> If you use Grunt and [Assemble](http://assemble.io), you can pass options from the `assemble` task in the Gruntfile to the helper.

This helper registers a [custom `{%= shortname %}` property](http://assemble.io/docs/Custom-Helpers.html), in the Assemble options, which enables options for the helper to be defined in the Assemble task or target options, e.g.:

```js
assemble: {
  options: {
    posts: {
      // {%= shortname %} helper options here
    }
  }
}
```
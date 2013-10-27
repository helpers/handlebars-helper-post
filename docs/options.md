## Helper Options

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

Compare function for sorting the {%= shortname %} files.


## Defining options
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
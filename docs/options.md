## Helper Options
Several options depend on properties in YAML front matter to exist for the options to be useful or to work at all. If YAML front matter doesn't exist, the helper should still process the files, but don't expect all of the options to work entirely without it.

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

The current working directory for paths defined in the helper. So instead of writing out `{{{%= shortname %} 'my/book/chapters/*.hbs'}}`, just define `cwd: "my/book"` and now any paths defined in the helper will use the `cwd` as a base, like this: `{{{%= shortname %} 'chapters/*.hbs'}}`

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
Default value: `basename`

The property to use for sorting the included files. By default, included files are sorted alphabetically by the `basename` of the file.

### sortOrder
Type: `String`
Default value: `asc`

Order in which to sort the included files. Options are `asc` (default) and `desc`.

### glob
Type: `Object`
Default value: `undefined`

Options to pass to [globule](https://github.com/cowboy/node-globule), which is the library used to enable minimatch/wildcard patterns to be used for specifying files to include. Please visit the [globule](https://github.com/cowboy/node-globule) project to see all available options.


## Setting options
> Options can be defined in any of the following ways:

### hash options
Set options as hash arguments directly on the helper expressions themselves:

```handlebars
// Append a separator to the content of each included file
{{{%= shortname %} 'my/book/chapters/*.hbs' sep="<!-- Chapter -->"}}

// Override the cwd defined in the task options
{{{%= shortname %} 'my/book/chapters/*.hbs' cwd="./"}}
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

### JSON/YAML
> If you use Grunt and [Assemble](http://assemble.io), you can pass options to `assemble` from a JSON or YAML data file

This option is really useful if you expect to have lots of options defined, or different "options groups" that you want to reuse as needed.

```js
assemble: {
  options: {
    data: ['path/to/{%= shortname %}.json']
  }
}
```
Then inside `foo.json` we might define something like:

```json
{
  "docs": {
    "sep": "<!-- Document -->\n",
    "cwd": "content/docs",
    "sortBy": "num"
  },
  "chapters": {
    "sep": "<!-- Chapter -->\n",
    "cwd": "content/chapters",
    "sortBy": "title"
  },
  "posts": {
    "sep": "<!-- Post -->\n",
    "cwd": "content/posts",
    "sortBy": "foo"
  }
}
```
Then use in templates like this:

```handlebars
{{{%= shortname %} foo.docs}}
{{{%= shortname %} foo.chapters}}
{{{%= shortname %} foo.posts}}
```

# {{post}} [![NPM version](https://badge.fury.io/js/handlebars-helper-post.png)](http://badge.fury.io/js/handlebars-helper-post) 

> {{post}} handlebars helper, for including a post, or a list of posts.

## Quickstart
Install the helper with: `npm install handlebars-helper-post`

### Usage with Assemble
If you use [Assemble](http://assemble.io) and Grunt, add `handlebars-helper-post` to the `helpers` property in the [Assemble](http://assemble.io) task or target options in your Gruntfile:

```javascript
grunt.initConfig({
  assemble: {
    options: {
      helpers: ['handlebars-helper-post', 'foo/*.js']
    },
    files: {}
  }
});
```
_Note that the 'handlebars-helper-post' module **must also be listed in devDependencies** for Assemble to automatically resolve the helper._

With that completed, you may now use the `{{post}}` helper in your templates:

```handlebars
{{post 'foo'}}
```

Please [report any bugs or feature requests](https://github.com/helpers/handlebars-helper-post/issues/new), thanks!


## Options
### Helper Options
Several options depend on properties in YAML front matter to exist for them to be useful. If YAML front matter doesn't exist the helper should still process the files, but don't expect all of the options to work without it.

Please [report any errors](https://github.com/helpers/handlebars-helper-post/issues/new), thanks!

#### convert
Type: `String|Boolean` (optional)
Default value: `after`

Defines when, or if, the helper should convert the included markdown to HTML. Options are:

* `after` (default): Content will be processed with marked.js **after templates have been compiled** with Handlebars.
* `before` (default): Content will be processed with marked.js **before templates are compiled** with Handlebars.
* `false`: Content will not be processed with marked.js.

#### cwd
Type: `String` (optional)
Default value: `undefined`

The current working directory, or "cwd", for paths defined in the helper. So instead of writing out `{{post 'my/book/chapters/*.hbs'}}`, just define `cwd: "my/book"` and now any paths defined in the helper will use the `cwd` as a base, like this: `{{post 'chapters/*.hbs'}}`

#### sep
Type: `String`
Default value: `\n`

The separator to append after each inlined file.

#### compare
Type: `Function`
Default value: `compareFn`

Compare function for sorting the included files.

#### sortBy
Type: `String`
Default value: `basename`

The property to use for sorting the included files. By default, included files are sorted alphabetically by the `basename` of the file.

#### sortOrder
Type: `String`
Default value: `asc`

Order in which to sort the included files. Options are `asc` (default) and `desc`.

#### glob
Type: `Object`
Default value: `undefined`

Options to pass to [globule](https://github.com/cowboy/node-globule), which is the library used to enable minimatch/wildcard patterns to be used for specifying files to include. Please visit the [globule](https://github.com/cowboy/node-globule) project to see all available options.


### Setting options
> Options can be defined in any of the following ways:

#### hash options
Set options as hash arguments directly on the helper expressions themselves:

```handlebars
// Append a separator to the content of each included file
{{post 'my/book/chapters/*.hbs' sep="<!-- Chapter -->"}}

// Override the cwd defined in the task options
{{post 'my/book/chapters/*.hbs' cwd="./"}}
```
Note that **Options defined in the hash always win**!


#### "assemble" task options
> If you use Grunt and [Assemble](http://assemble.io), you can pass options from the `assemble` task in the Gruntfile to the helper.

This helper registers a [custom `post` property](http://assemble.io/docs/Custom-Helpers.html), in the Assemble options, which enables options for the helper to be defined in the Assemble task or target options, e.g.:

```js
assemble: {
  options: {
    posts: {
      // post helper options here
    }
  }
}
```

#### JSON/YAML
> If you use Grunt and [Assemble](http://assemble.io), you can pass options to `assemble` from a JSON or YAML data file

This option is really useful if you expect to have lots of options defined, or different "options groups" that you want to reuse as needed.

```js
assemble: {
  options: {
    data: ['path/to/post.json']
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
{{post foo.docs}}
{{post foo.chapters}}
{{post foo.posts}}
```



## Usage Examples
#### Example config with [Assemble](http://assemble.io)

In your project's Gruntfile, options for the `{{post}}` helper can be defined in the Assemble task options:

```js
assemble: {
  options: {
    helpers: ['handlebars-helper-post'],
    posts: {
      cwd: 'path/to/files',
      sep: '<!-- separator defined in Gruntfile -->',
      compare: function (a, b) {
        return a.index >= b.index ? 1 : -1;
      }
    }
  },
  files: {}
}
```

### Usage example

Given you have this config in your project's gruntfile:

```js
// Project configuration.
grunt.initConfig({

  // Metadata for our book.
  book: require('./metadata/book.yml'),

  assemble: {
    options: {
      helpers: ['handlebars-helper-post'],
      posts: {
        sep: '<!-- chapter -->'
      },
      book: {
        src: ['chapters.hbs'],
        dest: 'book/'
      }
    }
  }
});
```

Our `chapters.hbs` file contains the following:

```handlebars
{{{post 'chapters/*.hbs'}}}
```

And the files we want to post include these Lo-Dash and Handlebars templates:

```handlebars
---
title: <%= book.title %>
chapter: 1
intro: Chapter <%= chapter %>
---
<h1>Content from {{title}}</h1>
<p class="intro">{{intro}}</p>
<p class="chapter">Chapter: {{chapter}}</p>
```

The result, `book/chapters.html` would contain something like:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>My Amazing Book</title>
  </head>
  <body>

    <!-- chapter -->
    <h1>Content from My Amazing Book</h1>
    <p class="intro">Chapter 1</p>
    <p class="chapter">Chapter: 1</p>

    <!-- chapter -->
    <h1>Content from My Amazing Book</h1>
    <p class="intro">Chapter 2</p>
    <p class="chapter">Chapter: 2</p>

    <!-- chapter -->
    <h1>Content from My Amazing Book</h1>
    <p class="intro">Chapter 3</p>
    <p class="chapter">Chapter: 3</p>
  </body>
</html>
```

##### `cwd` example

Instead of writing out full paths, like this:

```handlebars
{{post 'my/book/chapters/*.hbs'}}
{{post 'my/book/extras/*.hbs'}}
```

Just define a `cwd` in the `post` options in your project's Gruntfile:

```javascript
assemble: {
  options: {
    helpers: ['handlebars-helper-post'],
    posts: {
      cwd: 'my/book' // "base" path to prepend
    }
  }
}
```

Now you can define paths in the templates like this:

```handlebars
{{post 'chapters/*.hbs'}}
{{post 'extras/*.hbs'}}
```


## Contributing
Please see the [Contributing to Assemble](http://assemble.io/contributing) guide for information on contributing to this project.

## Related Projects and Links
A listing of each plugin and the current version included in this package is listed below.
   
+ [grunt-init-helper-mod](https://github.com/helpers/grunt-init-helper-mod): Grunt init template for creating a new helper module.  
+ [handlebars-helper-aggregate](https://github.com/helpers/handlebars-helper-aggregate): `{{aggregate}}` handlebars helper. inlines content from multiple files optionally using wildcard (globbing/minimatch) patterns. uses YAML front matter as context for each file. optionally pass in a sorting function.  
+ [handlebars-helper-compose](https://github.com/helpers/handlebars-helper-compose): `{{compose}}` handlebars helper. Similar to {{aggregate}}, but this is a block expression helper that inlines content from multiple files differently, extracting YAML front matter to pass to context for each file. Optionally use wildcard (globbing/minimatch) patterns. Accepts compare function as 3rd parameter for sorting inlined files.  
+ [handlebars-helper-condense](https://github.com/helpers/handlebars-helper-condense): Remove extra newlines from HTML content.  
+ [handlebars-helper-jade](https://github.com/helpers/handlebars-helper-jade): `{{jade}}` handlebars helper, for converting basic Jade templates to HTML.   
+ [handlebars-helper-lorem](https://github.com/helpers/handlebars-helper-lorem): `{{lorem}}` handlebars helper, for generating lorem lorem placeholder text.  
+ [handlebars-helper-moment](https://github.com/helpers/handlebars-helper-moment): `{{moment}}` handlebars helper. Combines the powers of Assemble, Handlebars.js and Moment.js into a great helper to master time.  
+ [handlebars-helper-partials](https://github.com/helpers/handlebars-helper-partials): Handlebars helper for including partials, with improvements over native partial handling, such as file globbing and the ability to override context.  
+ [handlebars-helper-post](https://github.com/helpers/handlebars-helper-post): `{{post}}` handlebars helper, for including a post, or a list of posts.  
+ [handlebars-helper-prettify](https://github.com/helpers/handlebars-helper-prettify): `{{prettify}}` handlebars helper, for formatting ("beautifying") HTML, CSS and JavaScript.  
+ [handlebars-helper-repeat](https://github.com/helpers/handlebars-helper-repeat): `{{repeat}}` handlebars helper, for duplicating a block of content n times.  
+ [handlebars-helper-slugify](https://github.com/helpers/handlebars-helper-slugify): Convert strings into URL slugs.             

To update this list, from the root of the project run `node docs/repos && grunt`.




## Author
+ [github.com/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter.com/jonschlinkert](http://twitter.com/jonschlinkert)

## License
Copyright (c) 2013 Jon Schlinkert, contributors.
Released under the MIT license

***

_This file was generated on Sunday, October 27, 2013._

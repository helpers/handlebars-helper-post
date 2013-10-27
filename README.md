# {{post}} [![NPM version](https://badge.fury.io/js/handlebars-helper-post.png)](http://badge.fury.io/js/handlebars-helper-post) 

> {{post}} handlebars helper, for including a post, or a list of posts.

## Quickstart
### Quickstart
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


## Options
### Helper Options

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

Compare function for sorting the post files.


### Defining options
> Options can be defined in either of the following ways:

#### hash options
Set options as hash arguments directly on the helper expressions themselves:

```handlebars
{{post 'my/book/chapters/*.hbs' sep="<!-- Chapter -->"}}
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


## Usage Examples
### Examples

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

## Author
+ [github.com/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter.com/jonschlinkert](http://twitter.com/jonschlinkert)

## Related Projects and Links
+ [handlebars-helpers](https://github.com/assemble/handlebars-helpers)
+ [helpers](https://github.com/helpers/): some great handlebars helpers that we decided not to include in the [handlebars-helpers](https://github.com/assemble/handlebars-helpers) project, most often this decision is due to either the size of the code footprint, the helper wasn't generic enough, or there is a potential variable name conflict that we'd like to avoid..
+ [handlebars-helper-aggregate](https://github.com/assemble/handlebars-helper-aggregate): `{{aggregate}}` handlebars helper. inlines content from multiple files optionally using wildcard (globbing/minimatch) patterns. uses YAML front matter as context for each file. optionally pass in a sorting function.
+ [handlebars-helper-compose](https://github.com/assemble/handlebars-helper-compose): `{{compose}}` handlebars helper. Similar to `{{aggregate}}`, but this is a block expression helper that inlines content from multiple files differently, extracting the YAML front matter from each file to use as context. Optionally use wildcard (globbing/minimatch) patterns. Accepts compare function as 3rd parameter for sorting inlined files.
+ [handlebars-helper-moment](https://github.com/assemble/handlebars-helper-moment): `{{moment}}` handlebars helper. Combines the powers of Assemble, Handlebars.js and Moment.js into a great helper to master time.
+ [handlebars-helper-lorem](https://github.com/assemble/handlebars-helper-lorem): `{{lorem}}` handlebars helper, for generating lorem lorem placeholder text.
+ [handlebars-helper-prettify](https://github.com/assemble/handlebars-helper-prettify): `{{prettify}}` handlebars helper, for formatting ("beautifying") HTML, CSS and JavaScript.
+ [handlebars-helper-repeat](https://github.com/assemble/handlebars-helper-repeat): `{{repeat}}` handlebars helper, for duplicating a block of content n times.

## License
Copyright (c) 2013 Jon Schlinkert, contributors.
Released under the MIT license

***

_This file was generated on Sunday, October 27, 2013._

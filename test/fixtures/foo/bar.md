---
title: Foo 2
description: This is my second blog post.
foo: CCC <%= site.description %>
num: 4
---
# {{title}}
Num: {{num}}

## Page Description

> {{description}}


## Site Description

> {{foo}}


## Code

```js
var compareFn = function (a, b) {

  a = a.context[options.sortby];
  b = b.context[options.sortby];

  var result = 0;
  if (a === b) {
    result = 0;
  } else if (a > b) {
    result = 1;
  } else {
    result = -1;
  }

  if(options.order === 'desc'.toLowerCase()) {
    return result * -1;
  }
  return result;
};
```

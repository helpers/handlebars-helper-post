---
title: Foo
description: This is my first blog post.
foo: AAA <%= site.description %>
num: 1
---
# {{title}}
Num: {{num}}

## Page Description

> {{description}}


## Site Description

> {{foo}}


## Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>\{{title}}</title>
  </head>
  <body>
    \{{> body }}
  </body>
</html>
```

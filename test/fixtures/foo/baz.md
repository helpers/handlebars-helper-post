---
title: Baz
description: This is my third blog post.
foo: DDD <%= site.description %>
num: 3
---
# {{title}}
Num: {{num}}

## Page Description

> {{description}}

{{> alert alert.success }}

## Site Description

> {{foo}}


## Code

```less
@color: red;

.sidebar {
  color: @color;
}
```

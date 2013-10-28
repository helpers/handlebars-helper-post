---
title: Content
description: This is a blockquote
foo: BBB <%= site.description %>
num: 2
---
# {{title}}
Num: {{num}}

## Page Description
> {{description}}

{{name}}

<!-- Nested-included content -->
This content won't be included if the `cwd` is set directly on the
options of the helper, or on the hash options, but not on this instance.
In other words, this particular instance below won't be using the `cwd`
that was set on the other instances.

Thus, if you don't see the content defined by `\{{post 'baz.md'}}` below,
then that is what's happening.
{{post 'baz.md'}}
<!-- /Nested-included content -->

## Site Description
> {{foo}}

* bullet one
* bullet two
* bullet three

This is a regular paragraph.


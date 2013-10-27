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

<!-- Included content -->
{{post 'baz.md'}}

<!-- /Included content -->

## Site Description
> {{foo}}

* bullet one
* bullet two
* bullet three

This is a regular paragraph.


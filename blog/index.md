---
layout: default
title: Blog
---

# pr00thmatic's thoughts

Welcome to my blog! Here I write about programming, game development, and conversations with synthetic minds.

## Posts

{% for post in site.posts %}
- [{{ post.title }}]({{ post.url }}) - {{ post.date | date: "%B %d, %Y" }}
{% endfor %}

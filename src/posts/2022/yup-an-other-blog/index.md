---
title: "Yup, an other blog"
image: ./yup-an-other-blog.webp
summary: Hello World! 👋🏽
date: 2022-08-01
layout: layouts/post.vto
---

> Picture: Gaël G.

## Hello World! 👋🏽

Hello, I'm Gaël and welcome to my technical blog.

### About me

I am from Switzerland and currently work as a DevOps engineer. The piece of code
below which displays a random bio, summarizes the things that interest me.

```ts
const bio = [
  'Devops Engineer from Switzerland, Lausanne',
  'Devops Engineer based in Switzerland',
  'Devops Engineer who loves old school Hip-Hop',
  'Devops Engineer, photographer lover',
  'Devops Engineer who likes sick and fresh UI',
  'Devops Engineer fan of The Los Angeles Lakers',
  'Devops Engineer who likes to watch the Formula 1 Grand Prix on Sunday',
]

  author: {
    name: 'Gaël G.',
    avatar: '/assets/profile.webp',
    status: '👋🏽',
    bio: bio[~~(Math.random() * bio.length)],
   ...
  },
```

### Scope

I will post about the following topic:

- CI/CD
- Linux/Ops
- Python, Golang
- Web Development
- Github Actions, GitLab CI/CD
- Photography and other

### Everything is Markdown

To be correct, this is not a blog as such. This website it's more like my public
note-taking directory. I take my notes using [Obsidian](https://obsidian.md/)
tool which uses `Markdown` text formatting. This blog is powered by the Urara
project which also based on `.md` files. Thanks to a bit of automation with
Github actions, it allows me to easily create/edit a new article on
[blog.gothuey.dev](https://blog.gothuey.dev/).

### Final word

Let's see where this small blog will go.

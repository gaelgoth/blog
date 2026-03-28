---
title: "Vaporflow Start page"
image: ./vaporflow-startpage.webp
summary: A browser start page with daisyui distinctive aesthetic, featuring OpenWeather
date: 2023-04-29
tags: ["typescript", "web"]
layout: layouts/post.vto
---

## Introduction

Recently, I decided to learn typescript by working on a small project called
[vaporflow-startpage](https://github.com/gaelgoth/vaporflow-startpage), a
customizable browser start page. While I had some experience with JavaScript and
Vue.js, I had never worked with typescript and React before. Here's how I went
about learning typescript through this project.

<github-card user="gaelgoth" repo="vaporflow-startpage"></github-card>

## The idea

I started my typescript journey by using the
[React Vite Boilerplate](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite),
which provided a great starting point for building my own Chrome extension.
While exploring various open source projects, I stumbled upon
[r/startpages](https://www.reddit.com/r/startpages/) subreddit, where I
discovered numerous custom browser start page projects. I was inspired by the
designs and decided to create my own start page with a minimalist approach that
suits my needs.

## The implementation

The code is very (very) simple and contains avoidable duplications. In addition
to the bookmarks, I have integrated the weather display using OpenWeather and a
theme picker. After completing my first version of the start page, I shared it
on the r/startpage subreddit. To my surprise, it received a strong positive
response from the community. This unexpected success has made
vaporflow-startpage my most popular project to date 😄.

<iframe title="reddit" src="https://embed.reddit.com/r/startpages/comments/11j3fm6/vaporflow_a_startpage_build_with_daisyui_tailwind/?embed=true&ref_source=embed&ref=share&utm_medium=widgets&utm_source=embedv2&utm_term=23&theme=dark&utm_name=post_embed" width="640" scrolling="no" allowfullscreen="true" sandbox="allow-scripts allow-same-origin allow-popups" style="border: none; max-width: 100%; border-radius: 8px; display: block; margin: 0px auto;" height="500"></iframe>

## Lessons Learned

Working on
[vaporflow-startpage](https://github.com/gaelgoth/vaporflow-startpage) has been
an exciting journey for me to learn typescript and React. By starting with a
boilerplate and exploring various open source projects, I was able to develop my
own custom browser start page. Through this process, I learned the basics of
typescript and React, as well as how to integrate APIs like OpenWeather.

## Conclusion

The positive response from the r/startpage community has been an added bonus and
has inspired me to improve and maintain this small project. I look forward to
creating more exciting projects in the future.

## Useful resources ✨

- [Boilerplate React Vite](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite)
- [Vite Plugin](https://vitejs.dev/guide/api-plugin.html)
- [Chrome Extension with manifest 3](https://developer.chrome.com/docs/extensions/mv3/)
- [Rollup](https://rollupjs.org/guide/en/)
- [Rollup-plugin-chrome-extension](https://www.extend-chrome.dev/rollup-plugin)
- [Tailwind CSS](https://tailwindcss.com/docs/configuration)

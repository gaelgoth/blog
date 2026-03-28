---
title: "Platform Engineering: Building a portal for Developers with Backstage"
image: ./backstage-laptop-banner.webp
summary: My Medium Post about Backstage.io
date: 2024-05-17
tags: ["typescript", "platform-engineering"]
layout: layouts/post.vto
---

## Check out my article on Backstage

I wrote an
[article](https://medium.com/elca-it/platform-engineering-building-a-portal-for-developers-with-backstage-c51e74662eba)
about the adoption of [Backstage](https://backstage.io/) as a central hub for
developers in my company. My team and I oversee 600 projects with assets on both
public cloud and on-premises, including Jenkins controllers and Azure
subscriptions.

In this
[Medium post](https://medium.com/elca-it/platform-engineering-building-a-portal-for-developers-with-backstage-c51e74662eba),
I present how Backstage serves as an Internal Developer Platform (IDP),
streamlining the management of these diverse resources and providing
self-service capabilities for software engineering Teams in
[ELCA](https://www.elca.ch/en) company.

I worked the last few months on integrating and developing custom plugins for
self-service tooling and asset management. The stack of a Backstage plugin is
quite standard:

- Backstage is a monorepo structure with plugins in separate folders.
- In the frontend, we use React.
- The backend uses NodeJS and Express for APIs.

Now, this Backstage instance is in production and also used by developers to
deploy and manage their resources.

For more information, please consult the
[article on Medium](https://medium.com/elca-it/platform-engineering-building-a-portal-for-developers-with-backstage-c51e74662eba)
😉

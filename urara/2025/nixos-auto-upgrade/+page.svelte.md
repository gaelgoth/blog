---
title: 'Keeping NixOS Fresh: Automated Updates with GitHub Actions and Renovate'
image: '/2024/backstage-medium-post/backstage-laptop-banner.webp'
flags:
  - unlisted
summary: How I set up self updating homelab environnement
created: 2025-02-10
# updated: 2022-10-20
tags: ['Home lab', 'GitOps', 'Container', 'NixOs']
---

I recently migrated my homelab server from my [2011 Mac Mini](/2023/mac-mini-as-homeserver/) to a dedicated VM running on my NAS. During this transition, I started exploring Infrastructure as Code tools to manage the services I deploy on my server. Initially, I considered using a combination of Ansible and Terraform, but I stumbled upon this distribution that caught my eyes, NixOs.

> Sidenote about NixOS: In few word, [NixOS](https://nixos.org/) is a Linux distribution with an approach to package management and system configuration, using declarative configuration files for reproducible and reliable setups.

As someone used to Debian base distro, jumping into NixOS feels like learning a new language. The way it handles package installation and system configuration is different from what I’m \*used to. But after pushing through the learning curve and finally getting my homelab to a stable state, I’m ready for the next step: **automating updates**.

<img src="/2025/nixos-auto-upgrade/nixos-funny-tweet.webp" alt="NixOs funny tweet" width="400" style="display: block; margin: 0 auto;" />

## The GitOps way

Since all my Infra as code is stored in GitHub it allows me to have all benefits of the gitops approach. To be able to update my system frequently I have to put in place some sort of automation to sync my Nix configurations with my environment.

<!-- TODO: set excalidraw schema there -->

Components overview of my homelab environment auto update:

- **My homelab git repository**: [store Nix configuration](https://github.com/gaelgoth/nix-homelab)

- **nix-homalab**: VM running on my local network, it should be always synchronised with the configuration described in the repository

- **GitHub Actions "nix flake update"**: GitHub Actions that update Nix packages

- **Renovate bot**: It takes care to update containers tags

- **(Me)**: For security reason I'm the only maintainer of my repo allowed of pushing changes on this repository. This avoid third party to update my environment.

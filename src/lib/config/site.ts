import type { SiteConfig } from '$lib/types/site'

const bio = [
  'Devops Engineer from Switzerland, Lausanne',
  'Devops Engineer based in Switzerland',
  'Devops Engineer who loves old school Hip-Hop',
  'Devops Engineer, photographer lover',
  'Devops Engineer who likes sick and fresh UI',
  'Devops Engineer fan of The Los Angeles Lakers',
  'Devops Engineer who likes to watch the Formula 1 Grand Prix on Sunday',
]


export const site: SiteConfig = {
  protocol: 'https://',
  domain: import.meta.env.URARA_SITE_DOMAIN ?? 'blog.gothuey.dev',
  title: 'Gaël G.',
  subtitle: "Blog",
  lang: 'en-US',
  description: 'The place where I share things I find interesting',
  author: {
    name: 'Gaël G.',
    avatar: '/assets/profile.webp',
    status: '👋🏽',
    bio: bio[~~(Math.random() * bio.length)],
    metadata: [
      {
        text: 'gaelgoth',
        icon: 'i-simple-icons-github',
        link: 'https://github.com/gaelgoth'
      },
      {
        text: 'gaelgothuey',
        icon: 'i-simple-icons-linkedin',
        link: 'https://www.linkedin.com/in/gael-gothuey'
      },
      {
        text: 'photo.gothuey',
        icon: 'i-simple-icons-photon',
        link: 'https://photo.gothuey.dev/'
      },
    ]
  },
  themeColor: '#3D4451'
}

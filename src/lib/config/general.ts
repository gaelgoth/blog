import type { ThemeConfig, HeadConfig, HeaderConfig, FooterConfig, DateConfig, FeedConfig } from '$lib/types/general'

export const theme: ThemeConfig = [
  {
    name: 'cmyk',
    text: '🖨 Light'
  },
  {
    name: 'dracula',
    text: '🌑 Dark'
  }
  // {
  //   name: 'dracula',
  //   text: '🧛 Dracula'
  // },
  // {
  //   name: 'cupcake',
  //   text: '🧁 Cupcake'
  // },
  // {
  //   name: 'bumblebee',
  //   text: '🐝 Bumblebee'
  // },
  // {
  //   name: 'emerald',
  //   text: '✳️ Emerald'
  // },
  // {
  //   name: 'corporate',
  //   text: '🏢 Corporate'
  // },
  // {
  //   name: 'valentine',
  //   text: '🌸 Valentine'
  // },
  // {
  //   name: 'synthwave',
  //   text: '🌃 Synthwave'
  // },
  // {
  //   name: 'retro',
  //   text: '🌇 Retro'
  // },
  // {
  //   name: 'cyberpunk',
  //   text: '🌐 Cyberpunk'
  // },
  // {
  //   name: 'halloween',
  //   text: '🎃 Halloween'
  // },
  // {
  //   name: 'garden',
  //   text: '🏡 Garden'
  // },
  // {
  //   name: 'forest',
  //   text: '🌲 Forest'
  // },
  // {
  //   name: 'aqua',
  //   text: '💦 Aqua'
  // },
  // {
  //   name: 'lofi',
  //   text: '🎶 Lo-Fi'
  // },
  // {
  //   name: 'pastel',
  //   text: '🌈 Pastel'
  // },
  // {
  //   name: 'fantasy',
  //   text: '🐣 Fantasy'
  // },
  // {
  //   name: 'wirefream',
  //   text: '📱 Wireframe'
  // },
  // {
  //   name: 'black',
  //   text: '🖤 Black'
  // },
  // {
  //   name: 'luxury',
  //   text: '💰 Luxury'
  // },
  // {
  //   name: 'cmyk',
  //   text: '🖨️ CMYK'
  // },
  // {
  //   name: 'autumn',
  //   text: '🍂 Autumn'
  // },
  // {
  //   name: 'business',
  //   text: '🗄️ Business'
  // },
  // {
  //   name: 'acid',
  //   text: '🌧️ Acid'
  // },
  // {
  //   name: 'lemonade',
  //   text: '🍋 Lemonade'
  // },
  // {
  //   name: 'night',
  //   text: '🌃 Night'
  // },
  // {
  //   name: 'coffee',
  //   text: '☕ Coffee'
  // },
  // {
  //   name: 'winter',
  //   text: '❄️ Winter'
  // }
]

export const head: HeadConfig = {}

export const header: HeaderConfig = {
  nav: [
    {
      text: 'Home',
      link: '/'
    },
    {
      text: 'About',
      link: '/about'
    },
    {
      text: 'Photography',
      link: 'https://photo.gothuey.dev/'
    }
  ]
}

export const footer: FooterConfig = {
  nav: [
    {
      text: 'Feed',
      link: '/atom.xml'
    },
    {
      text: 'Sitemap',
      link: '/sitemap.xml'
    }
  ]
}

export const date: DateConfig = {
  locales: 'en-gb',
  options: {
    year: '2-digit',
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  }
}

export const feed: FeedConfig = {}

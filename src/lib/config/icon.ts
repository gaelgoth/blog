import type { Icon } from '$lib/types/icon'
import { site } from '$lib/config/site'

export const favicon: Icon = {
  src: site.protocol + site.domain + '/favicon.ico',
  sizes: '48x48',
  type: 'image/png'
}

export const any: { [key: number]: Icon } = {
  180: {
    src: site.protocol + site.domain + '/assets/android-chrome-192x192.png',
    sizes: '192x192',
    type: 'image/png'
  },
  192: {
    src: site.protocol + site.domain + '/assets/apple-touch-icon.png',
    sizes: '192x192',
    type: 'image/png'
  },
  512: {
    src: site.protocol + site.domain + '/assets/android-chrome-512x512.png',
    sizes: '512x512',
    type: 'image/png'
  }
}

export const maskable: { [key: number]: Icon } = {
  192: {
    src: site.protocol + site.domain + '/assets/android-chrome-192x192.png',
    sizes: '192x192',
    type: 'image/png'
  },
  512: {
    src: site.protocol + site.domain + '/assets/apple-touch-icon.png',
    sizes: '512x512',
    type: 'image/png'
  }
}

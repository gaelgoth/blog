import type { PostConfig } from '$lib/types/post'

export const post: PostConfig = {
  comment: {
    use: ['Giscus'],
    giscus: {
      repo: 'gaelgoth/blog',
      repoID: 'R_kgDONvmwGA',
      category: 'Comments',
      categoryID: 'DIC_kwDONvmwGM4CmzXe',
      reactionsEnabled: true,
      inputPosition: 'top',
      lang: 'en',
      theme: 'preferred_color_scheme',
      loading: 'lazy'
    }
  }
}

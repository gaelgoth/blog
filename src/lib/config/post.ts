import type { PostConfig } from '$lib/types/post'

export const post: PostConfig = {
    comment: {
        use: ['Giscus'],
        giscus: {
            repo: 'gaelgoth/blog',
            repoID: 'R_kgDOHydF9Q',
            category: 'Comments',
            categoryID: 'DIC_kwDOHydF9c4CWIYO',
            reactionsEnabled: true,
            inputPosition: 'top',
            lang: 'en',
            theme: 'preferred_color_scheme',
            loading: 'lazy'
        }
    }
}
export const layout = "layouts/tag-page.vto";

export default function* (data: Lume.Data) {
  const { search } = data;

  for (const tag of search.values("tags", "type=post") as string[]) {
    yield {
      url: `/tags/${tag.toLowerCase().replace(/\s+/g, "-")}/`,
      title: `#${tag}`,
      tag,
      metas: {
        title: `#${tag} — gaelgoth.dev`,
        description: `Articles tagged with ${tag}.`,
      },
    };
  }
}

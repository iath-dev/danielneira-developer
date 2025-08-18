import type { CollectionEntry } from 'astro:content';

// Simula conexión a DB (será reemplazado por API de Next.js)
export const fetchContent = {
  projects: async (): Promise<Portfolio.Project[]> => {
    // Implementación para desarrollo con Markdown
    const projects = await import.meta.glob<CollectionEntry<'projects'>>(
      '../content/projects/*.md',
      { eager: true }
    );

    return Object.values(projects).map(({ frontmatter, body, slug }) => ({
      id: slug,
      slug,
      title: frontmatter.title,
      description: frontmatter.description,
      content: body,
      image: frontmatter.image || null,
      technologies: frontmatter.technologies || [],
      github_url: frontmatter.github_url,
      demo_url: frontmatter.demo_url,
      featured: frontmatter.featured ?? false,
      published_at: frontmatter.published_at || new Date().toISOString(),
      metadata: {
        keywords: frontmatter.keywords,
        ogImage: frontmatter.og_image,
      },
    }));
  },
};

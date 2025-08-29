import { getEntry } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Summary } from 'src/interfaces/Summary';
import type { Project } from 'src/interfaces/Project';
import type { Skill } from 'src/interfaces/Skill';
import type { SocialLink } from 'src/interfaces/SocialLink';

/**
 * Obtiene los datos de una entrada específica de una colección de contenido.
 *
 * @param collection - El nombre de la colección de la que se quieren obtener los datos.
 * @param slug - El slug de la entrada que se quiere obtener.
 * @returns Los datos de la entrada de la colección.
 */
export async function getData<T>(
  collection: 'projects' | 'personal-data' | 'summary' | 'skills' | 'social-links',
  slug: string
): Promise<T> {
  const entry = await getEntry(collection, slug);

  if (!entry) {
    throw new Error(
      `No se encontró ninguna entrada con el slug "${slug}" en la colección "${collection}".`
    );
  }

  return entry.data as T;
}

// Simula conexión a DB (será reemplazado por API de Next.js)
export const fetchContent = {
  summary: async (): Promise<Summary> => {
    const summary = await import.meta.glob<CollectionEntry<'summary'>>(
      '../content/summary.md',
      { eager: true }
    );

    return Object.values(summary).map(({ frontmatter }) => ({
      title: frontmatter.title,
      summary: frontmatter.summary,
    }))[0];
  },
  projects: async (): Promise<Project[]> => {
    // Implementación para desarrollo con Markdown
    const projects = await import.meta.glob<CollectionEntry<'projects'>>(
      '../content/projects/*.md',
      { eager: true }
    );

    return Object.entries(projects)
      .map(([path, project]) => {
        const slug = path.split('/').pop().replace('.md', '');
        return {
          id: slug,
          title: project.frontmatter.title,
          description: project.frontmatter.description,
          technologies: project.frontmatter.technologies || [],
          github: project.frontmatter.github,
          demo: project.frontmatter.demo,
          created: project.frontmatter.created,
          featured: project.frontmatter.featured,
          image: project.frontmatter.image,
          content: project.compiledContent(),
        };
      })
      .sort(
        (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
      );
  },
  skills: async (): Promise<Skill[]> => {
    const skills = await import.meta.glob<CollectionEntry<'skills'>>(
      '../content/skills.md',
      { eager: true }
    );

    return Object.values(skills).map(({ frontmatter }) => frontmatter.skills)[0];
  },
  socialLinks: async (): Promise<SocialLink[]> => {
    const socialLinks = await import.meta.glob<CollectionEntry<'social-links'>>(
      '../content/social-links.md',
      { eager: true }
    );

    return Object.values(socialLinks).map(({ frontmatter }) => frontmatter.social_links)[0];
  },
};

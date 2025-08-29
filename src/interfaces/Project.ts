export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  image?: string | null;
  technologies: string[];
  github?: string;
  demo?: string;
  featured: boolean;
  published_at: string;
  metadata?: {
    keywords?: string[];
    ogImage?: string;
  };
}

export type ProjectCard = Pick<
  Project,
  'title' | 'slug' | 'description' | 'image' | 'technologies' | 'featured'
>;

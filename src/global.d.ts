// Tipos compartidos con futura app de Next.js
declare namespace Portfolio {
  interface Project {
    id: string;
    slug: string;
    title: string;
    description: string;
    content: string;
    image?: string | null;
    technologies: string[];
    github_url?: string;
    demo_url?: string;
    featured: boolean;
    published_at: string;
    metadata?: {
      keywords?: string[];
      ogImage?: string;
    };
  }

  type ProjectCard = Pick<
    Project,
    'title' | 'slug' | 'description' | 'image' | 'technologies' | 'featured'
  >;
}

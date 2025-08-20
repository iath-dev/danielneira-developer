export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  created?: string;
  featured?: boolean;
  content?: string;
  image?: string;
}
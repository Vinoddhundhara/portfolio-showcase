import { motion } from "framer-motion";
import { ExternalLink, Github, Code2 } from "lucide-react";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-2xl overflow-hidden glass-panel border-white/5 h-full flex flex-col"
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold font-display mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-grow">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-mono rounded-md bg-primary/10 text-primary border border-primary/20"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-auto">
          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
            >
              <ExternalLink size={16} /> Live Demo
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
            >
              <Github size={16} /> Source Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

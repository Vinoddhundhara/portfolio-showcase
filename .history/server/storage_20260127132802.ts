import {
  messages, projects, skills,
  type InsertMessage, type Message,
  type InsertProject, type Project,
  type InsertSkill, type Skill
} from "@shared/schema";

export interface IStorage {
  createMessage(message: InsertMessage): Promise<Message>;
  getProjects(): Promise<Project[]>;
  getSkills(): Promise<Skill[]>;
  seedData(): Promise<void>;
}

export class MemStorage implements IStorage {
  private messages: Map<number, Message>;
  private projects: Map<number, Project>;
  private skills: Map<number, Skill>;
  private messageId: number;
  private projectId: number;
  private skillId: number;

  constructor() {
    this.messages = new Map();
    this.projects = new Map();
    this.skills = new Map();
    this.messageId = 1;
    this.projectId = 1;
    this.skillId = 1;
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.messageId++;
    const message: Message = {
      ...insertMessage,
      id,
      createdAt: new Date(),
    };
    this.messages.set(id, message);
    return message;
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getSkills(): Promise<Skill[]> {
    return Array.from(this.skills.values());
  }

  async seedData(): Promise<void> {
    if (this.projects.size === 0) {
      const initialProjects: InsertProject[] = [
        {
          title: "E-Commerce Platform",
          description: "A full-featured online store with shopping cart, payment integration, and admin dashboard.",
          imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
          projectUrl: "https://demo-store.com",
          repoUrl: "https://github.com/username/store",
          technologies: ["React", "Node.js", "PostgreSQL", "Stripe"]
        },
        {
          title: "Task Management App",
          description: "Collaborative task manager with real-time updates and team workspaces.",
          imageUrl: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=800&q=80",
          projectUrl: "https://task-app.com",
          repoUrl: "https://github.com/username/tasks",
          technologies: ["Vue.js", "Firebase", "Tailwind CSS"]
        },
        {
          title: "AI Image Generator",
          description: "Web application that uses AI models to generate unique artwork from text descriptions.",
          imageUrl: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800&q=80",
          projectUrl: "https://ai-art.com",
          repoUrl: "https://github.com/username/ai-art",
          technologies: ["Python", "TensorFlow", "React", "FastAPI"]
        }
      ];

      for (const project of initialProjects) {
        const id = this.projectId++;
        this.projects.set(id, { ...project, id, createdAt: new Date() });
      }
    }

    if (this.skills.size === 0) {
      const initialSkills: InsertSkill[] = [
        { name: "React", category: "Frontend", proficiency: 90 },
        { name: "TypeScript", category: "Frontend", proficiency: 85 },
        { name: "Node.js", category: "Backend", proficiency: 70 },
        { name: "Python", category: "Backend", proficiency: 75 },
        { name: "PostgreSQL", category: "Database", proficiency: 70 },
        { name: "Docker", category: "DevOps", proficiency: 65 }
        
      ];

      for (const skill of initialSkills) {
        const id = this.skillId++;
        this.skills.set(id, { ...skill, id });
      }
    }
  }
}

export const storage = new MemStorage();

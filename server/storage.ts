import { db } from "./db";
import {
  messages, projects, skills,
  type InsertMessage, type Message,
  type InsertProject, type Project,
  type InsertSkill, type Skill
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  createMessage(message: InsertMessage): Promise<Message>;
  getProjects(): Promise<Project[]>;
  getSkills(): Promise<Skill[]>;
  seedData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db.insert(messages).values(insertMessage).returning();
    return message;
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(projects.id);
  }

  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills).orderBy(skills.id);
  }

  async seedData(): Promise<void> {
    const existingProjects = await this.getProjects();
    if (existingProjects.length === 0) {
      await db.insert(projects).values([
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
          technologies: ["Python", "TensorFlow", "React", "FastAPI"]
        }
      ]);
    }

    const existingSkills = await this.getSkills();
    if (existingSkills.length === 0) {
      await db.insert(skills).values([
        { name: "React", category: "Frontend", proficiency: 90 },
        { name: "TypeScript", category: "Frontend", proficiency: 85 },
        { name: "Node.js", category: "Backend", proficiency: 80 },
        { name: "Python", category: "Backend", proficiency: 75 },
        { name: "PostgreSQL", category: "Database", proficiency: 70 },
        { name: "Docker", category: "DevOps", proficiency: 65 }
      ]);
    }
  }
}

export const storage = new DatabaseStorage();

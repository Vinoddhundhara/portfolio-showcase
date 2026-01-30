import {
  type InsertMessage, type Message,
  type InsertProject, type Project,
  type InsertSkill, type Skill
} from "@shared/schema";

import { Pool } from "pg";

/* =======================
   DATABASE CONNECTION
======================= */

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/* =======================
   STORAGE INTERFACE
======================= */

export interface IStorage {
  createMessage(message: InsertMessage): Promise<Message>;
  getProjects(): Promise<Project[]>;
  getSkills(): Promise<Skill[]>;
  seedData(): Promise<void>;
}

/* =======================
   DATABASE STORAGE
======================= */

export class DBStorage implements IStorage {

  /* ---------- MESSAGES ---------- */
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const result = await pool.query(
      `
      INSERT INTO messages (name, email, message)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, message, created_at as "createdAt"
      `,
      [
        insertMessage.name,
        insertMessage.email,
        insertMessage.message,
      ]
    );

    return result.rows[0];
  }

  /* ---------- PROJECTS ---------- */
  async getProjects(): Promise<Project[]> {
    const result = await pool.query(
      `
      SELECT 
        id, title, description, image_url as "imageUrl",
        project_url as "projectUrl",
        repo_url as "repoUrl",
        technologies,
        created_at as "createdAt"
      FROM projects
      ORDER BY created_at DESC
      `
    );

    return result.rows;
  }

  /* ---------- SKILLS ---------- */
  async getSkills(): Promise<Skill[]> {
    const result = await pool.query(
      `
      SELECT id, name, category, proficiency
      FROM skills
      ORDER BY proficiency DESC
      `
    );

    return result.rows;
  }

  /* ---------- SEED DATA ---------- */
  async seedData(): Promise<void> {
    // Optional – agar already data hai to kuch nahi karega
    return;
  }
}

/* =======================
   EXPORT STORAGE INSTANCE
======================= */

export const storage = new DBStorage();

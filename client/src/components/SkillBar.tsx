import { motion } from "framer-motion";
import type { Skill } from "@shared/schema";

export default function SkillBar({ skill }: { skill: Skill }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium font-mono">{skill.name}</span>
        <span className="text-sm font-medium text-muted-foreground">{skill.proficiency}%</span>
      </div>
      <div className="w-full bg-secondary rounded-full h-2.5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.proficiency}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="bg-gradient-to-r from-primary to-purple-400 h-2.5 rounded-full"
        />
      </div>
    </div>
  );
}

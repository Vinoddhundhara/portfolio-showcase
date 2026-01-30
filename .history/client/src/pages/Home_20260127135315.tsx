import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Terminal,
  Cpu,
  Globe,
  Database,
  Send,
  Loader2
} from "lucide-react";
import Navbar from "@/components/Navbar";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import SkillBar from "@/components/SkillBar";
import { useProjects, useSkills, useContact } from "@/hooks/use-portfolio";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: skills, isLoading: skillsLoading } = useSkills();
  const contactMutation = useContact();
  const { toast } = useToast();

  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertMessage) => {
    contactMutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Message Sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      },
    });
  };

  const categorizedSkills = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden pt-16">
        {/* Abstract Background Shapes */}
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-white/10 mb-6 backdrop-blur-sm"
            >
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-mono text-muted-foreground">Available for work</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
              Building <br />
              <span className="gradient-text">Digital Experiences</span>
              <br /> That Matter.
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
              I'm an aspiring Software Developer passionate about creating beautiful, functional, and user-centered applications.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 text-lg h-12 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Projects
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 text-lg h-12 border-white/10 hover:bg-white/5"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Contact Me
              </Button>
            </div>

            <div className="mt-12 flex gap-6 text-muted-foreground">
  <a
    href="https://github.com/YOUR_GITHUB_USERNAME"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-primary transition-colors"
  >
    <Github size={24} />
  </a>

  <a
    href="https://www.linkedin.com/in/YOUR_LINKEDIN_ID"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-primary transition-colors"
  >
    <Linkedin size={24} />
  </a>

  <a
    href="mailto:vinoddhundhara77@gmail.com"
    className="hover:text-primary transition-colors"
  >
    <Mail size={24} />
  </a>
</div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 w-full aspect-square rounded-3xl overflow-hidden border border-white/10 glass-panel p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />

              {/* Code Editor Mockup */}
              <div className="w-full h-full rounded-xl bg-[#1e1e1e] shadow-2xl overflow-hidden flex flex-col font-mono text-sm">
                <div className="bg-[#2d2d2d] px-4 py-3 flex gap-2 items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="p-6 text-blue-400">
                  <span className="text-purple-400">const</span> <span className="text-yellow-400">Developer</span> = {"{"} <br />
                  &nbsp;&nbsp;name: <span className="text-green-400">"Vinod"</span>,<br />
                  &nbsp;&nbsp;role: <span className="text-green-400">"Full Stack Engineer"</span>,<br />
                  &nbsp;&nbsp;skills: [<span className="text-green-400">"React"</span>, <span className="text-green-400">"TypeScript"</span>, <span className="text-green-400">"Node"</span>],<br />
                  &nbsp;&nbsp;hardWorker: <span className="text-orange-400">true</span>,<br />
                  &nbsp;&nbsp;passionate: <span className="text-orange-400">true</span><br />
                  {"}"};
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-secondary/20">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeading title="About Me" subtitle="A little bit about who I am and what I do." />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-8 md:p-12 rounded-3xl text-lg leading-relaxed text-muted-foreground"
          >
            <p className="mb-6">
              I am a MERN Stack Web Developer with a strong foundation in JavaScript, React, Node.js, and MongoDB. With a background in Computer Science Engineering (Diploma + B.Tech),
              I have hands-on experience in building full-stack applications.
              Along with development, I actively practice Data Structures & Algorithms to enhance my problem-solving skills.
              I am passionate about modern web technologies and aspire to grow as a Software Engineer while contributing to impactful projects.
            </p>
            <p>
              Key Skills: MERN Stack | JavaScript | Problem-Solving | DSA
              Open to: Full-Stack Development Roles | Software Development Internships | Software Engineering Opportunities
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="Technical Skills" subtitle="The technologies I work with daily." />

          {skillsLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-primary w-8 h-8" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(categorizedSkills || {}).map(([category, categorySkills], idx) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-panel p-6 rounded-2xl"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      {category === "Frontend" && <Globe size={24} />}
                      {category === "Backend" && <Database size={24} />}
                      {category === "Tools" && <Terminal size={24} />}
                      {!["Frontend", "Backend", "Tools"].includes(category) && <Cpu size={24} />}
                    </div>
                    <h3 className="text-xl font-bold font-display">{category}</h3>
                  </div>
                  <div className="space-y-4">
                    {categorySkills.map((skill) => (
                      <SkillBar key={skill.id} skill={skill} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="Featured Projects" subtitle="Some of the things I've built recently." />

          {projectsLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-primary w-8 h-8" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects?.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Currently Working On */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="glass-panel rounded-3xl p-8 md:p-12 border border-primary/20 bg-gradient-to-br from-card to-primary/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10" />

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-sm font-bold text-primary tracking-widest uppercase mb-2">Current Focus</h3>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Learning Advanced AI Integration</h2>
                <p className="text-muted-foreground mb-6">
                  Currently exploring Large Language Models and how to integrate them into practical web applications to solve real-world problems. Building a personal assistant bot using OpenAI's API.
                </p>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "65%" }}
                    viewport={{ once: true }}
                    className="h-full bg-primary"
                  />
                </div>
                <div className="mt-2 text-right text-sm text-muted-foreground font-mono">65% Complete</div>
              </div>
              <div className="relative">
                <div className="aspect-video rounded-xl bg-black/50 border border-white/10 flex items-center justify-center">
                  <Cpu className="w-16 h-16 text-primary/50 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-secondary/20">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeading title="Get In Touch" subtitle="Have a project in mind or just want to say hi?" />

          <div className="glass-panel p-8 md:p-12 rounded-3xl">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    placeholder="Your Name"
                    {...form.register("name")}
                    className="bg-secondary/50 border-white/10 focus:border-primary h-12"
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-500 text-xs">{form.formState.errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    placeholder="your@email.com"
                    {...form.register("email")}
                    className="bg-secondary/50 border-white/10 focus:border-primary h-12"
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-xs">{form.formState.errors.email.message}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea
                  placeholder="Tell me about your project..."
                  className="min-h-[150px] bg-secondary/50 border-white/10 focus:border-primary resize-none p-4"
                  {...form.register("message")}
                />
                {form.formState.errors.message && (
                  <p className="text-red-500 text-xs">{form.formState.errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={contactMutation.isPending}
                className="w-full h-12 text-lg font-medium bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25"
              >
                {contactMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin w-5 h-5" /> Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Send Message <Send size={18} />
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Portfolio. Built with React & Tailwind.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">GitHub</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">LinkedIn</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

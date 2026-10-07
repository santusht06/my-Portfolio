export const curatedQuotes = [
  {
    text: "If the pain doesn't kill me, it will only make me stronger.",
    author: "Sung Jin-woo, Solo Leveling",
  },
  {
    text: "Talk is cheap. Show me the code.",
    author: "Linus Torvalds",
  },
  {
    text: "Simplicity is prerequisite for reliability.",
    author: "Edsger W. Dijkstra",
  },
  {
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
  },
  {
    text: "You have power over your mind - not outside events. Realize this, and you will find strength.",
    author: "Marcus Aurelius",
  },
  {
    text: "We suffer more often in imagination than in reality.",
    author: "Seneca",
  },
  {
    text: "There are only two hard things in Computer Science: cache invalidation and naming things.",
    author: "Phil Karlton",
  },
  {
    text: "Hard work is worthless for those that don't believe in themselves.",
    author: "Naruto Uzumaki",
  },
  {
    text: "Fear is not evil. It tells you what your weakness is. Once you know it, you become stronger.",
    author: "Gildarts Clive, Fairy Tail",
  },
  {
    text: "If you don't take risks, you can't create a future.",
    author: "Monkey D. Luffy",
  },
  {
    text: "Everything around you that you call life was made up by people no smarter than you.",
    author: "Steve Jobs",
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
  },
  {
    text: "Those who cannot acknowledge themselves will eventually fail.",
    author: "Itachi Uchiha",
  },
  {
    text: "Waste no more time arguing about what a good man should be. Be one.",
    author: "Marcus Aurelius",
  },
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
  },
  {
    text: "Arise.",
    author: "Shadow Monarch, Solo Leveling",
  },
  {
    text: "A system is only as reliable as its weakest failure mode.",
    author: "Systems Architecture Axiom",
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
];

export const profileData = {
  name: "Santusht Kotai",
  title: "Software Engineer | Backend Engineering | Distributed Systems",
  email: "santushtkotai1221@gmail.com",
  website: "https://santusht.online",
  websiteDisplay: "santusht.online",
  location: "Indore, India",
  summary:
    "Living between terminal windows, lofi beats, and real-world wonder — crafting things that work silently so life can happen loudly.",
  quote: curatedQuotes[0],
  socials: [
    { name: "GitHub", url: "https://github.com/santusht06", label: "github.com/santusht06" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/santusht-kotai-8a4454323", label: "LinkedIn Profile" },
    { name: "Website", url: "https://santusht.online", label: "santusht.online" },
    { name: "Email", url: "mailto:santushtkotai1221@gmail.com", label: "Email Santusht" },
  ],
};

export const coreExpertise = [
  {
    category: "Backend Engineering",
    skills: "REST APIs, Microservices Architecture, gRPC, WebSockets, JSON, Web Services, OpenAPI/Swagger",
  },
  {
    category: "Cloud and DevOps",
    skills: "AWS (IaaS, PaaS, SaaS), Docker, Kubernetes, CI/CD, Terraform, GitHub Actions, Jenkins",
  },
  {
    category: "System Design",
    skills: "Distributed Systems, Event-Driven Architecture, Horizontal Scaling, Fault Tolerance, High Availability",
  },
  {
    category: "Security",
    skills: "OAuth 2.0, JWT, RBAC, OWASP Top 10, API Rate Limiting, AES Encryption, TLS/SSL",
  },
];

export const skillsData = {
  languages: ["Python", "Golang", "Java", "C++", "C", "JavaScript", "SQL"],
  backend: ["FastAPI", "Gin", "Spring Boot", "Node.js", "SQLAlchemy", "REST API", "OpenAPI/Swagger", "gRPC", "WebSockets"],
  cloudDevOps: ["AWS (EC2, S3, Lambda, RDS, ECS, API Gateway, SQS, CloudWatch, IAM)", "Docker", "Kubernetes", "GitHub Actions", "CI/CD", "Terraform"],
  databases: ["PostgreSQL", "MySQL", "MongoDB", "DynamoDB", "CockroachDB", "Redis - distributed caching, query optimization, indexing"],
  systems: ["Client-Server Architecture", "Networking Protocols (HTTP, TCP/IP)", "Microservices", "Operating Systems", "Linux"],
  practices: ["Agile/Scrum", "TDD", "System Design", "Git", "Postman", "Prometheus", "Grafana", "OWASP", "Code Review"],
};

export const experiences = [
  {
    company: "47 Billion",
    role: "Backend Engineer Intern, COE",
    status: "Internship",
    period: "Dec 2025 – April 2026",
    location: "Indore, India",
    technologies: ["FastAPI", "PostgreSQL", "SQLAlchemy", "AWS", "Redis", "Docker", "Kubernetes", "GitHub Actions", "OAuth 2.0", "JWT"],
    bullets: [
      "Built and maintained 25+ production REST APIs using FastAPI, PostgreSQL, and SQLAlchemy across five enterprise modules, serving 10,000+ daily API requests with consistently low response latency.",
      "Developed and deployed backend microservices on AWS using cloud-native design principles, supporting scalable workloads and automated deployment pipelines.",
      "Implemented OAuth 2.0, JWT authentication, RBAC, and API rate limiting while remediating critical security findings through OWASP-aligned security testing.",
      "Optimized PostgreSQL performance through indexing, query optimization, connection pooling, and Redis caching, improving application responsiveness and reducing database load.",
      "Containerized backend services using Docker, deployed workloads on Kubernetes, and contributed to GitHub Actions CI/CD pipelines to improve deployment reliability.",
    ],
  },
  {
    company: "Sharexpress Foundation",
    role: "Founder & Lead Engineer",
    status: "Open Source Org",
    period: "Jan 2026 – Present",
    location: "Indore, India / Remote",
    technologies: ["Distributed Systems", "FastAPI", "Docker", "Kubernetes", "Nginx", "Redis", "SMTP/IMAP", "Architecture"],
    bullets: [
      "Founded an open-source software organization focused on developer infrastructure, distributed systems, and AI-powered platforms.",
      "Lead system architecture, technical roadmap, engineering standards, and end-to-end development across multiple open-source products including Sharexpress Mail and Interleet.",
      "Mentored contributors and established CI/CD pipelines, code review guidelines, and security compliance.",
    ],
  },
];

export const achievements = [
  {
    title: "Google Summer of Code 2026 (GSoC)",
    badge: "Selected Contributor",
    org: "Supabase",
    description: "Selected as an active contributor for Supabase, engineering distributed infrastructure and developer tooling.",
  },
  {
    title: "Buildverse Education Technology Hackathon",
    badge: "Winner 2026",
    org: "Buildverse",
    description: "Won first prize for architecting scalable AI assessment and real-time distributed learning infrastructure.",
  },
  {
    title: "LeetCode Knight",
    badge: "Top 1.2% Globally",
    org: "LeetCode",
    description: "Ranked among the Top 1.2% globally with 500+ problems solved across Data Structures & Algorithms, including Graphs, Dynamic Programming, Trees, and Advanced Algorithms.",
  },
  {
    title: "Cisco Certified Professional",
    badge: "Certified",
    org: "Cisco Networking Academy",
    description: "Certified in Introduction to Modern AI, Python Essentials 1 and 2, Introduction to Cybersecurity, and Introduction to Networks.",
  },
  {
    title: "Open Source Contributor",
    badge: "Active",
    org: "Global Ecosystem",
    description: "Contributed code and improvements to React, Supabase, Vite, FastAPI, and Linux.",
  },
];

export const projects = [
  {
    title: "Sharexpress Mail Infrastructure & Cloud Services",
    period: "Jan 2026 – June 2026",
    github: "https://github.com/santusht06/sharexpress",
    githubDisplay: "github.com/santusht06/sharexpress",
    stack: ["FastAPI", "React", "Redux Toolkit", "Cockroach DB", "SMTP", "IMAP", "POP3", "Docker", "Nginx", "Kubernetes", "Minio"],
    bullets: [
      "Engineered a self-hosted mail platform from scratch, implementing core mail services using SMTP, IMAP, and POP3 protocols with 30+ REST APIs, RBAC, Redis caching, and an event-driven backend architecture for scalable mail delivery and user management.",
      "Designed and deployed the complete infrastructure stack, including containerized services, reverse proxy, service orchestration, background workers, secure authentication, and persistent storage.",
      "Optimized performance through database indexing, Redis caching, asynchronous processing, and blue-green deployment strategies.",
    ],
  },
  {
    title: "Interleet – AI Interview, Coding & System Design Platform",
    period: "April 2026 – Present",
    github: "https://github.com/santusht06/interleet",
    githubDisplay: "github.com/santusht06/interleet",
    stack: ["FastAPI", "MongoDB", "Redis", "LangChain", "React 19", "Redux Toolkit", "Docker", "WebSockets", "AWS"],
    bullets: [
      "Engineered a distributed AI assessment platform for mock interviews, coding challenges, and system design, featuring multi-provider LLM orchestration, secure authentication, and 35+ REST APIs to deliver scalable, real-time technical assessments.",
      "Built a secure code execution and evaluation engine using non-root Docker sandboxes, AST-based analysis, differential testing, mutation testing, and Redis-backed asynchronous processing to safely execute and accurately validate untrusted code.",
    ],
  },
];

export const education = {
  degree: "B.Tech - Computer Science and Engineering",
  institution: "Medicaps University, Indore, India",
  period: "Aug 2023 – Aug 2027",
  coursework: "DSA, Operating Systems, Computer Networks, DBMS, System Design, Distributed Systems, Cloud Computing, Software Engineering",
};

export const developmentGears = [
  {
    title: "Core Stack & Runtimes",
    tagline: "Primary languages and backend frameworks in daily production.",
    items: [
      { name: "Python & FastAPI / SQLAlchemy", detail: "Async REST APIs, microservices, OpenAPI, high-throughput endpoints" },
      { name: "Golang & Gin", detail: "High-concurrency microservices, lightweight daemons, goroutine worker pools" },
      { name: "Docker & Kubernetes", detail: "Containerization, pod orchestration, ingress controllers, non-root sandboxes" },
      { name: "PostgreSQL & Redis", detail: "ACID transactions, distributed caching, connection pooling, indexing" },
      { name: "AWS Cloud Infrastructure", detail: "EC2, S3, RDS, ECS, Lambda, SQS, CloudWatch, IAM security policies" },
    ],
  },
  {
    title: "Engineering Setup",
    tagline: "System configurations, IDEs, and developer toolchain.",
    items: [
      { name: "Cursor IDE & VS Code", detail: "Equipped with Vim keybindings, Python & Go linters, Docker/K8s plugins" },
      { name: "Postman & HTTPie", detail: "API contract testing, payload mocking, JWT header introspection" },
      { name: "Git & GitHub Actions", detail: "Branch protection, automated CI/CD test runners, Docker build pipelines" },
      { name: "Prometheus & Grafana", detail: "Metrics scraping, API latency dashboards, server health alerts" },
    ],
  },
  {
    title: "Terminal & Linux Environment",
    tagline: "Shell configuration, networking utilities, and system profiling.",
    items: [
      { name: "Linux / macOS Shell", detail: "Zsh with custom aliases, ripgrep, fzf, jq, and curl scripting" },
      { name: "Network & Security Tools", detail: "Wireshark, netstat, nmap, OWASP ZAP for vulnerability testing" },
      { name: "Fastfetch & Profilers", detail: "System inspection, memory flamegraphs, and cgroups monitoring" },
    ],
  },
];

export const personalItems = [
  {
    title: "Books & Technical Literature",
    tagline: "Foundational computer science and systems texts.",
    items: [
      { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", takeaway: "Distributed consensus, replication, partitioning, and stream processing." },
      { title: "System Design Interview (Vol 1 & 2)", author: "Alex Xu", takeaway: "Architecting rate limiters, key-value stores, distributed message queues, and metrics systems." },
      { title: "Computer Networking: A Top-Down Approach", author: "Kurose & Ross", takeaway: "TCP/IP handshake mechanics, congestion control, socket programming, and DNS infrastructure." },
      { title: "Operating Systems: Three Easy Pieces", author: "Remzi & Andrea Arpaci-Dusseau", takeaway: "Virtualization, concurrency, lock-free structures, and file systems." },
    ],
  },
  {
    title: "Inspirations & Hobbies",
    tagline: "Interests in competitive programming, music, and storytelling.",
    items: [
      { title: "LeetCode & Competitive DSA", type: "Knight (Top 1.2%)", note: "Solving complex graph algorithms, dynamic programming, and memory-optimized trees." },
      { title: "Solo Leveling", type: "Anime / Manhwa", note: "The relentless mindset of leveling up from zero through daily disciplined effort." },
      { title: "Distributed Systems Research", type: "Interest", note: "Reading whitepapers on Raft, Paxos, Kafka architecture, and CockroachDB distributed consensus." },
    ],
  },
];

// Blog posts are fetched 100% dynamically from Supabase PostgreSQL via /api/v1/blogs
export const blogs = [];
export default blogs;



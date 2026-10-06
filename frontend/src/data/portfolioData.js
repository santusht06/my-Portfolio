export const profileData = {
  name: "Santusht Kotai",
  title: "Software Engineer | Backend Engineering | Distributed Systems",
  email: "santushtkotai1221@gmail.com",
  website: "https://santusht.online",
  websiteDisplay: "santusht.online",
  location: "Indore, India",
  summary:
    "Living between terminal windows, lofi beats, and real-world wonder — crafting things that work silently so life can happen loudly.",
  quote: {
    text: "If the pain doesn't kill me, it will only make me stronger.",
    author: "Sung Jin-woo, Solo Leveling",
  },
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

export const blogs = [
  {
    id: "why-cache-returned-stale-data",
    type: "INCIDENT",
    title: "Incident #001: Why My Cache Kept Returning Stale Contest Data",
    subtitle: "Race conditions between mutations, Redis write-through invalidation, and SSE synchronization.",
    date: "March 24, 2026",
    categories: ["Backend", "Distributed Systems", "Incidents & ADRs"],
    readTime: "8 min read",
    content: "During a live coding contest, test case verdicts updated in PostgreSQL were not propagating to contestants. Investigating revealed a race condition where cache-aside reads repopulated Redis with pre-mutation data before the transaction committed, while SSE dispatchers broadcasted outdated snapshots.",
    sections: {
      tldr: "A classic cache-aside race condition: concurrent read queries during long DB write transactions repopulated Redis with stale rows, overwriting our cache invalidation signal.",
      problem: "Contestants submitted solutions and received an 'Accepted' verdict in the database, but reloading the contest leaderboard or problems dashboard intermittently displayed old 'Pending' or 'Wrong Answer' scores.",
      rootCause: "Under burst traffic, worker threads performed cache-aside reads right as a write transaction was committing. The read query found a cache miss, read the uncommitted/stale row from PostgreSQL snapshot isolation, and repopulated Redis milliseconds AFTER our write handler had sent the DEL command.",
      solution: "Switched from naive Cache-Aside invalidation to the Transactional Outbox pattern paired with Redis versioned hashes. Mutation events are recorded in an outbox table within the same ACID transaction, and an asynchronous de-duplication worker invalidates and publishes SSE notifications strictly after transaction commit confirmation.",
      takeaways: [
        "Never perform unversioned cache invalidation outside the database transaction boundary.",
        "Under high concurrency, cache-aside without lease locks or version tokens is prone to read-after-write anomalies.",
        "Pair SSE dispatchers directly with the database commit log or transactional outbox rather than raw endpoint handlers."
      ]
    }
  },
  {
    id: "sse-events-fighting-each-other",
    type: "INCIDENT",
    title: "I Built a Real-Time Backend With SSE — Then Events Started Fighting Each Other",
    subtitle: "Handling reconnects, duplicate event deliveries, event ordering, and frontend state synchronization.",
    date: "March 18, 2026",
    categories: ["Distributed Systems", "Backend", "Incidents & ADRs"],
    readTime: "9 min read",
    content: "Server-Sent Events (SSE) seemed like the ideal lightweight unidirectional stream for real-time judge updates. But under packet jitter and browser reconnection storms, duplicate broadcasts and out-of-order execution threw the client UI into erratic flickering loops.",
    sections: {
      tldr: "Browser auto-reconnection headers without sequence counters created out-of-order state mutations and ghost duplicate events on frontend consumers.",
      problem: "When contestants temporarily dropped connection for 200ms, the browser EventSource reconnected, receiving missed events out-of-order. The UI state machine reverted from 'JUDGING' back to 'RUNNING', causing confusing interface rollbacks.",
      rootCause: "SSE streams lacked monotonically increasing monotonic epoch IDs. Reconnected streams replayed buffered events from the Redis Pub/Sub stream without an idempotency key or client sequence tracking.",
      solution: "Engineered a stateful Event Broker using Redis Streams instead of Pub/Sub. Every SSE frame attaches a strict sequence ID (`Last-Event-ID`). The frontend implements an idempotent state reducer that drops any event with an older timestamp or lower sequence number.",
      takeaways: [
        "Redis Pub/Sub is fire-and-forget; Redis Streams with consumer groups provide the replayability essential for SSE resilience.",
        "Always make frontend state mutations idempotent and order-enforced via sequence numbers.",
        "Explicitly clean up open HTTP connections on frontend page navigation to prevent worker connection leaks."
      ]
    }
  },
  {
    id: "fastapi-production-patterns",
    type: "DEEP DIVE",
    title: "Architecting 25+ Production APIs in FastAPI: Latency & Security",
    subtitle: "Lessons learned building enterprise microservices serving 10,000+ daily requests.",
    date: "March 15, 2026",
    categories: ["Backend", "Security"],
    readTime: "7 min read",
    content: "A detailed breakdown of connection pooling with SQLAlchemy, async task delegation with Redis, granular RBAC decorators, and automated OWASP vulnerability remediation in high-load production environments.",
    sections: {
      tldr: "Practical architectural patterns from scaling enterprise FastAPI microservices serving over 10,000 daily requests across 5 business domains.",
      problem: "Default FastAPI configurations often run into synchronous blocking inside async routes, connection pool exhaustion during database latency spikes, and repetitive authorization boilerplate.",
      rootCause: "Accidental use of blocking libraries inside `async def` endpoints starved the asyncio event loop, causing p99 response latencies to spike from 15ms to over 800ms.",
      solution: "Audited the codebase with `trio-async-check`, separated CPU-bound work into background Celery/Redis worker queues, configured SQLAlchemy async engine connection pooling with strict queue timeouts, and implemented custom dependency-injection decorators for granular RBAC.",
      takeaways: [
        "Never run blocking I/O or CPU-heavy parsing in `async def` without `run_in_threadpool`.",
        "Tune connection pool size and max overflow based on PostgreSQL backend worker limits.",
        "Centralize OAuth 2.0 JWT claim extraction and scope verification in reusable FastAPI dependencies."
      ]
    }
  },
  {
    id: "why-i-didnt-use-kafka",
    type: "ARCHITECTURE",
    title: "ADR-001: Why Kafka Was the Wrong Choice for My Architecture",
    subtitle: "Operational complexity vs latency requirements: Why I rejected Kafka in favor of a native Redis engine.",
    date: "March 04, 2026",
    categories: ["Distributed Systems", "Backend", "Incidents & ADRs"],
    readTime: "6 min read",
    content: "When building an asynchronous queue for code evaluation jobs, Apache Kafka was the default enterprise recommendation. Here is why choosing Kafka would have been an over-engineered mistake for our latency profile and infrastructure budget.",
    sections: {
      tldr: "Evaluated Kafka vs RabbitMQ vs Redis Streams for an unprivileged code execution platform. Redis delivered sub-millisecond dispatch with 90% less infrastructure overhead.",
      problem: "We needed a queue capable of distributing 200 concurrent code execution tasks with immediate worker acknowledgement and dead-letter failover on worker crashes.",
      rootCause: "Kafka is optimized for append-only streaming and multi-subscriber event logs with high throughput, not point-to-point worker task leasing with granular job acknowledgements and visibility timeouts.",
      solution: "Implemented ChaosQueue using Redis Streams and Lua scripts. Redis handles sub-millisecond job claiming via consumer groups, while heartbeats maintain worker leasing with automatic job re-assignment if a worker node dies.",
      takeaways: [
        "Match the storage model to the access pattern: Task Queues require work distribution and acknowledgement, whereas Event Logs require ordered replay.",
        "Operational overhead matters: Managing ZooKeeper/KRaft and JVM memory pools for a 2-server deployment is engineering anti-pattern.",
        "Redis Lua scripts provide atomic multi-key updates that eliminate distributed race conditions."
      ]
    }
  },
  {
    id: "self-hosted-mail-infrastructure",
    type: "DEEP DIVE",
    title: "Building a Self-Hosted Mail Server from Scratch (SMTP, IMAP & POP3)",
    subtitle: "How Sharexpress handles mail queuing, RFC protocol compliance, and security.",
    date: "February 28, 2026",
    categories: ["Infrastructure", "Distributed Systems"],
    readTime: "10 min read",
    content: "Deep dive into raw socket parsing for SMTP/IMAP, implementing TLS handshakes, asynchronous background queuing with Redis, and storing attachments across distributed S3/MinIO clusters.",
    sections: {
      tldr: "Architecting a compliant, self-hosted mail server supporting SMTP, IMAP4, and POP3 from RFC specifications with distributed attachment storage.",
      problem: "Third-party transactional email providers impose heavy rate limits and opaque pricing for developer platforms. We wanted full self-hosted email infrastructure for automated verification and internal comms.",
      rootCause: "Email protocols are notoriously finicky: RFC 5321 (SMTP), RFC 3501 (IMAP), and RFC 1939 (POP3) require strict stateful connection handshakes, TLS negotiation, and delivery retry backoffs.",
      solution: "Built a modular server daemon in Python/Go that handles TLS handshakes, parses raw MIME messages, dispatches incoming mail through Redis queues to an asynchronous virus/spam filter, and persists mailboxes in CockroachDB with attachments in MinIO.",
      takeaways: [
        "DNS reputation (SPF, DKIM, DMARC, Reverse DNS PTR) is 70% of the battle in modern mail deliverability.",
        "Decouple socket ingestion from message persistence using an intermediate queue to withstand email burst waves.",
        "Store binary attachments as immutable object storage blobs rather than database byte arrays."
      ]
    }
  },
  {
    id: "building-chaosqueue-redis",
    type: "BUILD LOG",
    title: "Building ChaosQueue: A Native Async Redis Queue Engine from Scratch",
    subtitle: "Worker claiming, visibility timeouts, dead-letter queues, distributed locking, and crash recovery.",
    date: "February 16, 2026",
    categories: ["Distributed Systems", "Backend"],
    readTime: "11 min read",
    content: "Why we bypassed heavy Node-based abstractions like BullMQ in favor of a bespoke Python/Redis async worker system with deterministic fault injection and lease renewals.",
    sections: {
      tldr: "Designed and implemented a resilient distributed job queue on Redis Streams with automatic orphan-task recovery and zero node dependencies.",
      problem: "Existing lightweight Python queues lacked robust visibility timeouts, worker crash recovery, and multi-tenant rate limiting out of the box, while Celery introduced massive configuration bloat.",
      rootCause: "When worker processes die abruptly mid-job (e.g., OOM killed by a Docker sandbox), standard Redis lists lose the item or leave it in an ambiguous state forever.",
      solution: "Created ChaosQueue with two core Redis structures: a primary Stream for incoming tasks and a Sorted Set (ZSET) for inflight leasing. If a worker fails to ping its heartbeat within the visibility timeout, a supervisor worker claims the pending task.",
      takeaways: [
        "Distributed lock acquisition must always include a unique owner identifier and automatic TTL expiration to prevent permanent deadlocks.",
        "Sorted sets with timestamp scores provide the cleanest abstraction for visibility timeouts and delayed retries.",
        "Always cap retry attempts and route poisoned jobs to a Dead-Letter Queue (DLQ) with alert hooks."
      ]
    }
  },
  {
    id: "docker-sandbox-code-execution",
    type: "DEEP DIVE",
    title: "Designing Non-Root Docker Sandboxes for Untrusted Code Execution",
    subtitle: "Security guardrails, AST analysis, mutation testing, and cgroup isolation in Interleet.",
    date: "January 20, 2026",
    categories: ["Security", "Infrastructure"],
    readTime: "9 min read",
    content: "How we prevent fork bombs, malicious syscalls, and network exfiltration when evaluating user-submitted Python and C++ code using ephemeral unprivileged Docker containers and AST validation.",
    sections: {
      tldr: "Multi-layered defence-in-depth architecture for executing untrusted user submissions safely at sub-200ms latency.",
      problem: "Executing untrusted code on a public platform opens severe attack vectors: host memory exhaustion (fork bombs), unauthorized network exfiltration, filesystem traversal, and crypto-mining.",
      rootCause: "Standard Docker containers run as root by default and retain Linux capabilities (`CAP_NET_RAW`, `CAP_SYS_ADMIN`) that allow escape exploits if vulnerabilities exist in the Linux kernel.",
      solution: "Engineered a strict 4-layer sandbox: 1) Pre-execution AST static analysis to reject dangerous imports (`os.system`, `subprocess`, `socket`); 2) Non-root execution with `--cap-drop=ALL`; 3) Read-only root filesystem with ephemeral memory-backed `tmpfs`; 4) Strict cgroup limits on CPU quotas (1 core), RAM (128MB), process count (`pids-limit=64`), and disabled networking (`--net=none`).",
      takeaways: [
        "Never trust a single layer of security: Combine static AST analysis with kernel-level cgroups and seccomp profiles.",
        "Always disable network connectivity (`--net=none`) for untrusted execution sandboxes.",
        "Enforce strict process count limits (`pids.max`) to defeat fork bombs instantly without freezing the host."
      ]
    }
  },
  {
    id: "laptop-distributed-compute-worker",
    type: "BUILD LOG",
    title: "Turning My Laptop Into a Distributed Compute Worker Behind NAT",
    subtitle: "Connecting private remote workers using reverse WebSockets, heartbeats, and Docker execution pipelines.",
    date: "January 10, 2026",
    categories: ["Infrastructure", "Distributed Systems"],
    readTime: "8 min read",
    content: "How we solved cloud hosting resource constraints by converting local developer hardware into distributed judge workers connecting back to our cloud API without port forwarding or static IPs.",
    sections: {
      tldr: "Connecting compute nodes sitting behind home residential NAT to a cloud control plane via outbound TLS WebSockets.",
      problem: "Running intensive multi-language compiler sandboxes on cloud VPS instances incurred high compute costs during testing and burst simulations.",
      rootCause: "Home developer machines are behind Carrier-Grade NAT (CGNAT) with dynamic IPs, preventing direct inbound HTTPS requests from the cloud server.",
      solution: "Reversed the connection topology: Worker nodes initiate an outbound WSS connection to the central Gateway with JWT mutual authentication. The gateway streams job payloads down the active WebSocket, and the laptop executes the job in Docker and streams stdout/stderr back in real time.",
      takeaways: [
        "Outbound persistent connections (WebSockets / gRPC) completely eliminate NAT traversal and firewall port forwarding friction.",
        "Implement heartbeat pings every 5 seconds to detect dropped connections and trigger automatic backoff reconnects.",
        "Treat worker nodes as untrusted: The gateway validates all verdict payloads before writing to the primary database."
      ]
    }
  },
  {
    id: "contest-server-memory-outage",
    type: "INCIDENT",
    title: "Incident #002: My 4GB Server Couldn't Handle Concurrent Contest Traffic",
    subtitle: "Investigating Docker container memory pressure, CPU throttling, and worker queue starvation under load.",
    date: "December 28, 2025",
    categories: ["Infrastructure", "Incidents & ADRs"],
    readTime: "7 min read",
    content: "When 80 concurrent users submitted code simultaneously during a platform beta test, the Linux kernel Out-Of-Memory (OOM) killer went rogue, killing the main FastAPI process and Redis instances.",
    sections: {
      tldr: "Spikes in concurrent Docker sandboxes exhausted host RAM, causing kernel OOM to kill core database and API processes.",
      problem: "During the first 5 minutes of a coding contest, submissions piled up and the server went completely unreachable. SSH connections timed out and all HTTP requests failed.",
      rootCause: "Docker sandbox containers were created concurrently without a global concurrency limiter. 40 containers allocating 100MB each instantly exhausted the 4GB host memory, triggering the Linux OOM killer to terminate Redis and Uvicorn.",
      solution: "Configured strict system-level protections: 1) Systemd service limits ensuring PostgreSQL, Redis, and FastAPI have high `oom_score_adj` protection; 2) Bounded worker semaphore limiting concurrent Docker sandboxes to `CPU_COUNT - 1`; 3) Added a fast Redis queue buffer so excess submissions queue cleanly instead of spinning up new containers.",
      takeaways: [
        "Always protect mission-critical daemons with `oom_score_adj=-1000` so kernel memory reclaimers target disposable worker processes first.",
        "Enforce a hard ceiling on concurrent sandboxes based on host RAM: `Max_Containers = (Total_RAM - System_RAM) / Container_RAM`.",
        "Buffer bursts in queues rather than creating processes on demand."
      ]
    }
  },
  {
    id: "production-rag-document-pipeline",
    type: "DEEP DIVE",
    title: "Why RAG Is More Than 'Put PDFs Into a Vector Database'",
    subtitle: "Designing OCR extraction, hybrid lexical+semantic search, reranking, and citation verification.",
    date: "December 12, 2025",
    categories: ["AI Engineering", "Backend"],
    readTime: "9 min read",
    content: "A breakdown of building production-grade document intelligence pipelines that overcome hallucination, chunk fragmentation, and context loss in technical domain PDFs.",
    sections: {
      tldr: "Naive vector retrieval produces inaccurate answers on technical documents. Here is how we engineered a 4-stage hybrid search and reranking pipeline.",
      problem: "Standard LangChain RAG tutorials with naive sentence splitting produced answers with hallucinated function signatures and broken tabular data when querying technical documentation.",
      rootCause: "Fixed-size character chunking splits code blocks and tables across boundaries. Pure cosine similarity on vector embeddings struggles with exact keyword queries (like error codes or function names).",
      solution: "Engineered an end-to-end pipeline: 1) Layout-aware parsing that preserves tables and code blocks intact; 2) Hybrid search combining BM25 lexical keyword matching with dense vector embeddings via Reciprocal Rank Fusion (RRF); 3) Cross-encoder reranking stage that filters top 15 candidates down to top 4 high-precision contexts; 4) Mandatory citation verification.",
      takeaways: [
        "Layout-aware document chunking yields significantly higher retrieval accuracy than tuning vector embedding models.",
        "Hybrid search (BM25 + Dense Vectors) is essential for technical domains where exact identifier matches matter.",
        "Cross-encoder reranking eliminates context noise and reduces LLM hallucination rates by over 60%."
      ]
    }
  },
  {
    id: "redis-distributed-caching-patterns",
    type: "DEEP DIVE",
    title: "PostgreSQL Query Optimization & Redis Cache Stampede Prevention",
    subtitle: "Techniques for index tuning, composite B-Trees, and mutex locks under heavy load.",
    date: "November 18, 2025",
    categories: ["Backend", "Distributed Systems"],
    readTime: "8 min read",
    content: "Explaining B-Tree execution plans, vacuuming mechanics, preventing dog-piling with probabilistic early expiration (XFetch), and connection pooling with PgBouncer.",
    sections: {
      tldr: "Practical patterns for preventing database lockups when hot cache keys expire under heavy concurrent load.",
      problem: "When a popular leaderboard cache key expired during peak activity, 500 simultaneous web requests queried the un-indexed complex SQL join simultaneously, overloading PostgreSQL CPU to 100%.",
      rootCause: "Classic cache stampede (dog-piling): A single expired key caused every concurrent request to bypass the cache and run the expensive database computation in parallel.",
      solution: "Implemented distributed mutex locking in Redis: The first request that observes a cache miss acquires an exclusive lock with a 3-second TTL to recalculate and write back the cache, while other requests either wait or read the previous stale cache snapshot gracefully.",
      takeaways: [
        "Never allow concurrent requests to compute the same expensive database query on cache miss.",
        "Use probabilistic early expiration algorithms (XFetch) to refresh hot keys in the background before they expire.",
        "Inspect PostgreSQL `EXPLAIN (ANALYZE, BUFFERS)` to verify index usage and eliminate sequential table scans."
      ]
    }
  },
  {
    id: "gsoc-supabase-contributions",
    type: "BUILD LOG",
    title: "Contributing to Supabase for Google Summer of Code (GSoC 2026)",
    subtitle: "Navigating massive open-source distributed codebases, Postgres extensions, and shipping upstream PRs.",
    date: "October 18, 2025",
    categories: ["Distributed Systems", "Backend"],
    readTime: "8 min read",
    content: "My roadmap for landing upstream contributions in Supabase, understanding Postgres extensions, automated testing harnesses, and working with international maintainers.",
    sections: {
      tldr: "Lessons learned navigating massive distributed open-source repositories and collaborating with senior maintainers on production infrastructure.",
      problem: "Getting started in large-scale open-source distributed systems like Supabase can be daunting due to complex multi-repo architectures (PostgREST, GoTrue, Realtime, Storage).",
      rootCause: "New contributors often try to tackle large architectural refactors without first understanding the underlying Postgres extension ecosystem and CI testing matrices.",
      solution: "Started with reproducible test cases for edge-case issues, profiled local development environments using Docker Compose, and collaborated directly with maintainers on targeted infrastructure tooling enhancements.",
      takeaways: [
        "Write comprehensive integration tests alongside bug fixes to build trust with open-source maintainers.",
        "Understand the underlying database primitives (Postgres triggers, write-ahead logs) before debugging wrapper services.",
        "Break large PRs into atomic, reviewable commits with clear architectural reasoning."
      ]
    }
  },
  {
    id: "leetcode-knight-systematic-dsa",
    type: "DEEP DIVE",
    title: "How I Reached LeetCode Knight (Top 1.2% Globally)",
    subtitle: "500+ problems solved: A mental model for Graphs, DP, and System Design.",
    date: "September 25, 2025",
    categories: ["Backend"],
    readTime: "6 min read",
    content: "Ditching random problem grinding for pattern-based taxonomy: State machines in Dynamic Programming, topological sort across microservice dependency DAGs, and monotonic queues.",
    sections: {
      tldr: "Structured roadmap from beginner to LeetCode Knight by focusing on core algorithmic patterns and invariants rather than memorizing individual solutions.",
      problem: "Grinding hundreds of random problems led to plateauing around rating 1600 with high contest anxiety and slow debugging speed.",
      rootCause: "Memorizing code solutions rather than recognizing state machine transitions, graph properties, and invariant invariants.",
      solution: "Grouped problems into 12 core algorithmic templates: Monotonic stacks/queues, interval scheduling, binary search on answers, dynamic programming state spaces, and disjoint-set unions (DSU).",
      takeaways: [
        "In dynamic programming, identify the state representation and transition recurrence relation before writing code.",
        "Algorithmic thinking directly translates to system design: Dependency resolution is topological sorting; task scheduling is priority queue management.",
        "Consistency and contest post-mortems matter far more than total problem counts."
      ]
    }
  }
];


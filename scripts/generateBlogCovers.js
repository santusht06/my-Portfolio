import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, '../frontend/public/blog-covers');
fs.mkdirSync(outputDir, { recursive: true });

const blogs = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../backend/data/blogs.json'), 'utf-8')
);

// Map of custom SVG diagrams per blog topic
const DIAGRAMS = {
  'why-i-didnt-use-kafka': `
    <g transform="translate(360, 310)">
      <!-- Kafka Cluster Overkill box -->
      <g transform="translate(-180, 0)">
        <rect x="-110" y="-45" width="220" height="90" rx="12" fill="#fff" stroke="#f43f5e" stroke-width="2" stroke-dasharray="4 4" filter="drop-shadow(0 4px 12px rgba(244,63,94,0.12))"/>
        <text x="0" y="-15" text-anchor="middle" font-family="Geist, sans-serif" font-size="13" font-weight="700" fill="#e11d48">Apache Kafka</text>
        <text x="0" y="8" text-anchor="middle" font-family="Geist Mono, monospace" font-size="11" fill="#64748b">ZooKeeper · JVM · Disk Log</text>
        <text x="0" y="26" text-anchor="middle" font-family="Geist, sans-serif" font-size="11" font-weight="600" fill="#f43f5e">Overkill for Task Queue (80ms)</text>
      </g>
      
      <!-- VS Badge -->
      <circle cx="0" cy="0" r="22" fill="#0f172a" stroke="#fff" stroke-width="3"/>
      <text x="0" y="5" text-anchor="middle" font-family="Geist, sans-serif" font-size="12" font-weight="800" fill="#fff">VS</text>

      <!-- Redis ChaosQueue Selected box -->
      <g transform="translate(180, 0)">
        <rect x="-110" y="-45" width="220" height="90" rx="12" fill="#fff" stroke="#10b981" stroke-width="2.5" filter="drop-shadow(0 6px 16px rgba(16,185,129,0.15))"/>
        <text x="0" y="-15" text-anchor="middle" font-family="Geist, sans-serif" font-size="13" font-weight="700" fill="#047857">ChaosQueue (Redis)</text>
        <text x="0" y="8" text-anchor="middle" font-family="Geist Mono, monospace" font-size="11" fill="#64748b">Streams + Consumer Groups</text>
        <text x="0" y="26" text-anchor="middle" font-family="Geist, sans-serif" font-size="11" font-weight="600" fill="#059669">0.8ms Dispatch · 90% Less RAM</text>
      </g>

      <!-- Connecting arrows -->
      <path d="M-60 0 L-25 0" stroke="#cbd5e1" stroke-width="2" marker-end="url(#arrow)"/>
      <path d="M25 0 L60 0" stroke="#10b981" stroke-width="2" marker-end="url(#arrowGreen)"/>
    </g>
  `,

  'self-hosted-mail-infrastructure': `
    <g transform="translate(600, 310)">
      <circle cx="-240" cy="0" r="38" fill="#fff" stroke="#3b82f6" stroke-width="2" filter="drop-shadow(0 4px 12px rgba(59,130,246,0.15))"/>
      <text x="-240" y="-4" text-anchor="middle" font-family="Geist, sans-serif" font-size="13" font-weight="700" fill="#1d4ed8">SMTP</text>
      <text x="-240" y="14" text-anchor="middle" font-family="Geist Mono, monospace" font-size="10" fill="#64748b">:25 / :587</text>

      <path d="M-195 0 L-115 0" stroke="#3b82f6" stroke-width="2" stroke-dasharray="4 4"/>

      <!-- TLS Handshake Engine -->
      <rect x="-105" y="-45" width="210" height="90" rx="14" fill="#0f172a" filter="drop-shadow(0 8px 24px rgba(15,23,42,0.25))"/>
      <text x="0" y="-14" text-anchor="middle" font-family="Geist, sans-serif" font-size="13" font-weight="700" fill="#38bdf8">TLS Socket Engine</text>
      <text x="0" y="7" text-anchor="middle" font-family="Geist Mono, monospace" font-size="11" fill="#94a3b8">Raw RFC MIME Parser</text>
      <text x="0" y="25" text-anchor="middle" font-family="Geist Mono, monospace" font-size="10" fill="#34d399">SPF · DKIM · DMARC PASS</text>

      <path d="M115 0 L195 0" stroke="#10b981" stroke-width="2" stroke-dasharray="4 4"/>

      <circle cx="240" cy="0" r="38" fill="#fff" stroke="#10b981" stroke-width="2" filter="drop-shadow(0 4px 12px rgba(16,185,129,0.15))"/>
      <text x="240" y="-4" text-anchor="middle" font-family="Geist, sans-serif" font-size="13" font-weight="700" fill="#047857">IMAP4</text>
      <text x="240" y="14" text-anchor="middle" font-family="Geist Mono, monospace" font-size="10" fill="#64748b">MinIO / S3</text>
    </g>
  `,

  'docker-sandbox-code-execution': `
    <g transform="translate(600, 310)">
      <!-- Outer Sandbox Barrier -->
      <rect x="-260" y="-55" width="520" height="110" rx="16" fill="#f8fafc" stroke="#6366f1" stroke-width="2" stroke-dasharray="6 4" filter="drop-shadow(0 4px 16px rgba(99,102,241,0.12))"/>
      
      <!-- Safe AST Parser -->
      <rect x="-240" y="-35" width="135" height="70" rx="10" fill="#fff" stroke="#cbd5e1" stroke-width="1.5"/>
      <text x="-172" y="-5" text-anchor="middle" font-family="Geist, sans-serif" font-size="12" font-weight="700" fill="#0f172a">AST Parser</text>
      <text x="-172" y="15" text-anchor="middle" font-family="Geist Mono, monospace" font-size="10" fill="#64748b">Static Guardrail</text>

      <path d="M-95 0 L-65 0" stroke="#6366f1" stroke-width="2" marker-end="url(#arrowIndigo)"/>

      <!-- Non-Root Docker Core -->
      <rect x="-55" y="-38" width="165" height="76" rx="10" fill="#0f172a"/>
      <text x="27" y="-10" text-anchor="middle" font-family="Geist, sans-serif" font-size="13" font-weight="700" fill="#a5b4fc">Non-Root Container</text>
      <text x="27" y="10" text-anchor="middle" font-family="Geist Mono, monospace" font-size="10" fill="#38bdf8">cgroups: 256MB / 1.0 CPU</text>
      <text x="27" y="24" text-anchor="middle" font-family="Geist Mono, monospace" font-size="9" fill="#94a3b8">seccomp · no-new-privs</text>

      <path d="M120 0 L150 0" stroke="#10b981" stroke-width="2" marker-end="url(#arrowGreen)"/>

      <!-- Output Result -->
      <rect x="160" y="-35" width="90" height="70" rx="10" fill="#fff" stroke="#10b981" stroke-width="2"/>
      <text x="205" y="-5" text-anchor="middle" font-family="Geist, sans-serif" font-size="12" font-weight="700" fill="#047857">Clean Output</text>
      <text x="205" y="15" text-anchor="middle" font-family="Geist Mono, monospace" font-size="10" fill="#10b981">Zero Escape</text>
    </g>
  `,

  'building-chaosqueue-redis': `
    <g transform="translate(600, 310)">
      <!-- Redis Stream -->
      <g transform="translate(-160, 0)">
        <rect x="-90" y="-40" width="180" height="80" rx="12" fill="#fff" stroke="#ef4444" stroke-width="2" filter="drop-shadow(0 4px 12px rgba(239,68,68,0.15))"/>
        <text x="0" y="-12" text-anchor="middle" font-family="Geist, sans-serif" font-size="13" font-weight="700" fill="#dc2626">Redis Streams</text>
        <text x="0" y="8" text-anchor="middle" font-family="Geist Mono, monospace" font-size="10" fill="#64748b">XADD / XREADGROUP</text>
        <text x="0" y="24" text-anchor="middle" font-family="Geist Mono, monospace" font-size="10" fill="#ef4444">Atomic Lua Scripts</text>
      </g>

      <!-- Worker Heartbeat Loop -->
      <circle cx="0" cy="0" r="32" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
      <text x="0" y="-4" text-anchor="middle" font-family="Geist Mono, monospace" font-size="10" font-weight="700" fill="#38bdf8">XCLAIM</text>
      <text x="0" y="12" text-anchor="middle" font-family="Geist Mono, monospace" font-size="9" fill="#94a3b8">Lease Lock</text>

      <!-- Dead Letter Failover -->
      <g transform="translate(160, 0)">
        <rect x="-90" y="-40" width="180" height="80" rx="12" fill="#fff" stroke="#10b981" stroke-width="2" filter="drop-shadow(0 4px 12px rgba(16,185,129,0.15))"/>
        <text x="0" y="-12" text-anchor="middle" font-family="Geist, sans-serif" font-size="13" font-weight="700" fill="#047857">Dead-Letter Queue</text>
        <text x="0" y="8" text-anchor="middle" font-family="Geist Mono, monospace" font-size="10" fill="#64748b">Crash Auto-Recovery</text>
        <text x="0" y="24" text-anchor="middle" font-family="Geist Mono, monospace" font-size="10" fill="#059669">0% Task Loss</text>
      </g>

      <path d="M-60 0 L-35 0" stroke="#cbd5e1" stroke-width="2" marker-end="url(#arrow)"/>
      <path d="M35 0 L60 0" stroke="#cbd5e1" stroke-width="2" marker-end="url(#arrow)"/>
    </g>
  `,

  'why-cache-returned-stale-data': `
    <g transform="translate(600, 310)">
      <rect x="-240" y="-40" width="130" height="80" rx="10" fill="#fff" stroke="#6366f1" stroke-width="2"/>
      <text x="-175" y="-10" text-anchor="middle" font-family="Geist, sans-serif" font-size="12" font-weight="700" fill="#4338ca">Postgres Write</text>
      <text x="-175" y="10" text-anchor="middle" font-family="Geist Mono, monospace" font-size="10" fill="#64748b">BEGIN ... COMMIT</text>

      <!-- Race Gap Indicator -->
      <rect x="-80" y="-40" width="160" height="80" rx="10" fill="#fff1f2" stroke="#f43f5e" stroke-width="2"/>
      <text x="0" y="-12" text-anchor="middle" font-family="Geist, sans-serif" font-size="12" font-weight="800" fill="#e11d48">Cache-Aside Race</text>
      <text x="0" y="6" text-anchor="middle" font-family="Geist Mono, monospace" font-size="10" fill="#be123c">Read hit before commit</text>
      <text x="0" y="22" text-anchor="middle" font-family="Geist, sans-serif" font-size="10" font-weight="600" fill="#e11d48">Stale Snapshot Injected!</text>

      <rect x="110" y="-40" width="130" height="80" rx="10" fill="#fff" stroke="#10b981" stroke-width="2"/>
      <text x="175" y="-10" text-anchor="middle" font-family="Geist, sans-serif" font-size="12" font-weight="700" fill="#047857">Versioned Hash</text>
      <text x="175" y="10" text-anchor="middle" font-family="Geist Mono, monospace" font-size="10" fill="#059669">Outbox Pattern</text>
    </g>
  `,

  'sse-events-fighting-each-other': `
    <g transform="translate(600, 310)">
      <circle cx="-160" cy="0" r="32" fill="#fff" stroke="#ef4444" stroke-width="2"/>
      <text x="-160" y="-4" text-anchor="middle" font-family="Geist, sans-serif" font-size="11" font-weight="700" fill="#dc2626">Event Drop</text>
      <text x="-160" y="12" text-anchor="middle" font-family="Geist Mono, monospace" font-size="9" fill="#64748b">Packet Jitter</text>

      <!-- Monotonic Sequence Broker -->
      <rect x="-90" y="-40" width="180" height="80" rx="12" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
      <text x="0" y="-12" text-anchor="middle" font-family="Geist, sans-serif" font-size="13" font-weight="700" fill="#38bdf8">Epoch Sequence Gate</text>
      <text x="0" y="8" text-anchor="middle" font-family="Geist Mono, monospace" font-size="10" fill="#94a3b8">Last-Event-ID: 104829</text>
      <text x="0" y="24" text-anchor="middle" font-family="Geist Mono, monospace" font-size="9" fill="#34d399">Monotonic Reducer</text>

      <circle cx="160" cy="0" r="32" fill="#fff" stroke="#10b981" stroke-width="2"/>
      <text x="160" y="-4" text-anchor="middle" font-family="Geist, sans-serif" font-size="11" font-weight="700" fill="#047857">Idempotent</text>
      <text x="160" y="12" text-anchor="middle" font-family="Geist Mono, monospace" font-size="9" fill="#10b981">State Sync</text>
    </g>
  `,

  'fastapi-production-patterns': `
    <g transform="translate(600, 310)">
      <rect x="-240" y="-35" width="130" height="70" rx="10" fill="#fff" stroke="#0ea5e9" stroke-width="2"/>
      <text x="-175" y="-5" text-anchor="middle" font-family="Geist, sans-serif" font-size="12" font-weight="700" fill="#0284c7">FastAPI Async</text>
      <text x="-175" y="15" text-anchor="middle" font-family="Geist Mono, monospace" font-size="10" fill="#64748b">asyncio uvloop</text>

      <rect x="-70" y="-42" width="140" height="84" rx="12" fill="#0f172a"/>
      <text x="0" y="-14" text-anchor="middle" font-family="Geist, sans-serif" font-size="12" font-weight="700" fill="#38bdf8">SQLAlchemy Pool</text>
      <text x="0" y="6" text-anchor="middle" font-family="Geist Mono, monospace" font-size="10" fill="#94a3b8">pool_size=20</text>
      <text x="0" y="22" text-anchor="middle" font-family="Geist Mono, monospace" font-size="9" fill="#34d399">10,000+ Req/Day</text>

      <rect x="110" y="-35" width="130" height="70" rx="10" fill="#fff" stroke="#10b981" stroke-width="2"/>
      <text x="175" y="-5" text-anchor="middle" font-family="Geist, sans-serif" font-size="12" font-weight="700" fill="#047857">OWASP Secure</text>
      <text x="175" y="15" text-anchor="middle" font-family="Geist Mono, monospace" font-size="10" fill="#059669">RBAC &amp; Rate Limit</text>
    </g>
  `,

  'contest-server-memory-outage': `
    <g transform="translate(600, 310)">
      <!-- Memory Spike Graph -->
      <rect x="-220" y="-45" width="440" height="90" rx="12" fill="#fff" stroke="#e2e8f0" stroke-width="2"/>
      <path d="M-190 25 L-120 20 L-50 15 L0 -25 L40 -35 L120 18 L190 22" fill="none" stroke="#f43f5e" stroke-width="3"/>
      <circle cx="40" cy="-35" r="5" fill="#f43f5e"/>
      <text x="40" y="-43" text-anchor="middle" font-family="Geist Mono, monospace" font-size="10" font-weight="700" fill="#e11d48">99.8% OOM SPIKE</text>
      <text x="-120" y="-15" font-family="Geist, sans-serif" font-size="11" font-weight="600" fill="#64748b">4GB RAM Node</text>
      <text x="120" y="-15" font-family="Geist, sans-serif" font-size="11" font-weight="600" fill="#059669">Fixed: Stream Buffering</text>
    </g>
  `,

  'production-rag-document-pipeline': `
    <g transform="translate(600, 310)">
      <rect x="-240" y="-35" width="120" height="70" rx="10" fill="#fff" stroke="#8b5cf6" stroke-width="2"/>
      <text x="-180" y="-5" text-anchor="middle" font-family="Geist, sans-serif" font-size="12" font-weight="700" fill="#7c3aed">Semantic Chunk</text>
      <text x="-180" y="15" text-anchor="middle" font-family="Geist Mono, monospace" font-size="10" fill="#64748b">512 Tokens</text>

      <rect x="-75" y="-40" width="150" height="80" rx="12" fill="#0f172a"/>
      <text x="0" y="-12" text-anchor="middle" font-family="Geist, sans-serif" font-size="12" font-weight="700" fill="#a78bfa">Vector Space Index</text>
      <text x="0" y="8" text-anchor="middle" font-family="Geist Mono, monospace" font-size="10" fill="#38bdf8">pgvector HNSW</text>
      <text x="0" y="24" text-anchor="middle" font-family="Geist Mono, monospace" font-size="9" fill="#34d399">Multi-Tenant Isolation</text>

      <rect x="120" y="-35" width="120" height="70" rx="10" fill="#fff" stroke="#10b981" stroke-width="2"/>
      <text x="180" y="-5" text-anchor="middle" font-family="Geist, sans-serif" font-size="12" font-weight="700" fill="#047857">Re-ranked RAG</text>
      <text x="180" y="15" text-anchor="middle" font-family="Geist Mono, monospace" font-size="10" fill="#059669">Precision Context</text>
    </g>
  `,

  'leetcode-knight-systematic-dsa': `
    <g transform="translate(600, 310)">
      <circle cx="-160" cy="0" r="36" fill="#0f172a" stroke="#f59e0b" stroke-width="2.5"/>
      <text x="-160" y="5" text-anchor="middle" font-family="Geist, sans-serif" font-size="20">♞</text>

      <rect x="-80" y="-40" width="160" height="80" rx="12" fill="#fff" stroke="#f59e0b" stroke-width="2"/>
      <text x="0" y="-12" text-anchor="middle" font-family="Geist, sans-serif" font-size="13" font-weight="700" fill="#b45309">LeetCode Knight</text>
      <text x="0" y="8" text-anchor="middle" font-family="Geist Mono, monospace" font-size="11" fill="#0f172a">Top 1.2% Globally</text>
      <text x="0" y="24" text-anchor="middle" font-family="Geist Mono, monospace" font-size="10" fill="#64748b">500+ Hard / Medium</text>

      <circle cx="160" cy="0" r="36" fill="#fff" stroke="#10b981" stroke-width="2"/>
      <text x="160" y="-4" text-anchor="middle" font-family="Geist, sans-serif" font-size="11" font-weight="700" fill="#047857">DP + Graphs</text>
      <text x="160" y="14" text-anchor="middle" font-family="Geist Mono, monospace" font-size="9" fill="#64748b">Framework</text>
    </g>
  `,

  'laptop-distributed-compute-worker': `
    <g transform="translate(600, 310)">
      <rect x="-220" y="-40" width="140" height="80" rx="12" fill="#fff" stroke="#64748b" stroke-width="2"/>
      <text x="-150" y="-12" text-anchor="middle" font-family="Geist, sans-serif" font-size="12" font-weight="700" fill="#0f172a">Broken Laptop</text>
      <text x="-150" y="8" text-anchor="middle" font-family="Geist Mono, monospace" font-size="10" fill="#64748b">Headless Ubuntu</text>
      <text x="-150" y="24" text-anchor="middle" font-family="Geist Mono, monospace" font-size="9" fill="#0284c7">Behind NAT</text>

      <rect x="-40" y="-35" width="80" height="70" rx="10" fill="#0f172a"/>
      <text x="0" y="-5" text-anchor="middle" font-family="Geist Mono, monospace" font-size="11" font-weight="700" fill="#38bdf8">SSH</text>
      <text x="0" y="14" text-anchor="middle" font-family="Geist Mono, monospace" font-size="10" fill="#34d399">Tunnel</text>

      <rect x="80" y="-40" width="140" height="80" rx="12" fill="#fff" stroke="#10b981" stroke-width="2"/>
      <text x="150" y="-12" text-anchor="middle" font-family="Geist, sans-serif" font-size="12" font-weight="700" fill="#047857">Edge Worker Node</text>
      <text x="150" y="8" text-anchor="middle" font-family="Geist Mono, monospace" font-size="10" fill="#059669">24/7 Compute</text>
      <text x="150" y="24" text-anchor="middle" font-family="Geist Mono, monospace" font-size="9" fill="#64748b">Async Job Runner</text>
    </g>
  `,

  'gsoc-supabase-contributions': `
    <g transform="translate(600, 310)">
      <rect x="-240" y="-40" width="140" height="80" rx="12" fill="#fff" stroke="#3ecf8e" stroke-width="2"/>
      <text x="-170" y="-12" text-anchor="middle" font-family="Geist, sans-serif" font-size="13" font-weight="700" fill="#047857">Supabase</text>
      <text x="-170" y="8" text-anchor="middle" font-family="Geist Mono, monospace" font-size="10" fill="#10b981">GSoC 2026</text>
      <text x="-170" y="24" text-anchor="middle" font-family="Geist, sans-serif" font-size="10" fill="#64748b">Selected Contributor</text>

      <rect x="-50" y="-35" width="100" height="70" rx="10" fill="#0f172a"/>
      <text x="0" y="-5" text-anchor="middle" font-family="Geist, sans-serif" font-size="11" font-weight="700" fill="#3ecf8e">PostgreSQL</text>
      <text x="0" y="14" text-anchor="middle" font-family="Geist Mono, monospace" font-size="9" fill="#94a3b8">Infra &amp; Tooling</text>

      <rect x="100" y="-40" width="140" height="80" rx="12" fill="#fff" stroke="#6366f1" stroke-width="2"/>
      <text x="170" y="-12" text-anchor="middle" font-family="Geist, sans-serif" font-size="12" font-weight="700" fill="#4338ca">Distributed</text>
      <text x="170" y="8" text-anchor="middle" font-family="Geist Mono, monospace" font-size="10" fill="#6366f1">Cloud Architecture</text>
      <text x="170" y="24" text-anchor="middle" font-family="Geist, sans-serif" font-size="9" fill="#64748b">Open Source Core</text>
    </g>
  `,

  'redis-distributed-caching-patterns': `
    <g transform="translate(600, 310)">
      <rect x="-220" y="-40" width="130" height="80" rx="12" fill="#fff" stroke="#dc2626" stroke-width="2"/>
      <text x="-155" y="-12" text-anchor="middle" font-family="Geist, sans-serif" font-size="13" font-weight="700" fill="#dc2626">Redis Redlock</text>
      <text x="-155" y="8" text-anchor="middle" font-family="Geist Mono, monospace" font-size="10" fill="#64748b">Distributed Mutex</text>
      <text x="-155" y="24" text-anchor="middle" font-family="Geist Mono, monospace" font-size="9" fill="#059669">Stampede Shield</text>

      <rect x="-45" y="-35" width="90" height="70" rx="10" fill="#0f172a"/>
      <text x="0" y="-5" text-anchor="middle" font-family="Geist Mono, monospace" font-size="11" font-weight="700" fill="#38bdf8">SETNX</text>
      <text x="0" y="14" text-anchor="middle" font-family="Geist Mono, monospace" font-size="9" fill="#34d399">PX 5000</text>

      <rect x="90" y="-40" width="130" height="80" rx="12" fill="#fff" stroke="#3b82f6" stroke-width="2"/>
      <text x="155" y="-12" text-anchor="middle" font-family="Geist, sans-serif" font-size="13" font-weight="700" fill="#1d4ed8">PostgreSQL</text>
      <text x="155" y="8" text-anchor="middle" font-family="Geist Mono, monospace" font-size="10" fill="#64748b">Optimized Index</text>
      <text x="155" y="24" text-anchor="middle" font-family="Geist, sans-serif" font-size="9" fill="#2563eb">p99 &lt; 5ms</text>
    </g>
  `,
};

function escapeXml(unsafe = '') {
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

for (const blog of blogs) {
  const customDiagram = DIAGRAMS[blog.id] || `
    <g transform="translate(600, 310)">
      <rect x="-180" y="-40" width="360" height="80" rx="12" fill="#fff" stroke="#cbd5e1" stroke-width="2"/>
      <text x="0" y="-10" text-anchor="middle" font-family="Geist, sans-serif" font-size="13" font-weight="700" fill="#0f172a">${escapeXml(blog.title.slice(0, 35))}</text>
      <text x="0" y="12" text-anchor="middle" font-family="Geist Mono, monospace" font-size="10" fill="#64748b">${escapeXml(blog.categories.join(' · '))}</text>
    </g>
  `;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <!-- Grid pattern -->
    <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#f1f5f9" stroke-width="1"/>
      <circle cx="0" cy="0" r="1.5" fill="#cbd5e1"/>
    </pattern>

    <!-- Markers -->
    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="#94a3b8" />
    </marker>
    <marker id="arrowGreen" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="#10b981" />
    </marker>
    <marker id="arrowIndigo" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="#6366f1" />
    </marker>
  </defs>

  <!-- Background Canvas -->
  <rect width="1200" height="630" fill="#ffffff" />
  <rect width="1200" height="630" fill="url(#grid)" />

  <!-- Outer Elegant Border Frame -->
  <rect x="24" y="24" width="1152" height="582" rx="20" fill="none" stroke="#e2e8f0" stroke-width="1.5" />

  <!-- Top Header Row -->
  <g transform="translate(64, 76)">
    <!-- Category Pill -->
    <rect x="0" y="0" width="${Math.max(120, blog.categories[0].length * 9 + 40)}" height="32" rx="16" fill="#0f172a" />
    <circle cx="16" cy="16" r="4" fill="#38bdf8" />
    <text x="28" y="20.5" font-family="Geist Mono, monospace" font-size="11.5" font-weight="700" fill="#f8fafc" letter-spacing="0.5">${escapeXml(blog.categories[0].toUpperCase())}</text>

    <!-- Post Type / Tag -->
    <text x="${Math.max(120, blog.categories[0].length * 9 + 40) + 16}" y="20.5" font-family="Geist Mono, monospace" font-size="12" font-weight="600" fill="#64748b">${escapeXml(blog.type || 'SYSTEMS NOTE')}</text>

    <!-- Date & Read time on Right -->
    <text x="1072" y="20.5" text-anchor="end" font-family="Geist Mono, monospace" font-size="12" font-weight="500" fill="#94a3b8">${escapeXml(blog.date.toUpperCase())} · ${escapeXml(blog.readTime.toUpperCase())}</text>
  </g>

  <!-- Center Title -->
  <g transform="translate(600, 168)">
    <text x="0" y="0" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="34" font-weight="800" fill="#0f172a" letter-spacing="-0.8">
      ${escapeXml(blog.title)}
    </text>
    <text x="0" y="38" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="500" fill="#64748b">
      ${escapeXml(blog.subtitle.length > 95 ? blog.subtitle.slice(0, 92) + '...' : blog.subtitle)}
    </text>
  </g>

  <!-- Bespoke Technical Diagram -->
  ${customDiagram}

  <!-- Bottom Metadata Bar -->
  <g transform="translate(64, 556)">
    <!-- Author & Role -->
    <circle cx="14" cy="14" r="14" fill="#0f172a" />
    <text x="14" y="19" text-anchor="middle" font-family="Geist, sans-serif" font-size="13" font-weight="800" fill="#38bdf8">S</text>
    <text x="38" y="18" font-family="Geist, sans-serif" font-size="13" font-weight="700" fill="#0f172a">Santusht Kotai</text>
    <text x="135" y="18" font-family="Geist, sans-serif" font-size="13" font-weight="400" fill="#94a3b8">· Systems Architect</text>

    <!-- Watermark right -->
    <text x="1072" y="18" text-anchor="end" font-family="Geist Mono, monospace" font-size="12.5" font-weight="600" fill="#64748b">@santusht06 · santusht.online</text>
  </g>
</svg>`;

  const filePath = path.join(outputDir, `${blog.id}.svg`);
  fs.writeFileSync(filePath, svg.trim(), 'utf-8');
  console.log(`Generated: ${blog.id}.svg`);
}

console.log('All 13 blog covers generated successfully!');

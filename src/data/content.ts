/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * All site copy lives here. Edit this file to update the site —
 * no component changes required.
 */

export const PROFILE = {
  name: 'Bandari Sai Mouli',
  short: 'Mouli',
  role: 'Backend & Platform Engineer',
  location: 'Bengaluru, India',
  timezone: 'Asia/Calcutta',
  email: 'saimouli.bandari@gmail.com',
  available: true,
  availableLabel: 'Open to backend / infra roles',
  blurb:
    'I build the layer most people never see — telemetry pipelines that swallow millions of records an hour, databases tuned until the load graph flattens, and cloud platforms locked down with Zero Trust by default.',
  socials: [
    { label: 'GitHub', href: 'https://github.com/SaimouliBandari' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/saimouli03' },
    { label: 'Writing', href: 'https://medium.com/@saimouli.bandari' },
  ],
};

export interface Project {
  title: string;
  summary: string;
  detail: string;
  tags: string[];
  year: string;
  metric?: { value: string; label: string };
  variant: number; // which shader visual to render
  link?: string;
  github?: string;
}

export const PROJECTS: Project[] = [
  {
    title: 'SessionDB',
    year: '2026',
    summary: 'A Zero Trust database proxy with an LLM query layer.',
    detail:
      'Open source, production-grade proxy sitting in front of MySQL and Postgres. Parses SQL dialects, masks credentials, enforces policy at query level, and translates natural language into governed SQL.',
    tags: ['TypeScript', 'Zero Trust', 'SQL Parsing', 'LLM'],
    metric: { value: 'OSS', label: 'Creator' },
    variant: 3,
    link: 'https://sessiondb.in',
    github: 'https://github.com/sessiondb',
  },
  {
    title: 'Observability Pipeline',
    year: '2025',
    summary: 'Platform-wide telemetry at 1.2M+ records an hour.',
    detail:
      'Designed and shipped the full stack — GCP Pub/Sub into Vector, landing in columnar ClickHouse, surfaced through Logchef. Captured structured logs across every service while cutting cloud spend by 30%.',
    tags: ['ClickHouse', 'Vector', 'Pub/Sub', 'Go'],
    metric: { value: '1.2M+', label: 'records / hour' },
    variant: 0,
    link: 'https://medium.com/@saimouli.bandari',
  },
  {
    title: 'Latency & Query Program',
    year: '2025',
    summary: 'Cut API latency from seconds to milliseconds.',
    detail:
      'Drove critical endpoints from 2–3s down to ~600ms with database-per-service isolation, non-blocking async pipelines and distributed trace profiling. Peak database utilisation fell from 99% to 35% through composite indexing and materialised views.',
    tags: ['Postgres', 'MySQL', 'Indexing', 'Tracing'],
    metric: { value: '600ms', label: 'from 2–3s' },
    variant: 1,
    link: 'https://medium.com/@saimouli.bandari',
  },
  {
    title: 'Zero Trust Cloud Platform',
    year: '2025',
    summary: 'Solo owner of ~10 GCP projects and the mesh between them.',
    detail:
      'Shared VPC topology, Cloud Run direct VPC egress, service mesh with mTLS, Workload Identity Federation, Secret Manager, CI/CD and production release control — designed and operated single-handedly.',
    tags: ['GCP', 'Cloud Run', 'mTLS', 'CI/CD'],
    metric: { value: '~10', label: 'GCP projects' },
    variant: 4,
    link: 'https://medium.com/@saimouli.bandari',
  },
  {
    title: 'Machine Health Telemetry',
    year: '2023',
    summary: 'Industrial sensor ingestion that never drops a packet.',
    detail:
      'Ring buffers and time-windowed aggregation carrying 1.2M+ sensor and time-series records per hour under high concurrency, with sub-35ms reads on columnar stores audited through explain plans.',
    tags: ['Node.js', 'Time-series', 'RabbitMQ', 'ClickHouse'],
    metric: { value: '<35ms', label: 'columnar reads' },
    variant: 2,
  },
];

export interface NextProject {
  title: string;
  status: 'Shipped' | 'Building' | 'Planning';
  progress: number; // 0-100
  summary: string;
  tags: string[];
}

// In-flight and upcoming work. Written generically — swap freely.
export const NEXT: NextProject[] = [
  {
    title: 'Search Platform Migration',
    status: 'Building',
    progress: 55,
    summary:
      'Moving a production search stack off a managed vendor onto self-hosted Typesense, with a unified recommendations and personalisation orchestration layer behind one API.',
    tags: ['Typesense', 'Relevance', 'Personalisation'],
  },
  {
    title: 'Automated RCA Engine',
    status: 'Building',
    progress: 40,
    summary:
      'Root cause analysis that joins a ClickHouse log store with source-control context over MCP connectors, then writes a structured RCA document instead of a wall of logs.',
    tags: ['ClickHouse', 'MCP', 'Incident Response'],
  },
  {
    title: 'Agentic Delivery Pipeline',
    status: 'Building',
    progress: 60,
    summary:
      'Orchestrator and sub-agent workflows that take a PRD through spec, implementation and QA review into an opened pull request — with the human holding the merge button.',
    tags: ['Agents', 'Codegen', 'Review Automation'],
  },
  {
    title: 'AI Context Fabric',
    status: 'Planning',
    progress: 20,
    summary:
      'A knowledge-graph and metadata layer — service topology, data lineage, ownership — so agents can reason about a system instead of guessing at it.',
    tags: ['Knowledge Graph', 'OpenMetadata', 'Lineage'],
  },
];

export const CAPABILITIES = [
  {
    title: 'Distributed Systems',
    body: 'Service boundaries, async pipelines, backpressure and failure modes that hold under partition.',
  },
  {
    title: 'Observability',
    body: 'Structured logs, traces and metrics wired end to end — and priced so finance stays calm.',
  },
  {
    title: 'Database Performance',
    body: 'Explain plans, composite and covering indexes, materialised views, schema surgery under load.',
  },
  {
    title: 'Cloud Platform',
    body: 'GCP from the ground up: Shared VPC, Cloud Run, IAM, Workload Identity, CI/CD, cost control.',
  },
  {
    title: 'Zero Trust Security',
    body: 'mTLS service mesh, credential masking, query-level policy engines, least-privilege by default.',
  },
  {
    title: 'AI & Agentic Tooling',
    body: 'LLM-backed developer tooling, natural language to governed SQL, multi-agent build pipelines.',
  },
];

export const IMPACT = [
  { value: 1.2, suffix: 'M+', label: 'records ingested per hour', decimals: 1 },
  { value: 64, suffix: '%', label: 'peak database load removed' },
  { value: 30, suffix: '%', label: 'cloud spend saved' },
  { value: 4, suffix: ' yrs', label: 'shipping production systems' },
];

export const TIMELINE = [
  {
    year: '2022',
    title: 'Started out',
    body: 'Program Analyst Trainee at Cognizant on SAP PP, then straight into product engineering at Akrivia Automation.',
  },
  {
    year: '2023 — 2025',
    title: 'Learning scale the hard way',
    body: 'Industrial telemetry at Facttwin: ring buffers, time-window aggregation, columnar stores and the first time a query plan really mattered.',
  },
  {
    year: '2025',
    title: 'Platform ownership',
    body: 'Joined Supertails and ended up owning the cloud platform — around ten GCP projects, the service mesh, and the telemetry stack underneath them.',
  },
  {
    year: '2025',
    title: 'Recognised',
    body: 'Named Superstar SDE after the observability rollout cut cloud spend 30% and dropped peak database load from 99% to 35%.',
  },
  {
    year: '2026',
    title: 'Open source & agents',
    body: 'Shipped SessionDB into the open, and started building the agentic tooling that writes the RCA before I get to the dashboard.',
  },
];

export const STACK = [
  'Go',
  'TypeScript',
  'Python',
  'Node.js',
  'ClickHouse',
  'PostgreSQL',
  'MySQL',
  'Redis',
  'GCP',
  'Cloud Run',
  'Pub/Sub',
  'Vector',
  'RabbitMQ',
  'Docker',
  'mTLS',
  'Elasticsearch',
];

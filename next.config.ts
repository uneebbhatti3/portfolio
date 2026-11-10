import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // ADK lazily requires optional Google Cloud telemetry packages that are not
  // installed; loading it with Node's require keeps the bundler from failing on them.
  serverExternalPackages: ['@google/adk'],
};

export default nextConfig;

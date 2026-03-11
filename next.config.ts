import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  outputFileTracingRoot: path.resolve(process.cwd(), '../../'),
  typescript: {
    ignoreBuildErrors: false, // Changed to false to catch TypeScript errors
  },
  eslint: {
    ignoreDuringBuilds: false, // Changed to false to catch ESLint errors
  },
  // Turbopack configuration
  turbopack: {
    rules: {
      '*.{jsx,tsx}': {
        loaders: ['orchids-visual-edits/loader.js'],
      },
    },
  },
  // Keep webpack config as fallback for production builds
  webpack: (config) => {
    // Add orchids-visual-edits loader for JSX/TSX files
    config.module.rules.push({
      test: /\.(jsx|tsx)$/,
      use: [
        {
          loader: 'orchids-visual-edits/loader.js',
        },
      ],
    });
    return config;
  },
} as NextConfig;

export default nextConfig;

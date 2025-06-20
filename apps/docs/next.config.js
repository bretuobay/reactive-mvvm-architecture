import nextMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'], // Keep this commented/removed
  experimental: {
    mdxRs: true, // Try Re-enabling Rust compiler for MDX
  },
};

const withMDX = nextMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

// Merge MDXconfig with Next.js config
export default withMDX(nextConfig);

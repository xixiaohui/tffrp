


// import withMDX from '@next/mdx';

// const withMDXConfig = withMDX({
//   extension: /\.mdx?$/,
// });

// const nextConfig = {
//   pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'],
// };

// export default withMDXConfig(nextConfig);

// next.config.ts
import type { NextConfig } from 'next';
import withMDX from '@next/mdx';

const nextConfig: NextConfig = {
  // 你可以在这里加其他 Next 配置
  experimental: {
    mdxRs: true,
  },
  pageExtensions: ['js', 'ts', 'jsx', 'tsx', 'mdx'],
};

export default withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})(nextConfig);

// import type { NextConfig } from "next";


// const nextConfig: NextConfig = {
//   /* config options here */

//   pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'], // 加入 mdx 支持
//   reactStrictMode: true,
  
// };

// export default nextConfig;


import withMDX from '@next/mdx';

const withMDXConfig = withMDX({
  extension: /\.mdx?$/,
});

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'],
};

export default withMDXConfig(nextConfig);
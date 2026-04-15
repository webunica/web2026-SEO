import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/desarrollo-diseno-paginas-web-pymes',
        destination: '/desarrollo-paginas-web-pymes-chile',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

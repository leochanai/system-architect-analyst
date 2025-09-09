import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: "/architect",
  env: {
    NEXT_PUBLIC_BASE_PATH: "/architect",
  },
};

export default nextConfig;

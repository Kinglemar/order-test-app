/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.output.webassemblyModuleFilename = "static/wasm/[modulehash].wasm";
    config.experiments = { ...config.experiments, asyncWebAssembly: true };
    config.module.rules.push({
      test: /\.worker\.(js|ts)$/,
      loader: "worker-loader",
      options: {
        filename: "static/[hash].worker.js",
        publicPath: "/_next/",
      },
    });
    return config;
  },
};

module.exports = nextConfig;

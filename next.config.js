/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    esmExternals: "loose",
    serverComponentsExternalPackages: ["mongoose"],
    missingSuspenseWithCSRBailout: false,
  },
  transpilePackages: [ "antd", "@ant-design", "rc-util", "rc-pagination", "rc-picker", "rc-notification", "rc-tooltip", "rc-tree", "rc-table" ],
  webpack: (config) => {
    config.resolve.fallback = {
      "mongodb-client-encryption": false ,
      "aws4": false
    };

    return config;
  }
}

module.exports = nextConfig
